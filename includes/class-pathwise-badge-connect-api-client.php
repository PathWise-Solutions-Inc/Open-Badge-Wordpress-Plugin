<?php
// includes/class-pathwise-badge-connect-api-client.php

class Pathwise_Badge_Connect_API_Client {

	private string $client_id;
	private string $client_secret;
	private string $token_endpoint = 'https://openbadgefactory.com/v1/client/oauth2/token';
	private string $api_base_url = 'https://openbadgefactory.com/v1/';
	private string $access_token;
	private int $token_expires_in;

	/**
	 * Constructor initializes client ID and secret, then retrieves access token.
	 *
	 * @param string $client_id
	 * @param string $client_secret
	 */
	public function __construct(string $client_id, string $client_secret) {
		$this->client_id = $client_id;
		$this->client_secret = $client_secret;
		$this->get_access_token();
	}

	public function get_access_token() {
		$stored_token = get_option('pathwise_badge_connect_access_token');
		$token_expires_in = get_option('pathwise_badge_connect_token_expires_in');
		$current_time = time();

		// Return existing token if valid
		if ($stored_token && $token_expires_in && $current_time < (int)$token_expires_in) {
			$this->access_token = $stored_token;
			$this->token_expires_in = (int)$token_expires_in;
			return $this->access_token;
		}

		// Request new token
		$response = wp_remote_post($this->token_endpoint, [
			'body' => [
				'grant_type' => 'client_credentials',
				'client_id' => $this->client_id,
				'client_secret' => $this->client_secret,
			],
		]);

		// Log error if response is an error
		if (is_wp_error($response)) {
			error_log('PBC API Token Request Error: ' . $response->get_error_message());
			return $response;
		}

		$body = wp_remote_retrieve_body($response);
		$data = json_decode($body, true);

		// Check if access token was retrieved
		if (isset($data['access_token'])) {
			$this->access_token = $data['access_token'];
			$adjusted_expiry_time = $current_time + (int)$data['expires_in'] - 86400;
			$this->token_expires_in = $adjusted_expiry_time;
			update_option('pathwise_badge_connect_access_token', $this->access_token);
			update_option('pathwise_badge_connect_token_expires_in', $this->token_expires_in);

			return $this->access_token;
		}

		// Log full response if access token was not found
		return new WP_Error('pathwise_badge_connect_api_error', __('Failed to retrieve access token', 'pathwise-badge-connect'));
	}

	/**
	 * Make an HTTP request to the PBC API.
	 *
	 * @param string $method HTTP method ('GET', 'POST', etc.).
	 * @param string $endpoint API endpoint (relative to base URL).
	 * @param array $body Request body (optional).
	 * @param array $query_params Query parameters (optional).
	 *
	 * @return WP_Error|array The full response or WP_Error on failure.
	 */
	private function make_request(string $method, string $endpoint, array $body = [], array $query_params = []) {
		// Ensure we have a valid access token
		if (empty($this->access_token)) {
			$this->get_access_token();
			if (empty($this->access_token)) {
				error_log(__('Access token is missing or invalid', 'pathwise-badge-connect'));
				return new WP_Error('pathwise_badge_connect_api_error', __('Access token is missing or invalid', 'pathwise-badge-connect'));
			}
		}

		// Build the request URL
		$url = $this->api_base_url . $endpoint;
		if (!empty($query_params)) {
			$url = add_query_arg($query_params, $url);
		}

		// Set request headers and arguments
		$headers = [
			'Authorization' => 'Bearer ' . $this->access_token,
			'Content-Type'  => 'application/json',
		];
		$args = [
			'method'  => $method,
			'headers' => $headers,
			'timeout' => 300,
		];
		if (!empty($body)) {
			$args['body'] = json_encode($body);
		}

		// Send the request
		$response = wp_remote_request($url, $args);

		// Check for request error
		if (is_wp_error($response)) {
			error_log('PBC API Request Error: ' . $response->get_error_message());
			return $response;
		}

		// Extract response code and body
		$response_code = wp_remote_retrieve_response_code($response);
		$response_body = wp_remote_retrieve_body($response);

		// Check if response code indicates failure
		if ($response_code < 200 || $response_code >= 300) {
			error_log('PBC API Request Error - HTTP Status: ' . $response_code . ' Body: ' . $response_body);
			return new WP_Error('pathwise_badge_connect_api_error', __('Failed to communicate with PBC API', 'pathwise-badge-connect'), ['status_code' => $response_code, 'body' => $response_body]);
		}

		// Return the full response to allow further checks
		return $response;
	}

