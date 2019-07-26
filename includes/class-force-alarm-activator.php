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
		/**
		 * Add date of activation and saves on record the moment this plugins runs
		 */
		update_option( 'force_alarm_plugin_activation', date('D d/m/Y h:i:s a') );
	}

	/**
	 * Add roles to system.
	 * 
	 * Create all the necessary roles to run the system.
	 * The following are the new roles we need to perform the processes:
	 * 
	 * CLIENT: 
	 * The client role is the user that gets added to the database after performing a purchase
	 * of the services. One important thing to know is that users DO NOT need to log in to buy
	 * or subscribe any service, but once they do, they will be added to the database as users with
	 * this role. With this role users can create tickets for future support. Create, Update, Read and 
	 * Trash tickets are the capabilities permitted for them. They can also Read the orders they made 
	 * in the begining.
	 * 
	 * AGENT:
	 * The Agent user can give support and respond to tickets that the client creates. It can 
	 * UPDATE the ticket status and comment on tickets to respond users queries. In addition, Agents
	 * Can moderate comments, etc.
	 * 
	 * @since 1.2.4
	 */
	public static function add_roles() {
		/**
		 * Force Alarm Client Capabilities and Role
		 */
		$client_capabilities = array(
			'read'         		=> true,  // true allows this capability
			'read_ticket' 		=> true,
			'edit_ticket'		=> true,
			'publish_tickets'	=> true
		);
		$client = add_role( 'client', __( 'Client' ), $client_capabilities );

		/**
		 * Force Alarm Agent Capabilities and Role
		 */
		$agent_capabilities = array(
			'read'					=> true,
			'read_tickets'			=> true,
			'moderate_comments'		=> true,
			'read_private_tickets' 	=> true
		);
		$agent = add_role( 'agent', __( 'Agent' ), $agent_capabilities );
	}

	/**
	 * Add the roles to the Administrator upon plugin activation
	 * 
	 * @since 1.2.5
	 */
	public static function update_admin_capabilities() {
		/* get the admin role */
		$admin = get_role( 'administrator' );

		/* add capabilities to edit orders */
		$admin->add_cap( 'create_tickets' );
		$admin->add_cap( 'read_ticket' );
		$admin->add_cap( 'read_tickets' ); 
		$admin->add_cap( 'read_private_tickets' );
		$admin->add_cap( 'edit_tickets' );
		$admin->add_cap( 'edit_ticket' );
		$admin->add_cap( 'edit_others_tickets' );
		$admin->add_cap( 'delete_ticket' );
		$admin->add_cap( 'delete_tickets' );
		$admin->add_cap( 'publish_tickets' );
	}

}
