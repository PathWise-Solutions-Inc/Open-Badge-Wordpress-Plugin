<?php
if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class Pathwise_Badge_Connect_Trigger {

	private string $table_name;

	public function __construct() {
		global $wpdb;
		$this->table_name = $wpdb->prefix . 'pathwise_badge_connect_triggers';
	}

	/**
	 * Get a single trigger by ID.
	 *
	 * @param int $trigger_id
	 * @return WP_Error|object
	 */
	public function get_trigger(int $trigger_id) {
		global $wpdb;

		// Fetch the trigger with the associated post title
		$trigger = $wpdb->get_row(
			$wpdb->prepare("
            SELECT t.*, p.post_title as object_title
            FROM {$this->table_name} t
            LEFT JOIN {$wpdb->posts} p ON t.object = p.ID
            WHERE t.id = %d
        ", $trigger_id)
		);

		if (!$trigger) {
			return new WP_Error('trigger_not_found', __('Trigger not found', 'pathwise-badge-connect'));
		}

		return $trigger;
	}

	/**
	 * Update an existing trigger.
	 *
	 * @param int $id
	 * @param string $badge_id
	 * @param string $extension
	 * @param string $trigger_type
	 * @param string $object
	 * @return WP_Error|stdClass
	 */
	public function update_trigger(int $id, string $badge_id, string $extension, string $trigger_type, string $object) {
		global $wpdb;

		$updated = $wpdb->update(
			$this->table_name,
			[
				'badge_id' => $badge_id,
				'extension' => $extension,
				'trigger_type' => $trigger_type,
				'object' => $object,
			],
			['id' => $id]
		);

		if ($updated === false) {
			Pathwise_Badge_Connect_Log::log_error("Failed to update trigger ID {$id}", $id);
			return new WP_Error('trigger_update_failed', __('Failed to update trigger', 'pathwise-badge-connect'));
		}

		Pathwise_Badge_Connect_Log::log_success("Trigger ID {$id} successfully updated.", $id);
		return $this->get_trigger($id);
	}

	/**
	 * Create a new trigger.
	 *
	 * @param string $badge_id
	 * @param string $extension
	 * @param string $trigger_type
	 * @param string $object
	 * @return WP_Error|stdClass
	 */
	public function create_trigger(string $badge_id, string $extension, string $trigger_type, string $object) {
		global $wpdb;

		$inserted = $wpdb->insert(
			$this->table_name,
			[
				'badge_id' => $badge_id,
				'extension' => $extension,
				'trigger_type' => $trigger_type,
				'object' => $object,
				'triggered_count' => 0, // initialize count at 0
			]
		);

		if ($inserted === false) {
			Pathwise_Badge_Connect_Log::log_error("Failed to create new trigger.");
			return new WP_Error('trigger_create_failed', __('Failed to create trigger', 'pathwise-badge-connect'));
		}

		$trigger_id = $wpdb->insert_id;
		Pathwise_Badge_Connect_Log::log_success("Trigger ID {$trigger_id} successfully created.", $trigger_id);
		return $this->get_trigger($trigger_id);
	}

	/**
	 * Delete a trigger by ID.
	 *
	 * @param int $trigger_id
	 * @return bool|WP_Error
	 */
	public function delete_trigger(int $trigger_id) {
		global $wpdb;

		$deleted = $wpdb->delete($this->table_name, ['id' => $trigger_id]);

		if ($deleted === false) {
			Pathwise_Badge_Connect_Log::log_error("Failed to delete trigger ID {$trigger_id}", $trigger_id);
			return new WP_Error('trigger_delete_failed', __('Failed to delete trigger', 'pathwise-badge-connect'));
		}

		Pathwise_Badge_Connect_Log::log_success("Trigger ID {$trigger_id} successfully deleted.", $trigger_id);
		return true;
	}

	/**
	 * Get all triggers with post titles.
	 *
	 * @return array|WP_Error
	 */
	public function get_triggers() {
		global $wpdb;

		try {
			// Fetch all triggers along with the post titles for the associated objects
			$triggers = $wpdb->get_results("
            SELECT t.*, p.post_title as object_title
            FROM {$this->table_name} t
            LEFT JOIN {$wpdb->posts} p ON t.object = p.ID
            ORDER BY t.updated_at DESC
        ");

			// Return the triggers or an empty array if none exist
			return $triggers ?: [];
		} catch (Exception $e) {
			// Log the error
			Pathwise_Badge_Connect_Log::log_error( 'Error fetching triggers: ' . $e->getMessage());
			return new WP_Error('trigger_fetch_failed', __('Failed to fetch triggers', 'pathwise-badge-connect'));
		}
	}
}
