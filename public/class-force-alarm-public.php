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
		$this->load_dependencies();
		/**
		 * Front facing application react based
		 * 
		 * @since 1.4.0
		 */
		add_shortcode( 'fa_app', array( $this, 'fa_app_shortcode'));

	}
	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Force_Alarm_Email
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-force-alarm-email.php';
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/force-alarm-public.min.js', array( 'jquery' ), $this->version, false );

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
			'post_type'              => array( 'product' ),
			'post_status'            => array( 'publish' ),
			'product_cat'			 			 => $type,
			'meta_query'						 => array(
				array(
					'key'	=> '_stock_status',
					'value' => 'outofstock',
					'compare' => 'NOT LIKE'
				)
			)
		);

		// The Query
		$services_result = get_posts( $args );
		$services = [];

		/**
		 * Add ACF
		 */
		foreach( $services_result as $service ) {
			// $service->metas = get_post_meta( $service->ID );
			$service->featured_image = wp_get_attachment_url( get_post_thumbnail_id($service->ID) ); 
			$service->price = get_post_meta( $service->ID, '_price', true );
			$service->contract = get_field('fa_service_contract', $service->ID );
			$service->product_type = $type;
			$services[] = $service;
		}

		return wp_send_json_success( $services );
	}
	/**
	 * Private use to get times by date
	 */
	private function getForceAlarmOrdersBy( $key = "date", $value = "") {
		// WP_Query arguments
		$args = array(
			// required
			'status' => 'processing',
			'return' => 'objects', // ids, objects
			
			// Filter by our value
			'meta_key' => 'billing_inst_' . $key,
			'meta_value' => $value
		);

		// The Query
		$orders = wc_get_orders( $args );

		/** Add ACF */
		foreach( $orders as $orders_booked => $order ) {
			$orders[$orders_booked]->ID = $order->ID;
			$orders[$orders_booked]->installation_date = get_post_meta( $order->ID, 'billing_inst_date', true );
			$orders[$orders_booked]->installation_time = get_post_meta( $order->ID, 'billing_inst_time', true );
			$orders[$orders_booked]->installation_date_unix = get_post_meta( $order->ID, '_billing_inst_date', true );
			$orders[$orders_booked]->installation_time_unix = get_post_meta( $order->ID, '_billing_inst_time', true );
		}

		return $orders;
	}
	/**
	 * Get available hours
	 * 
	 * @since haryz
	 */
	public function fa_get_orders_by_installation_date() {
		$date = date("D d/m/Y", strtotime( $_POST['date'] ));
		$response = [];

		$response['parameters'] = array(
			'date' => $date,
			'_POST' => $_POST['date'],
			'strtotime' => strtotime( $_POST['date'] ),
		);

		if( $response['parameters']['strtotime'] === false ) {
			$response['error'] = "Date not valid. Format should be MM/DD/YYYY";
			return wp_send_json_error( $response, 500 );
		}

		$response['booked'] = $this->getForceAlarmOrdersBy('date', $date );

		return wp_send_json_success( $response );
	}
	/**
	 * Process Orders
	 * 
	 * @since 1.6.0
	 */
	public function fa_ajax_process_orders_handler() {
		global $woocommerce;

		$response = [];

		// Receive data for the first time from client
		$data = json_decode( stripslashes( $_POST['data'] ), $decode_to_array = true );

		/** Prepare and Send Emails */
		// return wp_send_json_error( $response, 500 );

		/**
		 * The Process in which things should go:
		 * 
		 * 1. Process payment
		 * 2. Register User
		 * 3. Create Order
		 */
		try {
			$available 					= $this->validate_service_installation_availability( $data );
			$payment_response 	= $this->fa_order_process_payment( $data );
			$user_id		 				= $this->fa_order_process_user( $data );
			$order_id						= $this->fa_order_process_cart( 1, $data );
			return wp_send_json_error( $order_id, 500 ); // Test
			
			$response['payment_response'] = $payment_response;
			$response['user_id'] 					= $user_id;
			$response['order_id'] 				= $order_id;

			return wp_send_json_success( $response );
		} catch (Exception $e) {
			$response['code']				= sprintf("%s %s", 'FA-00', __LINE__);
			$response['message']		= $e->getMessage();
	
			return wp_send_json_error( $response, 500 );
		}
	}
	/**
	 * Validate service installation availability
	 * @param data Array
	 * @throws Exception
	 */
	private function validate_service_installation_availability( $data ) {
		// Validate that order installation date is available
		$requestedDate = date("D d/m/Y", strtotime(  $data['form']['date'] ));
		$requestedTime = date("h:i a", strtotime( $data['form']['time'] ));
		$ordersToday = $this->getForceAlarmOrdersBy("date", $requestedDate );
		$instCount=0;
		foreach ($ordersToday as $order) {
			if( $order->installation_time === $requestedTime) {
				$instCount++;
			}
		}
		if( $instCount >= 3  ) {
			throw new Exception(sprintf("Lo sentimos, no existe disponibilidad para la hora que ha seleccionado: '%s' en la fecha %s", $requestedTime, $requestedDate));
		}
		return true;
	}
	/**
	 * Process payment in order
	 * @param data Array
	 * @throws Exception
	 */
	private function fa_order_process_payment( $data ) {
		return;
		// Important variables
		$url 	 = get_field('force_alarm_payment_endpoint_url', 'option');
		if( !$url ) $url = 'http://api2.forcesos.com:8084/subscriptions/';
		$token = get_field('force_alarm_payment_token', 'option');
		if( !$token ) $token = '23f3c478a6257c2f120381fd612f047b4947b002';

		// Map to create services
		$services = array();
		foreach ($data['selection'] as $index => $item) {
			for ($i=0; $i < $item['qty']; $i++) { 
				$services[] = array(
					"description"  => $item["post_title"],
					"price" => $item["price"],
					"isOptional" => $item["type"] === "plan" ? false:true
				);
			}
		}

		// Payload
		$payload = array(
			"customer" => array(
				"full_name" => $data['form']['name'],
				"email" => $data['form']['email'], //valid email
				"document_no" => str_replace("-", "", $data['form']['cedula']) ,
				"phone_number" => $data['form']['phone'],
			),
			"details" => $services,
			"payment_info" => array(
				"card_no" => str_replace(" ", "", $data['payment']['number']),
				"card_owner_name" => $data['payment']['name'],
				"expiration_date" => str_replace("\\", "", $data['payment']['expiry']),
				"ccv" => $data['payment']['cvc'],
				"issuer" => $data['payment']['issuer']
			)
		);
		// return $payload;
		
		// build request
		$request = array(
			'method' 					=> 'POST',
			'headers'					=> array(
				'Content-Type'	=> 'application/json',
				'Authorization' => sprintf('token %s', $token)
			),
			'body' 						=> json_encode( $payload )
		);

		// Perform call to service
		$response = wp_remote_post( $url, $request);
		
		// Verify error on service communication and throw Exception
		if( is_wp_error( $response )) { // $res->get_error_message()
			throw new Exception( sprintf(' %s Inténtalo de nuevo', $response->get_error_message()) );
		}
		$response['request'] = $request;
		$response['url'] = esc_url_raw( $url );
		
		// Decode body
		$response['body_decoded'] = json_decode( $response['body'] );
		
		// Verify error from service and throw Exception
		if( isset( $response['body_decoded']->error_info )) {
			throw new Exception( __LINE__ . ' ' . $response['body_decoded']->error_info->message );
		}
		
		// Verify for errors in server
		if( isset( $response['body_decoded']->server_error )) {
			throw new Exception( __LINE__ . ' ' . $response['body_decoded']->server_error->message );
		}
		
		// Verify errors in fields
		if( isset( $response['body_decoded']->payment_info )) {
			throw new Exception(__LINE__ . ' ' . 'Faltan campos en la información de pago. ');
		}

		// Return to the process
		return $response;
	}
	/**
	 * Process user in order
	 * @param data Array
	 * @throws Exception
	 */
	private function fa_order_process_user( $data ) {
		/**
		 * Create the new user making a WP_User
		 * 
		 * In theory the external service response
		 * will determine if we should proceed or not.
		 * Because order is a post like data, it needs 
		 * a post_author user, so we create the user 
		 * first and then the post order. 
		 *
		 * from the @author <richardblondet+forcealarm@gmail.com>
		 */
		$user_exists = false;
		if( email_exists( $data['form']['email'] )) {
			$user_exists = true;
		}
		$user_login = strstr($data['form']['email'], '@', true);
		$new_user_data = array(
			'user_login'			=>	$user_login,
			'user_email'			=>	$data['form']['email'],
			'user_nicename'		=>	$data['form']['name'],
			'display_name'		=>  $data['form']['name'],
			'nickname'				=> 	$user_login,
			'user_pass'				=>	NULL,
			'show_admin_bar_front' => false
		);
		
		$new_user_id = $user_exists ? email_exists( $data['form']['email'] ) : wp_insert_user( $new_user_data );
		
		// If user creation is error, return nicely
		if( is_wp_error( $new_user_id )) {
			throw new Exception($new_user_id->get_error_message());
		}
		
		// AWESOME SUPPORT PLUGIN :: CAPABILITIES
		$new_user = new WP_User( $new_user_id );
		$new_user->add_cap( 'create_ticket' );
		$new_user->add_cap( 'view_ticket' );
		$new_user->add_cap( 'reply_ticket' );
		$new_user->add_cap( 'attach_files' );
		
		// Notify everyone
		if( $user_exists === false )
			wp_new_user_notification( $new_user_id, null, 'both');

		/**
		 * Create or update meta values
		 * To know about the existing keys please @see {@link https://stackoverflow.com/questions/25315125/reserved-keys-for-user-meta-in-wordpress-about-me}
		 * 
		 * Setup all of out user meta information
		 */
		$new_user_metas = array(
			array(
				'meta_key' => 'fa_cedula',
				'meta_value' => $data['form']['cedula'],
				'unique' => TRUE
			),
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
				'meta_value' => base64_encode(serialize($data['payment'])),
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
			)
		);
		// Iterate and add all user metas
		foreach ($new_user_metas as $array_key => $array_value) {
			$new_user_metas[$array_key]['result'] = add_user_meta( $new_user_id, $array_value['meta_key'], $array_value['meta_value'], $array_value['unique'] );
		}

		// Instance user in this system
		$wp_user = new WP_User( $new_user_id );
		
		if( $user_exists === false )
			$wp_user->set_role( 'customer' );

		// Return user id
		return $new_user_id;
	}
	/**
	 * Process user cart
	 * @param user_id
	 * @param data
	 * @throws Exception
	 */
	private function fa_order_process_cart( $user_id, $data ) {
		// get requested time and date
		$requestedDate = date("D d/m/Y", strtotime(  $data['form']['date'] ));
		$requestedTime = date("h:i a", strtotime( $data['form']['time'] ));

		// Create order post to save order
		$address = array(
			'first_name' => $data['form']['name'],
			'email'      => $data['form']['email'],
			'phone'      => $data['form']['phone'],
			'address_1'  => $data['form']['address'],
			'address_2'  => $data['form']['sector']. '. ' .$data['form']['reference']. '. Provincia' .$data['form']['province'],
			'city'       => $data['form']['sector'],
			'state'      => $data['form']['province'],
			'postcode'   => '100001',
			'country'    => 'DO',
			'cedula'	 	 => $data['form']['cedula'],
			'inst_date'	 => strtotime( $data['form']['date'] ),
			'inst_time'	 => strtotime( $data['form']['time'] )
		);

		// Now we create the order
		$order = new WC_Order();
		// Verificar que no haya problemas creando orden
		if( is_wp_error( $order )) {
			throw new Exception("No se pudo completar la orden: " . implode(', ', $order->get_error_messages()));
		}
		$order_id = $order->get_id();
		
		// The add_product() function below is located in /plugins/woocommerce/includes/abstracts/abstract_wc_order.php
		foreach ($data['selection'] as $key => $item) {
			$order->add_product( get_product( $item['ID']), $item['qty'] ); // This is an existing product
		}
		
		// Insert order meta the woocommerce way
		$order->set_address( $address, 'billing' );
		$order->set_address( $address, 'shipping' );
		$order->calculate_totals();
		$order->update_status("processing");
		throw new Exception( __LINE__ . ' Raylin ' );
		// $order->save();
		
		// Update post meta in order the wordpress way too
		foreach ($address as $key => $addr) {
			update_user_meta( $user_id, 'billing_'.$key, $addr );
		}

		// Lets add all data related with this order
		$post_metas = array(
			array(
				'meta_key' => '_customer_user', 
				'meta_value' => $user_id
			),
			array(
				'meta_key' => 'billing_inst_date',
				'meta_value' => $requestedDate
			),
			array(
				'meta_key' => 'billing_inst_time',
				'meta_value' => $requestedTime
			),
			array(
				'meta_key' => 'billing_inst_address',
				'meta_value' => $data['form']['address']
			),
			array(
				'meta_key' => 'billing_inst_reference',
				'meta_value' => $data['form']['reference']
			),
			array(
				'meta_key' => 'billing_inst_sector',
				'meta_value' => $data['form']['sector']
			),
			array(
				'meta_key' => 'billing_inst_province',
				'meta_value' => $data['form']['province']
			),
			array(
				'meta_key' => 'billing_comprobante_fiscal',
				'meta_value' => isset( $data['payment']['comprobante_fiscal'] ) ? $data['payment']['comprobante_fiscal'] : ""
			),
			array(
				'meta_key' => 'billing_rnc',
				'meta_value' => isset( $data['payment']['rnc'] ) ? $data['payment']['rnc'] : ""
			),
			array(
				'meta_key' => 'billing_nombre_rnc',
				'meta_value' => isset( $data['payment']['nombre_rnc'] ) ? $data['payment']['nombre_rnc'] : ""
			),
		);

		// Iterate and add all order as post metas
		foreach ($post_metas as $array_key => $array_value) {
			$post_metas[$array_key]['result'] = update_post_meta( $order_id, $array_value['meta_key'], $array_value['meta_value'] );
		}

		// return order id
		return $order_id;
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
			'terms' => 'fa_disclaimer_content',
			'provincias' => 'fd_provincias'
		];
		$content_request = sanitize_text_field( $_POST['content'] );
		
		/**
		 * Check if content exists in the set of contents
		 */
		if( !isset( $content_available[ $content_request ])) {
			$response['code']		= 'FA-00' . __LINE__;
			$response['message']	= "The content requested doesn't exist";
			$response['raw']		= $content_request;
			
			return wp_send_json_error( $response, 500 );
		}

		$response['content'] = get_field( $content_available[ $content_request ], 'option' );

		/** transform provincias into array */
		if ( $content_request === "provincias" ) {
			$response['content'] = explode("\n", $response['content']);
		}
		/**
		 * Return to the client with the corresponding content
		 */
		return wp_send_json_success( $response );

	}

	/**
	 * test some codes ajax
	 * 
	 * @since 0
	 */
	public function fa_ajax_TEST() {
		$response = ['html' => '']; 

		$url = get_field('force_alarm_payment_endpoint_url', 'option');

		$response['html'] = $message;
		$response['url'] = $url;
		$response['email_exists'] = email_exists('josercorniel21@gmail.com') ? email_exists('josercorniel21@gmail.com') : "this executes";
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

		// wp_die('<h1>Under Maintenance</h1>');
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

	/**
	 * Add filter to allow html emails
	 * 
	 * @since xxx
	 */
	public function fa_wp_mail_content_type_html() {
		return "text/html";
	}

	/**
	 * Add logo to Force Alarm emails
	 * The logo is always true for every email
	 * 
	 * <!-- <img src="/Users/richardblondet/Projects/force-alarm/09-deliverables/00/wordpress/wp-content/plugins/force-alarm/public/imgs/force-alarm-logo-white.png" alt="Force Alarm" width="150px" /> -->
	 * 
	 * @since xxx
	 */
	public function fa_add_logo_to_email($phpmailer) {
		$phpmailer->SMTPKeepAlive=true;
		$uid  = "force-alarm-logo-white"; // cid:force-alarm-logo-white
		$name = "force-alarm-logo-white.png";
		$file = sprintf( plugin_dir_path( dirname( __FILE__ ) ) . 'public/imgs/%s', $name );

		$phpmailer->AddEmbeddedImage( $file, $uid );
		$phpmailer->AltBody = strip_tags($phpmailer->Body);

		return $phpmailer;
	}

	/**
	 * Override default text messages with html ones
	 */
	public function fa_wp_email_filter( $args ) {
		$name = "force-alarm-logo-white.png";
		$file = sprintf( plugin_dir_path( dirname( __FILE__ ) ) . 'public/imgs/%s', $name );

		// $email = new Force_Alarm_Email(array(
		// 	'subject' => $args['subject'], 
		// 	'template' => 'base'
		// ));
		// $message = $email->add_module('content', array(
		// 	'title'=> '', 'message'=> $args['message']
		// ))->get_html();
		
		$attachments = $args['attachments'];
		$attachments[] = $file;

		$wp_mail = array(
			'to' 	      => $args['to'],
			'subject'     => $args['subject'],
			'message'     => $args['message'],
			'headers'     => $args['headers'],
			'attachments' => $attachments,
		);

		return $wp_mail;
	}

	/**
	 * Change the default message for new users
	 * 
	 * @since 1.x
	 */
	public function fa_wp_new_user_notification_email( $wp_new_user_notification_email, $user, $blogname ) {
		$new_pass = wp_generate_password( 11, true, false );
		wp_set_password( $new_pass, $user->ID );

		$email = new Force_Alarm_Email(array(
			'subject' => $blogname, 
			'template' => 'base'
		));
		$url = home_url( '/mi-cuenta' );
		$message = $email->add_module('content', array(
			'title'=> 'Bienvenido, estas son tus credenciales de acceso:', 
			'message' => "<p><strong>Nombre de usuario:</strong> $user->user_login<br /><strong>Contraseña:</strong> $new_pass</p><p><strong>URL:</strong> <a href='$url'>$url</a></p>"
		))->get_html();

		$wp_new_user_notification_email['message'] = $message;

		return $wp_new_user_notification_email;
	}

	/**
	 * adding a button in the account
	 */
	public function fa_wpas_frontend_add_nav_buttons() {
		$my_account_url = get_permalink( get_option('woocommerce_myaccount_page_id') );
		$my_account_label = __( 'Mi cuenta', 'force-alarm' );
		echo sprintf( '<a href="%s" class="wpas-btn wpas-btn-default wpas-link-ticketnew">%s</a>', $my_account_url, $my_account_label);
	}

}
