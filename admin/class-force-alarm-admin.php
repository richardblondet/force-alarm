<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       http://richardblondet.com
 * @since      1.0.0
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/admin
 * @author     Richard Blondet <developer@richardblondet.com>
 */
class Force_Alarm_Admin {

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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version ) {

		$this->plugin_name = $plugin_name;
		$this->version = $version;

	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/force-alarm-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/force-alarm-admin.js', array( 'jquery' ), $this->version, false );

	}

	/**
	 * Changes the Wordpress admin footer text
	 * 
	 * @since 1.0.1
	 */
	public function wp_admin_footer_text() {
		printf('<span id="footer-thankyou">%s <a href="%s">%s</a>. %s</span>'
			, 'Force Alarm Systems. Developed by'
			, 'https://richardblondet.com/'
			, 'Richard Blondet'
			, 'Plugin activated on: ' . get_option( 'force_alarm_plugin_activation' )
		);
	}

	/**
	 * Customize the url setting to fix incorrect asset URLs.
	 * 
	 * @since 1.0.1
	 */
	public function fa_acf_settings_url( $url ) {
		return FA_ACF_URL;
	}

	/**
	 * Toggle wheather or not show admin settings for ACF: default true
	 * 
	 * When development is over, consider turning off
	 * 
	 * @since 1.0.1
	 */
	public function fa_acf_settings_show_admin( $show_admin ) {
		return false;
	}

	/**
	 * Register the Orders Custom Post Type
	 * 
	 * @since 1.1.0
	 */
	public function fa_orders_custom_post_type() {

		$labels = array(
			'name'                  => _x( 'Orders', 'Post Type General Name', 'force-alarm' ),
			'singular_name'         => _x( 'Order', 'Post Type Singular Name', 'force-alarm' ),
			'menu_name'             => __( 'Orders', 'force-alarm' ),
			'name_admin_bar'        => __( 'Orders', 'force-alarm' ),
			'archives'              => __( 'Order Archives', 'force-alarm' ),
			'attributes'            => __( 'Order Attributes', 'force-alarm' ),
			'parent_item_colon'     => __( 'Parent Order:', 'force-alarm' ),
			'all_items'             => __( 'All Orders', 'force-alarm' ),
			'add_new_item'          => __( 'Add New Order', 'force-alarm' ),
			'add_new'               => __( 'Add New', 'force-alarm' ),
			'new_item'              => __( 'New Order', 'force-alarm' ),
			'edit_item'             => __( 'Edit Order', 'force-alarm' ),
			'update_item'           => __( 'Update Order', 'force-alarm' ),
			'view_item'             => __( 'View Order', 'force-alarm' ),
			'view_items'            => __( 'View Orders', 'force-alarm' ),
			'search_items'          => __( 'Search Order', 'force-alarm' ),
			'not_found'             => __( 'Order Not found', 'force-alarm' ),
			'not_found_in_trash'    => __( 'Order Not found in Trash', 'force-alarm' ),
			'featured_image'        => __( 'Featured Image', 'force-alarm' ),
			'set_featured_image'    => __( 'Set featured image', 'force-alarm' ),
			'remove_featured_image' => __( 'Remove featured image', 'force-alarm' ),
			'use_featured_image'    => __( 'Use as featured image', 'force-alarm' ),
			'insert_into_item'      => __( 'Insert into Order', 'force-alarm' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Order', 'force-alarm' ),
			'items_list'            => __( 'Order list', 'force-alarm' ),
			'items_list_navigation' => __( 'Orders list navigation', 'force-alarm' ),
			'filter_items_list'     => __( 'Filter Orders list', 'force-alarm' ),
		);
		$args = array(
			'label'                 => __( 'Order', 'force-alarm' ),
			'description'           => __( 'Force Alarms Orders', 'force-alarm' ),
			'labels'                => $labels,
			'supports'              => array( 'title', 'editor', 'comments', 'custom-fields', 'page-attributes' ),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 15,
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => true,
			'exclude_from_search'   => true,
			'publicly_queryable'    => true,
			'menu_icon'				=> 'dashicons-clipboard',
			'capability_type'       => 'page',
		);
		register_post_type( 'fa_orders', $args );

	}

	/**
	 * Register Custom Post Type
	 * 
	 * @since 1.1.1
	 */
	function fa_service_plan_custom_post_type() {

		$labels = array(
			'name'                  => _x( 'Service Plans', 'Post Type General Name', 'force-alarm' ),
			'singular_name'         => _x( 'Service Plan', 'Post Type Singular Name', 'force-alarm' ),
			'menu_name'             => __( 'Service Plans', 'force-alarm' ),
			'name_admin_bar'        => __( 'Service Plans', 'force-alarm' ),
			'archives'              => __( 'Service Plan Archives', 'force-alarm' ),
			'attributes'            => __( 'Service Plans Attributes', 'force-alarm' ),
			'parent_item_colon'     => __( 'Parent Plan:', 'force-alarm' ),
			'all_items'             => __( 'All Service Plans', 'force-alarm' ),
			'add_new_item'          => __( 'Add New Plan', 'force-alarm' ),
			'add_new'               => __( 'Add New', 'force-alarm' ),
			'new_item'              => __( 'New Service Plan', 'force-alarm' ),
			'edit_item'             => __( 'Edit Service Plan', 'force-alarm' ),
			'update_item'           => __( 'Update Service Plan', 'force-alarm' ),
			'view_item'             => __( 'View Service Plan', 'force-alarm' ),
			'view_items'            => __( 'View Service Plans', 'force-alarm' ),
			'search_items'          => __( 'Search Plan', 'force-alarm' ),
			'not_found'             => __( 'Plan Not found', 'force-alarm' ),
			'not_found_in_trash'    => __( 'Plan Not found in Trash', 'force-alarm' ),
			'featured_image'        => __( 'Service Plan Featured Image', 'force-alarm' ),
			'set_featured_image'    => __( 'Set featured image', 'force-alarm' ),
			'remove_featured_image' => __( 'Remove featured image', 'force-alarm' ),
			'use_featured_image'    => __( 'Use as featured image', 'force-alarm' ),
			'insert_into_item'      => __( 'Insert into Service Plan', 'force-alarm' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Plan', 'force-alarm' ),
			'items_list'            => __( 'Services list', 'force-alarm' ),
			'items_list_navigation' => __( 'Services list navigation', 'force-alarm' ),
			'filter_items_list'     => __( 'Filter Services list', 'force-alarm' ),
		);
		$args = array(
			'label'                 => __( 'Service Plan', 'force-alarm' ),
			'description'           => __( 'Force Alarms Services', 'force-alarm' ),
			'labels'                => $labels,
			'supports'              => array( 'title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields', 'page-attributes', 'post-formats' ),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_menu'          => true,
			'menu_position'         => 10,
			'menu_icon'             => 'dashicons-shield',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => true,
			'exclude_from_search'   => false,
			'publicly_queryable'    => true,
			'capability_type'       => 'page',
		);
		register_post_type( 'fa_service_plan', $args );

	}


}
