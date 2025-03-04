<?php
// includes/class-pathwise-badge-connect-admin-menu.php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Pathwise_Badge_Connect_Admin_Menu {
	public function register_menu() {
		add_menu_page(
			'Badges',
			'Badges',
			'manage_options',
			'pathwise-badge-connect',
			[ $this, 'render_vue_app' ],
			'dashicons-awards',
			6
		);
		add_submenu_page(
			'pathwise-badge-connect',
			'Triggers',
			'Triggers',
			'manage_options',
			'pathwise-badge-connect&tab=triggers',
			[ $this, 'render_vue_app' ]
		);
		add_submenu_page(
			'pathwise-badge-connect',
			'Settings',
			'Settings',
			'manage_options',
			'pathwise-badge-connect&tab=settings',
			[ $this, 'render_vue_app' ]
		);
		add_submenu_page(
			'pathwise-badge-connect',
			'Log',
			'Log',
			'manage_options',
			'pathwise-badge-connect&tab=log',
			[ $this, 'render_vue_app' ]
		);
	}

	public function render_vue_app() {
		echo '<div id="pathwise-badge-connect"></div>';
	}
}
