<?php

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       http://richardblondet.com
 * @since      1.0.0
 *
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Force_Alarm
 * @subpackage Force_Alarm/includes
 * @author     Richard Blondet <developer@richardblondet.com>
 */
class Force_Alarm {

	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Force_Alarm_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if ( defined( 'FORCE_ALARM_VERSION' ) ) {
			$this->version = FORCE_ALARM_VERSION;
		} else {
			$this->version = '1.0.0';
		}
		$this->plugin_name = 'force-alarm';

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		// $this->fa_register_acf_fields();

	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Force_Alarm_Loader. Orchestrates the hooks of the plugin.
	 * - Force_Alarm_i18n. Defines internationalization functionality.
	 * - Force_Alarm_Admin. Defines all hooks for the admin area.
	 * - Force_Alarm_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function load_dependencies() {

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-force-alarm-loader.php';

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/class-force-alarm-i18n.php';

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'admin/class-force-alarm-admin.php';

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'public/class-force-alarm-public.php';

		/**
		 * The class responsible for handling and building emails load it here
		 */
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/force-alarm-acf-fields/fa-service-plan.php';

		$this->loader = new Force_Alarm_Loader();

	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Force_Alarm_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function set_locale() {

		$plugin_i18n = new Force_Alarm_i18n();

		$this->loader->add_action( 'plugins_loaded', $plugin_i18n, 'load_plugin_textdomain' );

	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_admin_hooks() {

		$plugin_admin = new Force_Alarm_Admin( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_styles' );
		$this->loader->add_action( 'admin_enqueue_scripts', $plugin_admin, 'enqueue_scripts' );
		$this->loader->add_filter( 'admin_footer_text', $plugin_admin, 'wp_admin_footer_text' );
		$this->loader->add_action( 'admin_menu', $plugin_admin, 'fa_create_submenus_map', 99 );
		/**
		 * Adding ACF settings for current project
		 */
		$this->loader->add_filter( 'acf/settings/url', $plugin_admin, 'fa_acf_settings_url' );
		$this->loader->add_filter( 'acf/settings/show_admin', $plugin_admin, 'fa_acf_settings_show_admin' );
		// $this->loader->add_filter( 'acf/init', $plugin_admin, 'fa_register_acf_fields' );

		/**
		 * Register Custom Post Types for this project
		 */
		// $this->loader->add_action( 'init', $plugin_admin, 'fa_orders_custom_post_type', 0 );
		// $this->loader->add_action( 'init', $plugin_admin, 'fa_service_plan_custom_post_type', 0 );
		// $this->loader->add_action( 'init', $plugin_admin, 'fa_ticket_custom_post_type', 0 );

		/**
		 * Let us create a new template for our wizard to handle our application logic page separately
		 */
		// Add a filter to the attributes metabox to inject template into the cache.
		if ( version_compare( floatval( get_bloginfo( 'version' ) ), '4.7', '<' ) ) {
			$this->loader->add_filter( 'page_attributes_dropdown_pages_args', $plugin_admin, 'register_project_templates' );
		} else {
			// Add a filter to the wp 4.7 version attributes metabox
			$this->loader->add_filter( 'theme_page_templates', $plugin_admin, 'add_new_template' );
		}

		// Add a filter to the save post to inject out template into the page cache
		$this->loader->add_filter( 'wp_insert_post_data', $plugin_admin, 'register_project_templates' );

		// Add a filter to the template include to determine if the page has our
		// template assigned and return it's path
		$this->loader->add_filter( 'template_include', $plugin_admin, 'view_project_template');

		/** Adding columns to the table */
		$this->loader->add_filter( 'manage_edit-shop_order_columns', $plugin_admin, 'fa_wc_new_order_column' );

		/** adding columns to the order table */
		$this->loader->add_action( 'manage_shop_order_posts_custom_column', $plugin_admin, 'fa_wc_edit_column_content' );

		/** Adding order information in the order details page */
		$this->loader->add_action( 'woocommerce_admin_order_data_after_order_details', $plugin_admin, 'fa_editable_order_meta_general' );

		/** Adding details to order data */
		$this->loader->add_action( 'woocommerce_admin_order_data_after_billing_address', $plugin_admin, 'fa_woocommerce_order_details_after_order_table' );

		/** Adding details to order email */
		$this->loader->add_filter( 'woocommerce_email_order_meta', $plugin_admin, 'fa_woocommerce_email_order_meta' );

	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 */
	private function define_public_hooks() {

		$plugin_public = new Force_Alarm_Public( $this->get_plugin_name(), $this->get_version() );

		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_styles' );
		$this->loader->add_action( 'wp_enqueue_scripts', $plugin_public, 'enqueue_scripts' );

		$this->loader->add_action( 'wp_head', $plugin_public, 'fa_wp_head_global_variables' );
		
		/**
		 * Public Webservices
		 *
		 * Usage: POST action=force-alarm-<ACTION_NAME>&param=param
		 * Content-Type: application/x-www-form-urlencoded
		 */
		$this->loader->add_filter( 'allowed_http_origins', $plugin_public, 'fa_allowed_origins' );
		/* Plan Services */
		$this->loader->add_action( 'wp_ajax_force-alarm-services', $plugin_public, 'fa_ajax_get_service_handler' );
		$this->loader->add_action( 'wp_ajax_nopriv_force-alarm-services', $plugin_public, 'fa_ajax_get_service_handler' );
		/* Orders */
		$this->loader->add_action( 'wp_ajax_force-alarm-orders', $plugin_public, 'fa_ajax_process_orders_handler' );
		$this->loader->add_action( 'wp_ajax_nopriv_force-alarm-orders', $plugin_public, 'fa_ajax_process_orders_handler' );
		/* Contents for wizard */
		$this->loader->add_action( 'wp_ajax_force-alarm-content', $plugin_public, 'fa_ajax_wizard_content' );
		$this->loader->add_action( 'wp_ajax_nopriv_force-alarm-content', $plugin_public, 'fa_ajax_wizard_content' );
		$this->loader->add_action( 'wp_ajax_force-alarm-test', $plugin_public, 'fa_ajax_TEST' );
		$this->loader->add_action( 'wp_ajax_nopriv_force-alarm-test', $plugin_public, 'fa_ajax_TEST' );

		/* Add filter to allow html */
		$this->loader->add_filter( 'wp_mail_content_type', $plugin_public, 'fa_wp_mail_content_type_html' );
		/* Add the logo to all our emails :hehe */
		$this->loader->add_action( 'phpmailer_init', $plugin_public, 'fa_add_logo_to_email' );
		/* Update emails */
		$this->loader->add_action( 'wp_mail', $plugin_public, 'fa_wp_email_filter' );
		/** Update new user login email message */
		$this->loader->add_filter( 'wp_new_user_notification_email', $plugin_public, 'fa_wp_new_user_notification_email', 10, 3 );
		
		/** Filter for adding button in the awsome support ticket */
		$this->loader->add_filter( 'wpas_frontend_add_nav_buttons', $plugin_public, 'fa_wpas_frontend_add_nav_buttons' );

	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 */
	public function run() {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name() {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Force_Alarm_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader() {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Register Advance Custom Fields for Service Plan CPT
	 * 
	 * @since 1.6.0
	 */
	public function fa_register_acf_fields() {
		require_once plugin_dir_path( dirname( __FILE__ ) ) . 'includes/force-alarm-acf-fields/fa-service-plan.php';
	}

}
