<?php
/**
 * Plugin Name: Open Badge Factory by Pathwise Solutions
 * Plugin URI: https://pathwisesolutions.com/open-badge-factory
 * Description: Connect your LearnDash courses to Open Badge Factory. Sync your badges and setup different triggers to issue badges yto your learners.
 * Version: 0.3.2
 * Author: Pathwise Solutions Inc
 * Author URI: https://pathwisesolutions.com
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: obf-pws
 * Domain Path: /languages
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

require_once plugin_dir_path(__FILE__) . 'class-obf-plugin.php';
$obf_plugin = new OBF_Plugin();

// Register activation hook
register_activation_hook(__FILE__, [$obf_plugin, 'activate']);

