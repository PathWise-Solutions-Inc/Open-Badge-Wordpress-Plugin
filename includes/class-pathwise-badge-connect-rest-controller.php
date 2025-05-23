<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

if (!class_exists( 'Pathwise_Badge_Connect_Log' )) {
	require_once plugin_dir_path( __FILE__ ) . 'class-pathwise-badge-connect-log.php';
}

class Pathwise_Badge_Connect_REST_Controller {

	public function register_routes(): void {

		register_rest_route('pathwise-badge-connect/v1', '/connection-status', [
			'methods'  => 'GET',
			'callback' => [$this, 'get_connection_status'],
			'permission_callback' => [$this, 'check_permissions'],
			'args' => [
				'provider' => [
					'type' => 'string',
					'default' => 'obf',
					'enum' => ['obf', 'cancred'],
				],
			],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/settings/obf', [
			'methods' => 'GET',
			'callback' => [$this, 'get_settings_obf'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/settings/cancred', [
			'methods' => 'GET',
			'callback' => [$this, 'get_settings_cancred'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/settings/obf', [
			'methods' => 'POST',
			'callback' => [$this, 'save_settings_obf'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/settings/cancred', [
			'methods' => 'POST',
			'callback' => [$this, 'save_settings_cancred'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/sync', [
			'methods' => 'POST',
			'callback' => [$this, 'sync_badges'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/last-sync', [
			'methods' => 'GET',
			'callback' => [$this, 'get_last_sync'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/badges', [
			'methods' => 'GET',
			'callback' => [$this, 'get_badges'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/triggers', [
			'methods' => 'GET',
			'callback' => [$this, 'get_triggers'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/triggers/(?P<id>\d+)', [
			'methods' => 'GET',
			'callback' => [$this, 'get_trigger'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/triggers', [
			'methods' => 'POST',
			'callback' => [$this, 'save_trigger'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/triggers/(?P<id>\d+)', [
			'methods' => 'DELETE',
			'callback' => [$this, 'delete_trigger'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/posts-by-type', [
			'methods' => 'GET',
			'callback' => [$this, 'get_posts_by_type'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/logs', [
			'methods' => 'GET',
			'callback' => [$this, 'get_logs'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/notices', [
			'methods' => 'GET',
			'callback' => [$this, 'get_notices'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/notices', [
			'methods' => 'POST',
			'callback' => [$this, 'create_notice'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/notices/(?P<id>\d+)', [
			'methods' => 'DELETE',
			'callback' => [$this, 'delete_notice'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/user-badges', [
			'methods' => 'GET',
			'callback' => [$this, 'get_user_badges'],
			'permission_callback' => function () {
				return current_user_can('read_badges');
			}
		]);

		register_rest_route('pathwise-badge-connect/v1', '/export-logs', [
			'methods' => 'GET',
			'callback' => [$this, 'export_logs_to_csv'],
			'permission_callback' => [$this, 'check_permissions'],
		]);

		register_rest_route('pathwise-badge-connect/v1', '/clear-logs', [
			'methods' => 'DELETE',
			'callback' => [$this, 'clear_logs'],
			'permission_callback' => [$this, 'check_permissions'],
		]);
	}

	/**
	 * Check permissions for the API.
	 *
	 * @param WP_REST_Request $request
	 * @return bool
	 */
	public function check_permissions(WP_REST_Request $request): bool {
		$api_key_received = $request->get_header('pbc-api-key');
		$api_get_local = get_option( 'pathwise_badge_connect_api_key' );
		$nonce = $request->get_header('X-WP-Nonce');

		if ($api_key_received !== $api_get_local) {
			new WP_Error('rest_forbidden', __('Invalid API key.', 'pathwise-badge-connect'), ['status' => 403]);
			return false;
		}

		if (!wp_verify_nonce($nonce, 'wp_rest')) {
			new WP_Error('rest_forbidden', __('Invalid nonce.', 'pathwise-badge-connect'), ['status' => 403]);
			return false;
		}

		return true;
	}

	/**
	* Get the connection status with the Pathwise Badge Connect API.
	*
	* @param WP_REST_Request $request
	* @return WP_REST_Response
	*/
	public function get_connection_status(WP_REST_Request $request): WP_REST_Response {
		$provider = $request->get_param('provider') ?? 'obf';

		if ($provider === 'cancred') {
			$client_id = get_option('pathwise_badge_connect_cancred_client_id');
			$client_secret = get_option('pathwise_badge_connect_cancred_client_secret');
		} else {
			$client_id = get_option('pathwise_badge_connect_obf_client_id');
			$client_secret = get_option('pathwise_badge_connect_obf_client_secret');
		}

		if (empty($client_id) || empty($client_secret)) {
			error_log("PBC {$provider} Client ID or Secret is missing.");
			return new WP_REST_Response(['connection_status' => 'Not Connected'], 200);
		}

		$api_client = new Pathwise_Badge_Connect_API_Client($client_id, $client_secret, $provider);
		$status = $api_client->get_connection_status();

		if ($status === 'OpenBadge Error') {
			error_log("PBC API Connection Error for {$provider}");
		}

		return new WP_REST_Response(['connection_status' => $status], 200);
	}


	/**
	 * Sync badges with the PBC API for both OBF and CanCred connections if configured.
	 *
	 * @param WP_REST_Request $request
	 *
	 * @return WP_REST_Response
	 * @throws Exception
	 */
	public function sync_badges(WP_REST_Request $request): WP_REST_Response {
		$obf_client_id = get_option('pathwise_badge_connect_obf_client_id');
		$obf_secret = get_option('pathwise_badge_connect_obf_client_secret');
		$cancred_client_id = get_option('pathwise_badge_connect_cancred_client_id');
		$cancred_secret = get_option('pathwise_badge_connect_cancred_client_secret');

		$all_synced_badges = [];

		// Helper function to sync badges from a client and handle errors/logging
		$sync_from_client = function($client_id, $secret, $type) {
			$badge_model = new Pathwise_Badge_Connect_Badge();
			$client      = new Pathwise_Badge_Connect_API_Client($client_id, $secret, $type);
			$badges      = $client->get_badges([
				'draft' => 0,
				'external' => 1,
			]);

			if (is_wp_error($badges)) {
				Pathwise_Badge_Connect_Log::log_error("Failed to synchronize badges from {$type}: " . $badges->get_error_message());
				return new WP_Error('sync_error', "Failed to synchronize badges from {$type}: " . $badges->get_error_message());
			}

			try {
				$synced = $badge_model->sync_from_api($badges, $client_id);
				Pathwise_Badge_Connect_Log::log_success("Badges successfully synchronized from {$type}. Total badges synchronized: " . count($synced));
				return $synced;
			} catch (Exception $e) {
				Pathwise_Badge_Connect_Log::log_error("Error during badge synchronization from {$type}: " . $e->getMessage());
				return new WP_Error('sync_exception', "Error during badge synchronization from {$type}: " . $e->getMessage());
			}
		};

		// Sync from Open Badge Factory if configured
		if (!empty($obf_client_id) && !empty($obf_secret)) {
			$result = $sync_from_client($obf_client_id, $obf_secret, 'obf');
			if (is_wp_error($result)) {
				return new WP_REST_Response(['message' => $result->get_error_message()], 500);
			}
			$all_synced_badges = array_merge($all_synced_badges, $result);
		}

		// Sync from CanCred if configured
		if (!empty($cancred_client_id) && !empty($cancred_secret)) {
			$result = $sync_from_client($cancred_client_id, $cancred_secret, 'cancred');
			if (is_wp_error($result)) {
				return new WP_REST_Response(['message' => $result->get_error_message()], 500);
			}
			$all_synced_badges = array_merge($all_synced_badges, $result);
		}

		if (empty($all_synced_badges)) {
			return new WP_REST_Response(['message' => 'No badges synchronized. Please check your connection settings.'], 400);
		}

		// Update last sync time
		$last_sync_time = gmdate('Y-m-d H:i:s');
		update_option('pathwise_badge_connect_last_sync', $last_sync_time);

		return new WP_REST_Response([
			'success' => true,
			'last_sync' => $last_sync_time,
			'badges' => $all_synced_badges,
		], 200);
	}


	/**
	 * Get the last sync time.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_last_sync(WP_REST_Request $request): WP_REST_Response {
		$last_sync = get_option('pathwise_badge_connect_last_sync', null);
		return new WP_REST_Response(['last_sync' => $last_sync], 200);
	}

	/**
	 * Get all badges from the database.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_badges(WP_REST_Request $request): WP_REST_Response {
		$badge_model = new Pathwise_Badge_Connect_Badge();
		$badges = $badge_model->get_badges();
		return new WP_REST_Response(['badges' => $badges], 200);
	}

	/**
	 * Get triggers.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_triggers(WP_REST_Request $request): WP_REST_Response {
		$trigger_model = new Pathwise_Badge_Connect_Trigger();
		$triggers = $trigger_model->get_triggers();

		if (is_wp_error($triggers)) {
			$error_message = $triggers->get_error_message();
			Pathwise_Badge_Connect_Log::log_error( 'Error fetching triggers: ' . $error_message);
			return new WP_REST_Response(['error' => $error_message], 500);
		}

		return new WP_REST_Response(['triggers' => $triggers], 200);
	}
	/**
	 * Get a single trigger by ID.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_trigger(WP_REST_Request $request): WP_REST_Response {
		$trigger_id = intval($request->get_param('id'));
		$trigger_model = new Pathwise_Badge_Connect_Trigger();
		$trigger = $trigger_model->get_trigger($trigger_id);

		if (is_wp_error($trigger)) {
			return new WP_REST_Response(['error' => $trigger->get_error_message()], 500);
		}

		return new WP_REST_Response(['trigger' => $trigger], 200);
	}

	/**
	 * Save or update a trigger.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function save_trigger(WP_REST_Request $request): WP_REST_Response {
		$params = $request->get_json_params();
		$id = isset($params['id']) ? intval($params['id']) : null;
		$badge_id = sanitize_text_field($params['badge_id']);
		$extension = sanitize_text_field($params['extension']);
		$trigger_type = sanitize_text_field($params['trigger_type']);
		$object = sanitize_text_field($params['object']);

		$trigger_model = new Pathwise_Badge_Connect_Trigger();

		if ($id) {
			$updated_trigger = $trigger_model->update_trigger($id, $badge_id, $extension, $trigger_type, $object);
			if (is_wp_error($updated_trigger)) {
				return new WP_REST_Response(['error' => $updated_trigger->get_error_message()], 500);
			}
			return new WP_REST_Response(['success' => true, 'trigger' => $updated_trigger], 200);
		} else {
			$new_trigger = $trigger_model->create_trigger($badge_id, $extension, $trigger_type, $object);
			if (is_wp_error($new_trigger)) {
				return new WP_REST_Response(['error' => $new_trigger->get_error_message()], 500);
			}
			return new WP_REST_Response(['success' => true, 'trigger' => $new_trigger], 200);
		}
	}

	/**
	 * Delete a trigger by ID.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function delete_trigger(WP_REST_Request $request): WP_REST_Response {
		$trigger_id = intval($request->get_param('id'));
		$trigger_model = new Pathwise_Badge_Connect_Trigger();
		$deleted = $trigger_model->delete_trigger($trigger_id);

		if (is_wp_error($deleted)) {
			return new WP_REST_Response(['error' => $deleted->get_error_message()], 500);
		}

		return new WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Get posts by type.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_posts_by_type(WP_REST_Request $request): WP_REST_Response {
		$post_type = sanitize_text_field($request->get_param('post_type'));
		$posts = get_posts([
			'post_type' => $post_type,
			'post_status' => 'publish',
			'numberposts' => -1,
		]);

		$formatted_posts = array_map(function($post) {
			return [
				'id' => $post->ID,
				'title' => $post->post_title,
			];
		}, $posts);

		return new WP_REST_Response(['posts' => $formatted_posts], 200);
	}

	/**
	 * Get logs from the PBC_Log class.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_logs(WP_REST_Request $request): WP_REST_Response {
		$log = new Pathwise_Badge_Connect_Log();
		$logs = $log->get_logs($request);

		// Ensure logs is an array
		if (is_wp_error($logs)) {
			/** @var WP_Error $logs */
			return new WP_REST_Response(['error' => $logs->get_error_message()], 500);
		}

		return rest_ensure_response($logs);
	}


	/**
	 * Get settings.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_settings_obf(WP_REST_Request $request): WP_REST_Response {
		$settings = [
			'client_id' => get_option('pathwise_badge_connect_obf_client_id'),
			'client_secret' => get_option('pathwise_badge_connect_obf_client_secret'),
		];

		return new WP_REST_Response(['settings' => $settings], 200);
	}

	/**
	 * Get settings.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_settings_cancred(WP_REST_Request $request): WP_REST_Response {
		$settings = [
			'client_id' => get_option('pathwise_badge_connect_cancred_client_id'),
			'client_secret' => get_option('pathwise_badge_connect_cancred_client_secret'),
		];

		return new WP_REST_Response(['settings' => $settings], 200);
	}

	/**
	 * Save settings.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function save_settings_obf(WP_REST_Request $request): WP_REST_Response {
		$params = $request->get_json_params();
		$client_id = sanitize_text_field($params['client_id']);
		$client_secret = sanitize_text_field($params['client_secret']);

		update_option('pathwise_badge_connect_obf_client_id', $client_id);
		update_option('pathwise_badge_connect_obf_client_secret', $client_secret);

		// Invalidate old token if credentials change
		delete_option('pathwise_badge_connect_access_token');
		delete_option('pathwise_badge_connect_token_expires_in');

		return new WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Save settings.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function save_settings_cancred(WP_REST_Request $request): WP_REST_Response {
		$params = $request->get_json_params();
		$client_id = sanitize_text_field($params['client_id']);
		$client_secret = sanitize_text_field($params['client_secret']);

		update_option('pathwise_badge_connect_cancred_client_id', $client_id);
		update_option('pathwise_badge_connect_cancred_client_secret', $client_secret);

		// Invalidate old token if credentials change
		delete_option('pathwise_badge_connect_access_token');
		delete_option('pathwise_badge_connect_token_expires_in');

		return new WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Get notices.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_notices(WP_REST_Request $request): WP_REST_Response {
		global $wpdb;

		$notices = $wpdb->get_results("
		SELECT * FROM {$wpdb->prefix}pathwise_badge_connect_notices
		WHERE status = 1
		ORDER BY created_date DESC
	");

		return new WP_REST_Response(['notices' => $notices], 200);
	}

	/**
	 * Create a new notice.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function create_notice(WP_REST_Request $request): WP_REST_Response {
		global $wpdb;

		$params = $request->get_json_params();

		$status = ! isset( $params['status'] ) || $params['status'];
		$type = sanitize_text_field($params['type']);
		$subject = sanitize_text_field($params['subject']);
		$description = sanitize_textarea_field($params['description']);
		$action = isset($params['action']) ? esc_url_raw($params['action']) : null;

		$wpdb->insert(
			"{$wpdb->prefix}pathwise_badge_connect_notices",
			[
				'status' => $status,
				'type' => $type,
				'subject' => $subject,
				'description' => $description,
				'action' => $action,
				'created_date' => current_time('mysql'),
			]
		);

		if ($wpdb->last_error) {
			return new WP_REST_Response(['error' => $wpdb->last_error], 500);
		}

		return new WP_REST_Response(['success' => true, 'id' => $wpdb->insert_id], 201);
	}

	/**
	 * Delete a notice by ID.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function delete_notice(WP_REST_Request $request): WP_REST_Response {
		global $wpdb;

		$id = (int)$request->get_param('id');

		$deleted = $wpdb->delete("{$wpdb->prefix}pathwise_badge_connect_notices", ['id' => $id]);

		if (!$deleted) {
			return new WP_REST_Response(['success' => false, 'message' => 'Failed to delete notice.'], 500);
		}

		return new WP_REST_Response(['success' => true], 200);
	}

	/**
	 * Get logged-in user's badges from the database.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_user_badges(WP_REST_Request $request): WP_REST_Response {
		$user_id = get_current_user_id();

		if (!$user_id) {
			return new WP_REST_Response(['error' => __('User is not logged in', 'pathwise-badge-connect')], 401);
		}

		$user_badges = new Pathwise_Badge_Connect_User_Badges();
		$badges = $user_badges->get_badges_by_user($user_id);

		if (is_wp_error($badges)) {
			return new WP_REST_Response(['error' => $badges->get_error_message()], 500);
		}

		return new WP_REST_Response(['badges' => $badges], 200);
	}

	/**
	 * Export logs to CSV.
	 *
	 * @param WP_REST_Request $request
	 * @return void
	 */
	public function export_logs_to_csv(WP_REST_Request $request) {
		error_log('Export logs route hit'); // Debugging line

		$log = new Pathwise_Badge_Connect_Log();
		$csv_content = $log->generate_csv();

		if ( empty( $csv_content ) ) {
			// Use wp_send_json_error to handle JSON output in a proper WordPress way.
			wp_send_json_error( [ 'error' => __( 'No logs available to export.', 'pathwise-badge-connect' ) ] );
		}

		// Generate a sanitized filename with the current date.
		$filename = sanitize_file_name( 'pathwise-badge-connect-logs-' . current_time( 'Y-m-d' ) . '.csv' );

		// Set headers for CSV download.
		header( 'Content-Type: text/csv; charset=utf-8' );
		header( 'Content-Disposition: attachment; filename="' . $filename . '"' );

		// Output the CSV content.
		// The CSV content is not HTML, so HTML escaping would corrupt it.
		// We trust that generate_csv() returns safe and properly sanitized data.
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $csv_content;

		// Prevent WordPress from appending additional content.
		exit;
	}


	/**
	 * Clear all logs.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function clear_logs(WP_REST_Request $request) {
		$log = new Pathwise_Badge_Connect_Log();
		$cleared = $log->clear_all_logs();

		if (!$cleared) {
			return new WP_REST_Response(['success' => false, 'message' => 'Failed to clear logs.'], 500);
		}

		return new WP_REST_Response(['success' => true, 'message' => 'Logs cleared successfully.'], 200);
	}

}