	/**
	 * Issue a badge to the specified recipients.
	 *
	 * @param string $badge_id Internal badge ID.
	 * @param array $recipients Recipient email addresses.
	 * @param int|null $expires Optional expiration timestamp.
	 * @param array $additional_params Optional additional parameters.
	 *
	 * @return WP_Error|string The response body or WP_Error on failure.
	 */
	public function issue_badge(string $badge_id, array $recipients, int $expires = null, array $additional_params = []) {
		global $wpdb;

		// Fetch the PBC ID for the badge
		$table_name = $wpdb->prefix . 'pathwise_badge_connect_badges';
		$badge = $wpdb->get_row($wpdb->prepare("SELECT pbc_id FROM $table_name WHERE id = %d", $badge_id));

		if (!$badge || empty($badge->pbc_id)) {
			error_log('The PBC ID was not found for the given badge ID. Badge pbc_id: ' . $badge_id);
			return new WP_Error('pbc_id_not_found', __('The PBC ID was not found for the given badge ID.', 'pathwise-badge-connect'));
		}

		$endpoint = 'badge/' . $this->client_id . '/' . $badge->pbc_id;
		$body = array_merge(['recipient' => $recipients], $additional_params);
		if ($expires) {
			$body['expires'] = $expires;
		}

		// Make API request to issue the badge
		$response = $this->make_request('POST', $endpoint, $body);

		// Check for errors in the response
		if (is_wp_error($response)) {
			return $response;
		}

		// Check for expected success code (e.g., 201 Created)
		$response_code = wp_remote_retrieve_response_code($response);
		if ($response_code === 201) {
			return wp_remote_retrieve_body($response);
		}

		// If not a success response, return an error with the response body
		return new WP_Error('pathwise_badge_connect_api_error', __('Failed to issue badge', 'pathwise-badge-connect'), ['response' => wp_remote_retrieve_body($response)]);
	}


	/**
	 * Ping the PBC API to verify connection status.
	 *
	 * @return WP_Error|string 'Connected' on success or WP_Error on failure.
	 */
	public function ping() {
		$response = $this->make_request('GET', 'ping/' . $this->client_id);

		// Check if the request resulted in an error
		if (is_wp_error($response)) {
			error_log('PBC API Ping Error: ' . $response->get_error_message());
			return $response;
		}

		// Extract the response body
		$response_body = wp_remote_retrieve_body($response);

		// Check if the response body matches the client_id
		if (trim($response_body) === $this->client_id) {
			return 'Connected';
		}

		// Log mismatched client_id for further debugging
		error_log('PBC API Ping Error - Mismatched Client ID: ' . $response_body);
		return new WP_Error('pathwise_badge_connect_api_error', __('Ping failed: Mismatched client ID', 'pathwise-badge-connect'));
	}

	/**
	 * Get a list of all badges with optional filters.
	 *
	 * @param array $params Optional query parameters for filtering.
	 *
	 * @return WP_Error|array List of badges or WP_Error on failure.
	 */
	public function get_badges(array $params = []) {
		$response = $this->make_request('GET', 'badge/' . $this->client_id, [], $params);

		// Check if the request resulted in an error
		if (is_wp_error($response)) {
			return $response;
		}

		// Extract the response body
		$response_body = wp_remote_retrieve_body($response);

		// Since the response is line-delimited JSON, process it accordingly
		return $this->process_line_delimited_json($response_body);
	}


	/**
	 * Parse a line-delimited JSON response.
	 *
	 * @param string $response_body JSON string with line-delimited entries.
	 *
	 * @return WP_Error|array Parsed data or WP_Error on failure.
	 */
	private function process_line_delimited_json(string $response_body) {
		$lines = explode("\n", trim($response_body));
		$data = [];

		foreach ($lines as $line) {
			$decoded = json_decode(trim($line), true);
			if (json_last_error() === JSON_ERROR_NONE) {
				$data[] = $decoded;
			} else {
				error_log('JSON Decode Error: ' . json_last_error_msg() . ' for line: ' . $line);
				return new WP_Error('json_decode_error', __('Failed to decode JSON response', 'pathwise-badge-connect'));
			}
		}

		return $data;
	}

	/**
	 * Get a single badge by its ID.
	 *
	 * @param string $badge_id The badge's PBC ID.
	 *
	 * @return WP_Error|array Badge data or WP_Error on failure.
	 */
	public function get_badge_by_id(string $badge_id) {
		$response = $this->make_request('GET', 'badge/' . $this->client_id . '/' . $badge_id);

		// Check if the request resulted in an error
		if (is_wp_error($response)) {
			return $response;
		}

		// Extract the response body and decode it into an array
		$response_body = wp_remote_retrieve_body($response);
		$badge_data = json_decode($response_body, true);

		// Handle JSON decoding errors
		if (json_last_error() !== JSON_ERROR_NONE) {
			error_log('Pathwise Badge Connect API Error - JSON Decoding: ' . json_last_error_msg());
			return new WP_Error('pathwise_badge_connect_api_error', __('Failed to decode badge data', 'pathwise-badge-connect'));
		}

		return $badge_data;
	}


	/**
	 * Check the connection status with the PBC API.
	 *
	 * @return string Connection status message.
	 */
	public function get_connection_status(): string {
		// Verify client_id and client_secret are available
		if (empty($this->client_id) || empty($this->client_secret)) {
			return 'Not Connected';
		}

		// Retrieve access token
		$access_token = $this->get_access_token();
		if (is_wp_error($access_token)) {
			return 'Credential Error';
		}

		// Ping the PBC API
		$ping_response = $this->ping();
		if (is_wp_error($ping_response)) {
			return 'OpenBadge Error';
		}

		// Return success if the ping response is 'Connected'
		if ($ping_response === 'Connected') {
			return 'Connected';
		}

		return 'Error';
	}

}