<?php
// includes/class-pathwise-badge-connect-badge.php
class Pathwise_Badge_Connect_Badge {
	private string $table_name;

	public function __construct() {
		global $wpdb;
		$this->table_name = $wpdb->prefix . 'pathwise_badge_connect_badges';
	}

	public function get_badges() {
		global $wpdb;
		// Modify the query to sort badges by the 'name' field alphabetically
		$badges = $wpdb->get_results("SELECT * FROM {$this->table_name} ORDER BY name ASC");

		// Unserialize serialized fields
		foreach ($badges as $badge) {
			$badge->alt_language = maybe_unserialize($badge->alt_language);
			$badge->category = maybe_unserialize($badge->category);
		}

		return $badges;
	}

	/**
	 * @param $external_badges
	 * @param $client_id
	 *
	 * @return array|object|stdClass[]|null
	 * @throws Exception
	 */
	public function sync_from_api($external_badges, $client_id) {
		global $wpdb;

		// Step 1: Retrieve all existing badges in the database
		$existing_badges = $wpdb->get_results("
			SELECT id, pbc_id, pbc_client_id, modified_time
			FROM {$this->table_name}
		");

		// Create an associative array of existing badges with the combination of pbc_id and pbc_client_id as the key
		$existing_badge_map = [];
		foreach ($existing_badges as $badge) {
			$key = $badge->pbc_id . '_' . $badge->pbc_client_id;
			$existing_badge_map[$key] = $badge;
		}

		// Step 2: Process the new badges from the external source
		$new_badge_map = [];
		foreach ($external_badges as $badge) {
			$key = $badge['id'] . '_' . $badge['client_id'];

			$data = [
				'pbc_client_id' => $badge['client_id'],
				'pbc_id' => $badge['id'],
				'name' => $badge['name'],
				'description' => $badge['description'],
				'image' => $badge['image'],
				'category' => maybe_serialize($badge['category']),
				'alt_language' => maybe_serialize($badge['alt_language']),
				'expires' => $badge['expires'],
				'modified_time' => $badge['mtime'],
				'created_time' => $badge['ctime'],
			];

			$new_badge_map[$key] = true;

			// Update existing badges or insert new badges
			try {
				if (isset($existing_badge_map[$key])) {
					$existing_badge = $existing_badge_map[$key];

					// Only update if the badge has been modified
					if ($badge['mtime'] > $existing_badge->modified_time) {
						$wpdb->update($this->table_name, $data, ['id' => $existing_badge->id]);
					}
				} else {
					$wpdb->insert($this->table_name, $data);
					if ($wpdb->last_error) {
						throw new Exception('Failed to insert badge with ID ' . $badge['id'] . ': ' . $wpdb->last_error);
					}
				}
			} catch (Exception $e) {
				// Log the error
				Pathwise_Badge_Connect_Log::log_error( 'Failed to insert/update badge with ID ' . $badge['id'] . ': ' . $e->getMessage());
				throw $e; // Re-throw the exception to handle it in the REST controller
			}
		}

		// Step 3: Remove badges that are no longer present in the external source
		foreach ($existing_badge_map as $key => $badge) {
			if ($badge->pbc_client_id === $client_id && !isset($new_badge_map[$key])) {
				// Delete associated triggers first
				$trigger_table_name = $wpdb->prefix . 'pathwise_badge_connect_triggers';
				$wpdb->delete($trigger_table_name, ['badge_id' => $badge->id]);

				// Now delete the badge itself
				$wpdb->delete($this->table_name, ['id' => $badge->id]);
			}
		}

		// Return all synchronized badges
		return $this->get_badges();
	}
}
