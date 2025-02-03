<?php
/**
 * Plugin Name: Pathwise Badge Connect
 * Plugin URI: https://pathwisesolutions.com/pathwise-badge-connect
 * Description: Connect your LearnDash courses to Open Badge Factory. Sync your badges and setup different triggers to issue badges to your learners.
 * Version: 0.3.2
 * Author: Pathwise Solutions Inc
 * Author URI: https://pathwisesolutions.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: pathwise-badge-connect
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Define a constant for the plugin version.
if ( ! defined( 'PBC_PLUGIN_VERSION' ) ) {
	define( 'PBC_PLUGIN_VERSION', '0.3.2' );
}

// Optionally, you could define other constants (like a plugin path or URL) for reuse.
if ( ! defined( 'PBC_PLUGIN_DIR' ) ) {
	define( 'PBC_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
}
if ( ! defined( 'PBC_PLUGIN_URL' ) ) {
	define( 'PBC_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
}

require_once PBC_PLUGIN_DIR . 'class-pbc-plugin.php';
$pbc_plugin = new PBC_Plugin();

// Register activation hook.
register_activation_hook( __FILE__, [ $pbc_plugin, 'activate' ] );
