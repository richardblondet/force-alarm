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
		update_option( 'force_alarm_plugin_deactivation', date('D d/m/Y h:i:s a') );
	}

	/**
	 * Remove roles.
	 * 
	 * @since 1.2.6
	 */
	public static function remove_roles() {
		/**
		 * Remove the client role if exists
		 */
		if( get_role('client') ) {
			remove_role( 'client' );
		}

		/**
		 * Remove the agent role if exists
		 */
		if( get_role('agent') ) {
			remove_role( 'agent' );
		}
		  
	}

	/**
	 * Remove caps from admininitrator.
	 * 
	 * @since 1.2.7
	 */
	public static function remove_admin_capabilities() {
		/* get the admin role */
		$admin = get_role( 'administrator' );

		/* add capabilities to edit orders */
		$admin->remove_cap( 'create_tickets' );
		$admin->remove_cap( 'read_ticket' );
		$admin->remove_cap( 'read_tickets' ); 
		$admin->remove_cap( 'read_private_tickets' );
		$admin->remove_cap( 'edit_tickets' );
		$admin->remove_cap( 'edit_ticket' );
		$admin->remove_cap( 'edit_others_tickets' );
		$admin->remove_cap( 'delete_ticket' );
		$admin->remove_cap( 'delete_tickets' );
		$admin->remove_cap( 'publish_tickets' );
	}

}
