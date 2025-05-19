<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class Pathwise_Badge_Connect_Trigger_Executor {

	public function __construct() {
		$this->initialize_hooks();
	}

	private function initialize_hooks(): void {
		// LearnDash Actions
		add_action('learndash_course_completed', [$this, 'handle_course_completed'], 10, 1);
		add_action('learndash_lesson_completed', [$this, 'handle_lesson_completed'], 10, 1);
		add_action('learndash_topic_completed', [$this, 'handle_topic_completed'], 10, 1);
		add_action('learndash_quiz_completed', [$this, 'handle_quiz_completed'], 10, 2);
	}

	public function handle_course_completed($course_data): void {
		$user_id = $course_data['user']->ID ?? null;
		$course_id = $course_data['course']->ID ?? null;

		if ($user_id && $course_id) {
			$this->execute_trigger('Course Complete', $course_id, $user_id);
		}
	}

	public function handle_lesson_completed($lesson_data): void {
		$user_id = $lesson_data['user']->ID ?? null;
		$lesson_id = $lesson_data['lesson']->ID ?? null;
		error_log('Trying to Complete Lesson: ' . $lesson_id . ' for ' . $user_id);

		if ($user_id && $lesson_id) {
			$this->execute_trigger('Lesson Complete', $lesson_id, $user_id);
		}
	}

	public function handle_topic_completed($topic_data): void {
		$user_id = $topic_data['user']->ID ?? null;
		$topic_id = $topic_data['topic']->ID ?? null;

		if ($user_id && $topic_id) {
			$this->execute_trigger('Topic Complete', $topic_id, $user_id);
		}
	}

	public function handle_quiz_completed($quiz_data, $user): void {
		$user_id = $user->ID ?? null;
		$quiz_id = $quiz_data['quiz']->ID ?? null;

		if ($user_id && $quiz_id) {
			$this->execute_trigger('Quiz Complete', $quiz_id, $user_id);
		}
	}

	public function execute_trigger($trigger_type, $object_id, $user_id): void {
		global $wpdb;

		$table_name = $wpdb->prefix . 'pathwise_badge_connect_triggers';
		$trigger = $wpdb->get_row($wpdb->prepare(
			"SELECT * FROM $table_name WHERE trigger_type = %s AND object = %s",
			$trigger_type, $object_id
		));

		if (!$trigger) {
			return; // No trigger found for this type and object
		}

		$badge_id = $trigger->badge_id;
		$email = get_userdata($user_id)->user_email;

		$client_id = get_option('pathwise_badge_connect_obf_client_id');
		$client_secret = get_option('pathwise_badge_connect_obf_client_secret');
		$api_client = new Pathwise_Badge_Connect_API_Client($client_id, $client_secret);

		$response = $api_client->issue_badge($badge_id, [$email]);

		if (!is_wp_error($response)) {
			Pathwise_Badge_Connect_Log::log_success('Badge successfully issued.', $trigger->id, $object_id);

			// Add the badge to the pathwise_badge_connect_user_badges table
			$table_name_user_badges = $wpdb->prefix . 'pathwise_badge_connect_user_badges';
			$wpdb->insert(
				$table_name_user_badges,
				[
					'user_id' => $user_id,
					'badge_id' => $badge_id,
					'created_at' => current_time('mysql'),
					'updated_at' => current_time('mysql'),
				]
			);

		} else {
			Pathwise_Badge_Connect_Log::log_error( 'Badge issuance failed: ' . $response->get_error_message(), $trigger->id, $object_id);
		}

		$this->increment_trigger_count($trigger->id);
	}

	private function increment_trigger_count($trigger_id): void {
		global $wpdb;
		$table_name = $wpdb->prefix . 'pathwise_badge_connect_triggers';
		$wpdb->query(
			$wpdb->prepare(
				"UPDATE $table_name SET triggered_count = triggered_count + 1 WHERE id = %d",
				$trigger_id
			)
		);
	}
}
