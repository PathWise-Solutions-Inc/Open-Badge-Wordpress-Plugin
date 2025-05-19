<?php
/**
 * Plugin Name: Pathwise Badge Connect
 * Plugin URI: https://pathwisesolutions.com/pathwise-badge-connect
 * Description: Connect your LearnDash courses to Open Badge Factory or CanCred. Sync your badges and setup different triggers to issue badges to your learners.
 * Version: 0.3.3
 * Author: Pathwise Solutions Inc
 * Author URI: https://pathwisesolutions.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: pathwise-badge-connect
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define constants
if ( ! defined( 'PATHWISE_BADGE_CONNECT_PLUGIN_VERSION' ) ) {
	define( 'PATHWISE_BADGE_CONNECT_PLUGIN_VERSION', '0.3.3' );
}
if ( ! defined( 'PATHWISE_BADGE_CONNECT_PLUGIN_DIR' ) ) {
	define( 'PATHWISE_BADGE_CONNECT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'PATH_BADGE_CONNECT_PLUGIN_URL' ) ) {
	define( 'PATHWISE_BADGE_CONNECT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

require_once PATHWISE_BADGE_CONNECT_PLUGIN_DIR . 'class-pathwise-badge-connect-plugin.php';
$pathwise_badge_connect_plugin = new Pathwise_Badge_Connect_Plugin();

// Register activation hook.
register_activation_hook( __FILE__, [ $pathwise_badge_connect_plugin, 'activate' ] );
