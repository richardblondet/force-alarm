<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       http://richardblondet.com
 * @since      1.0.0
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/public
 * @author     Richard Blondet <developer@richardblondet.com>
 */
class Force_Alarm_Public {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

		/**
		 * Front facing application react based
		 * 
		 * @since 1.4.0
		 */
		add_shortcode( 'fa_app', array( $this, 'fa_app_shortcode'));

	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Force_Alarm_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Force_Alarm_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/force-alarm-public.css', array(), $this->version, 'all' );
		wp_enqueue_style( $this->plugin_name."-bootstrap", "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css", array(), $this->version, "all" );

	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Force_Alarm_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Force_Alarm_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/force-alarm-public.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Frontend app initialization
	 * 
	 * @since 1.5.0
	 */
	public function fa_app_shortcode( $atts, $content ) {
		$atts = shortcode_atts( array(
			'foo' => 'no foo',
			'baz' => 'default baz'
		), $atts, 'fa_app' );

		echo '<div id="fd_app"></div>';
	}

	/**
	 * Services Ajax Handler
	 * 
	 * @since 1.6
	 */
	public function fa_ajax_get_service_handler() {
		// $nonce = wp_verify_nonce( $_POST['_nonce'], 'force-alarm-ajax' );
		$type = $_POST['type'];
		$response = array();

		// WP_Query arguments
		$args = array(
			'post_type'              => array( 'fa_service_plan' ),
			'post_status'            => array( 'publish' ),
		);

		// The Query
		$services_result = get_posts( $args );
		$services = [];

		/**
		 * Add ACF
		 */
		foreach( $services_result as $service ) {
			$service->price = (float) get_field('price', $service->ID );
			$service->type = get_field('type', $service->ID );
			if( $service->type === $type ) {
				$services[] = $service;
			}
		}

		return wp_send_json_success( $services );
	}

