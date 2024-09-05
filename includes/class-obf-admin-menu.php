<?php
// includes/class-obf-admin-menu.php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class OBF_Admin_Menu {
	public function register_menu() {
		add_menu_page(
			'Badges',
			'Badges',
			'manage_options',
			'obf-pws-badges',
			[ $this, 'render_vue_app' ],
			'dashicons-awards',
			6
		);
		add_submenu_page(
			'obf-pws-badges',
			'Triggers',
			'Triggers',
			'manage_options',
			'obf-pws-badges&tab=triggers',
			[ $this, 'render_vue_app' ]
		);
		add_submenu_page(
			'obf-pws-badges',
			'Settings',
			'Settings',
			'manage_options',
			'obf-pws-badges&tab=settings',
			[ $this, 'render_vue_app' ]
		);
		add_submenu_page(
			'obf-pws-badges',
			'Log',
			'Log',
			'manage_options',
			'obf-pws-badges&tab=log',
			[ $this, 'render_vue_app' ]
		);
	}

	public function render_vue_app() {
		echo '<div id="obf-pws"></div>';
	}
}
