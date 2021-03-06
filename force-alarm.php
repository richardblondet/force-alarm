<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              http://richardblondet.com
 * @since             1.0.0
 * @package           Force_Alarm
 *
 * @wordpress-plugin
 * Plugin Name:       Force Alarm
 * Plugin URI:        https://github.com/richardblondet/force-alarm
 * Description:       Custom Functionality for FORCE ALARM: SISTEMA DE ALARMA PARA TU HOGAR de SecurityForce™, más de 10 años al cuidado de ti y los tuyos, ahora con todo incluido.
 * Version:           1.0.0
 * Author:            Richard Blondet
 * Author URI:        http://richardblondet.com
 * License:           GPLv3
 * License URI:       https://github.com/richardblondet/force-alarm/blob/master/LICENSE
 * Text Domain:       force-alarm
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'FORCE_ALARM_VERSION', '1.0.0' );

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-force-alarm-activator.php
 */
function activate_force_alarm() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-force-alarm-activator.php';
	Force_Alarm_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-force-alarm-deactivator.php
 */
function deactivate_force_alarm() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-force-alarm-deactivator.php';
	Force_Alarm_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_force_alarm' );
register_deactivation_hook( __FILE__, 'deactivate_force_alarm' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-force-alarm.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_force_alarm() {

	$plugin = new Force_Alarm();
	$plugin->run();

}
run_force_alarm();
