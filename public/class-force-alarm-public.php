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

		// $data = json_encode( $_POST['data'], true );
		$response['res'] = 'json_decode';
		$response['json'] = $_POST;
		// $response['payload'] = $_POST['data'];

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
