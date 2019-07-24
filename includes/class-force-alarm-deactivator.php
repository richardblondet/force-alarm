<?php

/**
 * Fired during plugin deactivation
 *
 * @link       http://richardblondet.com
 * @since      1.0.0
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 * @author     Richard Blondet <developer@richardblondet.com>
 */
class Force_Alarm_Deactivator {

	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 */
	public static function deactivate() {
		$this->register_deactivation();
	}

	private function register_deactivation() {
		add_option( 'force_alarm_plugin_deactivation', time() );
	}

}
