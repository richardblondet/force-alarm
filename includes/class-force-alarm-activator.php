<?php

/**
 * Fired during plugin activation
 *
 * @link       http://richardblondet.com
 * @since      1.0.0
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 * @author     Richard Blondet <developer@richardblondet.com>
 */
class Force_Alarm_Activator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function activate() {
		update_option( 'force_alarm_plugin_activation', date('D d/m/Y h:i:s a') );
	}

}
