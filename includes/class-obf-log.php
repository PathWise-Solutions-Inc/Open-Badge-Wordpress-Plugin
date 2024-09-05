<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class OBF_Log {

	private $table_name;

	public function __construct() {
		global $wpdb;
		$this->table_name = $wpdb->prefix . 'obf_pws_logs';
	}

	// General log creation method
	public function create_log($trigger_id, $user_id, $post_id, $type, $message) {
		global $wpdb;

		$wpdb->insert($this->table_name, [
			'trigger_id' => $trigger_id ? $trigger_id : null,
			'user_id' => $user_id ? $user_id : null,
			'post_id' => $post_id ? $post_id : null,
			'type' => $type ? $type : 'message',
			'message' => $message ? $message : null,
			'created_at' => current_time('mysql'),
			'updated_at' => current_time('mysql'),
		]);

		return $wpdb->insert_id;
	}

	// Helper method to log errors
	public static function log_error($message, $trigger_id = null, $post_id = null) {
		$user_id = get_current_user_id();
		$log = new self(); // Instantiate the log class
		return $log->create_log($trigger_id, $user_id, $post_id, 'error', $message);
	}

	// Helper method to log successes
	public static function log_success($message, $trigger_id = null, $post_id = null) {
		$user_id = get_current_user_id();
		$log = new self(); // Instantiate the log class
		return $log->create_log($trigger_id, $user_id, $post_id, 'success', $message);
	}

	// Retrieve a log entry by ID
	public function get_log($id) {
		global $wpdb;
		return $wpdb->get_row($wpdb->prepare("SELECT * FROM {$this->table_name} WHERE id = %d", $id));
	}

	/**
	 * Get logs.
	 *
	 * @param WP_REST_Request $request
	 * @return WP_REST_Response
	 */
	public function get_logs(WP_REST_Request $request): WP_REST_Response {
		global $wpdb;

		$logs = $wpdb->get_results("
        SELECT logs.id, logs.type, logs.message, logs.created_at, 
            COALESCE(triggers.badge_id, '') AS badge_id, 
            COALESCE(triggers.extension, '') AS extension, 
            COALESCE(triggers.trigger_type, '') AS trigger_type,
            COALESCE(badges.name, '') AS badge_name,
            COALESCE(posts.post_title, '') AS post_title,
            COALESCE(posts.ID, '') AS post_id,
            COALESCE(users.display_name, '') AS user_name, 
            COALESCE(users.ID, 0) AS user_id
        FROM {$wpdb->prefix}obf_pws_logs logs
        LEFT JOIN {$wpdb->prefix}obf_pws_triggers triggers ON logs.trigger_id = triggers.id
        LEFT JOIN {$wpdb->prefix}obf_pws_badges badges ON triggers.badge_id = badges.id
        LEFT JOIN {$wpdb->posts} posts ON logs.post_id = posts.ID
        LEFT JOIN {$wpdb->users} users ON logs.user_id = users.ID
        ORDER BY logs.created_at DESC
    ");

		return rest_ensure_response($logs);  // Use rest_ensure_response to avoid wrapping in 'data'
	}


	// Update a log entry
	public function update_log($id, $trigger_id, $user_id, $post_id, $type, $message) {
		global $wpdb;

		return $wpdb->update($this->table_name, [
			'trigger_id' => $trigger_id,
			'user_id' => $user_id,
			'post_id' => $post_id,
			'type' => $type,
			'message' => $message,
			'updated_at' => current_time('mysql'),
		], ['id' => $id]);
	}

	// Delete a log entry
	public function delete_log($id) {
		global $wpdb;
		return $wpdb->delete($this->table_name, ['id' => $id]);
	}
}