	/**
	 * Process Orders
	 * 
	 * @since 1.6.0
	 */
	public function fa_ajax_process_orders_handler() {
		$response = [];

		// Receive data for the first time from client
		$data = json_decode( stripslashes( $_POST['data'] ), $decode_to_array = true );

		// Perform Call to the external service for credit card
		$date_approved = date('d/m/Y H:i:s');
		// End

		/**
		 * Create the new user making a WP_User
		 * 
		 * In theory the external service response
		 * will determine if we should proceed or not.
		 * Because order is a post like data, it needs 
		 * a post_author user, so we create the user 
		 * first and then the post order. 
		 *
		 * from the @author
		 */
		$new_user_data = array(
			'user_login'	=>	$data['form']['email'],
			'user_email'	=>	$data['form']['email'],
			'user_nicename'	=>	$data['form']['name'],
			'display_name'	=>  $data['form']['name'],
			'user_pass'		=>	NULL,
			'show_admin_bar_front' => false
		);
		$new_user_id = wp_insert_user( $new_user_data );

		/**
		 * If user creation is error, return nicely
		 */
		if( is_wp_error( $new_user_id )) {
			$response['code']		= 'FA-00' . __LINE__;
			$response['message']	= $new_user_id->get_error_message();
			$response['user_data']	= $new_user_data;
			$response['raw']		= $data;
	
			return wp_send_json_error( $response );
		}

		/**
		 * Create or update meta values
		 * To know about the existing keys please @see {@link https://stackoverflow.com/questions/25315125/reserved-keys-for-user-meta-in-wordpress-about-me}
		 */
		// Setup all of out user meta information
		$new_user_metas = array(
			array(
				'meta_key' => 'show_welcome_panel',
				'meta_value' => FALSE,
				'unique' => TRUE
			),
			array(
				'meta_key' => 'show_admin_bar_front',
				'meta_value' => FALSE,
				'unique' => TRUE
			),
			array(
				'meta_key' => '_fa_has_logged_in',
				'meta_value' => FALSE,
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_address',
				'meta_value' => $data['form']['address'],
				'unique' => TRUE
			),
			array(
				'meta_key' => '_fa_created_at',
				'meta_value' => date(),
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_phone',
				'meta_value' => $data['form']['phone'],
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_sector',
				'meta_value' => $data['form']['sector'],
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_reference',
				'meta_value' => $data['form']['reference'],
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_cc_token',
				'meta_value' => "", // Tokenize the CC save here
				'unique' => TRUE
			),
			array(
				'meta_key' => 'fa_province',
				'meta_value' => $data['form']['province'],
				'unique' => TRUE
			),
			array(
				'meta_key' => '_fa_has_logged_in',
				'meta_value' => FALSE,
				'unique' => TRUE
			),
			array(
				'meta_key' => '_fd_date_approved',
				'meta_value' => $date_approved,
				'unique' => TRUE
			)
		);

		// Iterate and add all user metas
		foreach ($new_user_metas as $array_key => $array_value) {
			$new_user_metas[$array_key]['result'] = add_user_meta( $new_user_id, $array_value['meta_key'], $array_value['meta_value'], $array_value['unique'] );
		}
		// Instance user in this system
		$wp_user = new WP_User( $new_user_id );
		$wp_user->set_role( 'client' );

		// Save new user id in response and its metas
		$response['user'] = $new_user_data;
		$response['user']['id'] = $new_user_id;
		$response['user']['user_metas'] = $new_user_metas;

		/**
		 * Create order post to save order
		 */
		$order_name = sprintf("%s — %s"
			,$new_user_data['display_name']
			,$date_approved
		);
		$new_order_data = array(
			'post_title' => $order_name,
			'post_author' =>  $new_user_id,
			'post_type' => 'fa_orders',
			'post_status' => 'publish'
		);
		$order_id = wp_insert_post( $new_order_data, true );
		
		// Verify that the order inserted correctly and return gently if it is
		if( is_wp_error( $order_id ) ) {
			$response['code']		= 'FA-00' . __LINE__;
			$response['message']	= $order_id->get_error_message();
			$response['user_data']	= $new_user_data;
			$response['raw']		= $data;
	
			return wp_send_json_error( $response );
		}

		// Lets add all data related with this order
		$post_metas = array(
			array(
				'meta_key' => 'fa_order_total',
				'meta_value' => $data['total']
			),
			array(
				'meta_key' => 'fa_order_installation_date',
				'meta_value' => date("D d/m/Y", strtotime( $data['form']['date'] ))
			),
			array(
				'meta_key' => 'fa_order_installation_time',
				'meta_value' => date("h:i a", strtotime( $data['form']['time'] ))
			),
			array(
				'meta_key' => 'fa_order_installation_time',
				'meta_value' => date("h:i a", strtotime( $data['form']['time'] ))
			),
			array(
				'meta_key' => 'fa_order_status',
				'meta_value' => 'pendiente'
			),
			array(
				'meta_key' => 'fa_order_items',
				'meta_value' => $data['selection'] // save entire array
			)
		);

		// Iterate and add all order as post metas
		foreach ($post_metas as $array_key => $array_value) {
			$post_metas[$array_key]['result'] = update_post_meta( $order_id, $array_value['meta_key'], $array_value['meta_value'] );
		}

		// Save post id and its meta in the result
		$response['order'] = $new_order_data;
		$response['order']['id'] = $order_id;
		$response['order']['order_metas'] = $post_metas;

		/**
		 * If nothing stopped us until here, return to the user with 
		 * success
		 */

		$response['raw'] = $data;
		
		return wp_send_json_success( $response );
		
	}

	/**
	 * Get CMS content for wizard
	 * 
	 * @since 1.6.2
	 */
	public function fa_ajax_wizard_content() {
		$response = [];
		$content_available = [
			'disclaimer' => 'fa_disclaimer_content',
			'terms' => 'fa_disclaimer_content'
		];
		$content_request = sanitize_text_field( $_POST['content'] );
		
		/**
		 * Check if content exists in the set of contents
		 */
		if( !isset( $content_available[ $content_request ])) {
			$response['code']		= 'FA-00' . __LINE__;
			$response['message']	= "The content requested doesn't exist";
			$response['raw']		= $content_request;
			
			return wp_send_json_error( $response );
		}

		$response['content'] = get_field( $content_available[ $content_request ], 'option' );

		/**
		 * Return to the client with the corresponding content
		 */
		return wp_send_json_success( $response );

	}

	/**
	 * Create Javascript Globals
	 * 
	 * @since 1.6.0
	 */
	public function fa_wp_head_global_variables() {
		$output  = '<script id="fa-global-vars" type="text/javascript">';
		$output .= 'var FA_GLOBALS = %s;';
		$output .= '</script>';
	
		printf( $output, 
			json_encode( array(
				'AJAX_URL'=> admin_url( "admin-ajax.php" ),
				'NONCE' => wp_create_nonce( 'force-alarm-ajax' )
			)
		));
	}

	/**
	 * Add origins to allow requests 
	 * 
	 * @since 1.6.0
	 */
	public function fa_allowed_origins( $origins ) {
		$origins[] = 'http://localhost:8080';
		$origins[] = 'http://localhost:8081';
		return $origins;
	}

}
