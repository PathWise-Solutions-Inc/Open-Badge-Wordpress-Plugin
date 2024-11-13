<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class OBF_User_Badges {

	private string $table_name_user_badges;
	private string $table_name_badges;

	public function __construct() {
		global $wpdb;
		$this->table_name_user_badges = $wpdb->prefix . 'obf_pws_user_badges';
		$this->table_name_badges = $wpdb->prefix . 'obf_pws_badges';
	}

	/**
	 * Get badges for a specific user.
	 *
	 * @param int $user_id
	 * @return array|WP_Error
	 */
	public function get_badges_by_user(int $user_id) {
		global $wpdb;

		$badges = $wpdb->get_results($wpdb->prepare("
		    SELECT ub.badge_id, b.name, b.image 
		    FROM {$this->table_name_user_badges} ub
		    LEFT JOIN {$this->table_name_badges} b ON ub.badge_id = b.id
		    WHERE ub.user_id = %d
		", $user_id));

		if ($badges === null) {
			return new WP_Error('no_badges_found', __('No badges found for this user', 'obf'));
		}

		return $badges;
	}
}
