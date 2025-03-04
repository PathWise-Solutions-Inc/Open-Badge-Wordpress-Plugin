<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class OBF_Notice_Handler {

	public function create_or_update_notice($slug, $type, $subject, $description, $action = null) {
		global $wpdb;

		// Check if the notice already exists by slug
		$existing_notice = $wpdb->get_var($wpdb->prepare(
			"SELECT id FROM {$wpdb->prefix}obf_pws_notices WHERE slug = %s",
			$slug
		));

		if ($existing_notice) {
			// Update the existing notice
			$wpdb->update(
				"{$wpdb->prefix}obf_pws_notices",
				[
					'status' => true,
					'type' => $type,
					'subject' => $subject,
					'description' => $description,
					'action' => $action,
					'completed_date' => null,
				],
				['id' => $existing_notice]
			);
		} else {
			// Create a new notice
			$wpdb->insert(
				"{$wpdb->prefix}obf_pws_notices",
				[
					'slug' => $slug,
					'status' => true,
					'type' => $type,
					'subject' => $subject,
					'description' => $description,
					'action' => $action,
					'created_date' => current_time('mysql'),
				]
			);
		}
	}

	public function remove_notice($slug) {
		global $wpdb;

		// Find the notice by slug
		$notice_id = $wpdb->get_var($wpdb->prepare(
			"SELECT id FROM {$wpdb->prefix}obf_pws_notices WHERE slug = %s",
			$slug
		));

		if ($notice_id) {
			// Remove or deactivate the notice
			$wpdb->update(
				"{$wpdb->prefix}obf_pws_notices",
				['status' => false, 'completed_date' => current_time('mysql')],
				['id' => $notice_id]
			);
		}
	}
}