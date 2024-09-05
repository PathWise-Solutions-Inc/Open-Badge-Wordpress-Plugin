<?php

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

class OBF_Scripts {

	public function enqueue() {
		// Check if we're on the specific admin page for the plugin
		$current_screen = get_current_screen();
		if ( isset($current_screen->base) && $current_screen->base === 'toplevel_page_obf-pws-badges') {

			$build_dir = plugin_dir_path( dirname( __FILE__ ) ) . 'build/';
			$build_url = plugin_dir_url( dirname( __FILE__ ) ) . 'build/';

			$js_files = glob( $build_dir . 'assets/*.js' );
			$css_files = glob( $build_dir . 'assets/*.css' );

			foreach ( $js_files as $js_file ) {
				$js_file_url = $build_url . 'assets/' . basename( $js_file );
				wp_enqueue_script( 'obf-vue-js', $js_file_url, array(), '1.0.0', true );
			}

			foreach ( $css_files as $css_file ) {
				$css_file_url = $build_url . 'assets/' . basename( $css_file );
				wp_enqueue_style( 'obf-vue-css', $css_file_url, array(), '1.0.0' );
			}

			// Localize script for nonces and other dynamic data
			wp_localize_script('obf-vue-js', 'obfOptions', [
				'ajaxurl' => admin_url('admin-ajax.php'),
				'nonce' => wp_create_nonce('wp_rest'),
			]);
		}
	}
}
