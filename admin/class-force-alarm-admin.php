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
	 * The array of templates that this plugin tracks.
	 */
	protected $templates;

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

		$this->create_admin_settings_pages();

		// Add your templates to this array.
		$this->templates = array(
			'fa-app-page.php' => 'Force Alarm App Page',
		);
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
	 * Add custom options pages for ForceAlarm
	 */
	public function create_admin_settings_pages() {
		
		acf_add_options_page(array(
			'page_title' 	=> 'Force Alarm Settings',
			'menu_title'	=> 'Force Alarm Settings',
			'menu_slug' 	=> 'force-alarm-page',
			'position'		=> 14,
			'capability'	=> 'manage_options',
			'parent_slug'	=> 'options-general.php',
			'redirect'		=> true
		));
		
		acf_add_options_page(array(
			'page_title' 	=> 'Force Alarm Payment Settings',
			'menu_title'	=> 'Force Alarm Payment Settings',
			'menu_slug' 	=> 'force-alarm-payment-settings',
			'position'		=> 15,
			'capability'	=> 'manage_options',
			'parent_slug'	=> 'options-general.php',
			'redirect'		=> true
		));
		
	}

	/**
	 * Map all CPT to be child of custom options Force Alarm
	 */
	public function fa_create_submenus_map() {
		// add_submenu_page( $parent_slug:string, $page_title:string, $menu_title:string, $capability:string, $menu_slug:string, $function:callable )
		// add_submenu_page('admin.php?page=force-alarm-page', 'Orders', 'Orders', 'edit_posts', 'edit.php?post_type=fa_orders');
	}

	/**
	 * Register the Orders Custom Post Type.
	 * 
	 * The Clients are the ones that can create orders,
	 * but when they are still visitors, so, adding the 
	 * capability to read orders won't be entirely necesary 
	 * because we will fetch the orders based on the clients
	 * ID.
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
			'show_in_rest'			=> true,
			'show_in_menu' 			=> true,
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
	 * Register Service Plan Custom Post Type
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
			'supports'              => array( 'title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields', 'page-attributes', 'post-formats', 'excerpt' ),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_rest'			=> true,
			'show_in_menu'          => true,
			'menu_position'         => 16,
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

	/**
	 * Register Tickets Custom Post Type.
	 * 
	 * For further issues please see:
	 * @see {@link https://wordpress.stackexchange.com/questions/299859/custom-post-type-role-permissions-wont-let-me-read}
	 * @see {@link https://wordpress.stackexchange.com/questions/108338/capabilities-and-custom-post-types}
	 * @see {@link https://wedevs.com/98266/add-custom-user-roles-wordpress/}
	 * 
	 * @since 1.1.2
	 */
	public function fa_ticket_custom_post_type() {

		$labels = array(
			'name'                  => _x( 'Tickets', 'Post Type General Name', 'force-alarm' ),
			'singular_name'         => _x( 'Ticket', 'Post Type Singular Name', 'force-alarm' ),
			'menu_name'             => __( 'Tickets', 'force-alarm' ),
			'name_admin_bar'        => __( 'Tickets', 'force-alarm' ),
			'archives'              => __( 'Tickets Archives', 'force-alarm' ),
			'attributes'            => __( 'Tickets Attributes', 'force-alarm' ),
			'parent_item_colon'     => __( 'Parent Ticket:', 'force-alarm' ),
			'all_items'             => __( 'All Tickets', 'force-alarm' ),
			'add_new_item'          => __( 'Add Ticket', 'force-alarm' ),
			'add_new'               => __( 'Add New', 'force-alarm' ),
			'new_item'              => __( 'New Ticket', 'force-alarm' ),
			'edit_item'             => __( 'Edit Ticket', 'force-alarm' ),
			'update_item'           => __( 'Update Ticket', 'force-alarm' ),
			'view_item'             => __( 'View Ticket', 'force-alarm' ),
			'view_items'            => __( 'View Tickets', 'force-alarm' ),
			'search_items'          => __( 'Search Ticket', 'force-alarm' ),
			'not_found'             => __( 'Ticket Not found', 'force-alarm' ),
			'not_found_in_trash'    => __( 'Ticket Not found in Trash', 'force-alarm' ),
			'featured_image'        => __( 'Ticket Featured Image', 'force-alarm' ),
			'set_featured_image'    => __( 'Set featured image', 'force-alarm' ),
			'remove_featured_image' => __( 'Remove featured image', 'force-alarm' ),
			'use_featured_image'    => __( 'Use as featured image', 'force-alarm' ),
			'insert_into_item'      => __( 'Insert into Ticket', 'force-alarm' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Ticket', 'force-alarm' ),
			'items_list'            => __( 'Tickets list', 'force-alarm' ),
			'items_list_navigation' => __( 'Tickets list navigation', 'force-alarm' ),
			'filter_items_list'     => __( 'Filter Tickets list', 'force-alarm' ),
		);
		$capabilities = array(		
			'create_posts'	 		=> 'edit_tickets',
			'read_post'             => 'read_ticket',
			'read_posts'            => 'read_tickets',
			'read_private_posts'    => 'read_private_tickets',
			'edit_post'             => 'edit_ticket',
			'edit_posts'            => 'edit_tickets',
			'edit_others_posts'     => 'edit_others_tickets',
			'publish_posts'         => 'publish_tickets',
			'delete_post'           => 'delete_ticket',
			'delete_posts'      	=> 'delete_tickets',
		);
		$args = array(
			'label'                 => __( 'Ticket', 'force-alarm' ),
			'description'           => __( 'Force Alarms Support Tickets', 'force-alarm' ),
			'labels'                => $labels,
			'supports'              => array( 'title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields', 'page-attributes', 'post-formats' ),
			'hierarchical'          => false,
			'public'                => true,
			'show_ui'               => true,
			'show_in_rest'			=> true,
			'show_in_menu'          => true,
			'menu_position'         => 17,
			'menu_icon'             => 'dashicons-sos',
			'show_in_admin_bar'     => true,
			'show_in_nav_menus'     => true,
			'can_export'            => true,
			'has_archive'           => true,
			'exclude_from_search'   => true,
			'publicly_queryable'    => true,
			'capabilities'          => $capabilities,
			'map_meta_cap' 			=> true
		);
		register_post_type( 'fa_ticket', $args );

	}
	
	/**
	 * Adds our template to the pages cache in order to trick WordPress
	 * into thinking the template file exists where it doens't really exist.
	 */
	public function register_project_templates( $atts ) {
		// Create the key used for the themes cache
		$cache_key = 'page_templates-' . md5( get_theme_root() . '/' . get_stylesheet() );
		// Retrieve the cache list.
		// If it doesn't exist, or it's empty prepare an array
		$templates = wp_get_theme()->get_page_templates();
		if ( empty( $templates ) ) {
			$templates = array();
		}
		// New cache, therefore remove the old one
		wp_cache_delete( $cache_key , 'themes');
		// Now add our template to the list of templates by merging our templates
		// with the existing templates array from the cache.
		$templates = array_merge( $templates, $this->templates );
		// Add the modified cache to allow WordPress to pick it up for listing
		// available templates
		wp_cache_add( $cache_key, $templates, 'themes', 1800 );
		return $atts;
	}

	/**
	 * Adds our template to the page dropdown for v4.7+
	 *
	 */
	public function add_new_template( $posts_templates ) {
		$posts_templates = array_merge( $posts_templates, $this->templates );
		return $posts_templates;
	}

	/**
	 * Checks if the template is assigned to the page
	 */
	public function view_project_template( $template ) {
		// Return the search template if we're searching (instead of the template for the first result)
		if ( is_search() ) {
			return $template;
		}
		// Get global post
		global $post;
		// Return template if post is empty
		if ( ! $post ) {
			return $template;
		}
		// Return default template if we don't have a custom one defined
		if ( ! isset( $this->templates[get_post_meta(
			$post->ID, '_wp_page_template', true
		)] ) ) {
			return $template;
		}
		// Allows filtering of file path
		$filepath = apply_filters( 'page_templater_plugin_dir_path', plugin_dir_path( __FILE__ ) );
		$file =  $filepath . get_post_meta(
			$post->ID, '_wp_page_template', true
		);
		// Just to be safe, we check if the file exist first
		if ( file_exists( $file ) ) {
			return $file;
		} else {
			echo $file;
		}
		// Return template
		return $template;
	}

	/**
	 * Adding custom columns to the order list
	 */
	public function fa_wc_new_order_column( $columns ) {
		$columns['fecha_install'] = 'Fecha Instalación';
    	return $columns;
	}

	/**
	 * Adding columns to the order table list 
	 */
	public function fa_wc_edit_column_content( $column ) {
		global $post;
		$order = new WC_Order( $post->ID );
		if ( 'fecha_install' === $column ) {
			$fecha_instalacion = get_post_meta( $post->ID, 'billing_inst_date', true );
			$hora_instalacion = get_post_meta( $post->ID, 'billing_inst_time', true );
			$column_value = sprintf("%s • %s", $fecha_instalacion, $hora_instalacion );
			echo $column_value;
		}
	}

	/**
	 * Adding order details in the order page
	 */
	public function fa_editable_order_meta_general( $order ) {
		
		?>
		<br class="clear" />
		<h3>Detalles de la Instalación <!--<a href="#" class="edit_address">Edit</a> --></h3>
		<?php 
			/*
			 * get all the meta data values we need
			 */ 
			$billing_inst_date = get_post_meta( $order->id, 'billing_inst_date', true );
			$billing_inst_time = get_post_meta( $order->id, 'billing_inst_time', true );
			$billing_inst_address = get_post_meta( $order->id, 'billing_inst_address', true );
			$billing_inst_reference = get_post_meta( $order->id, 'billing_inst_reference', true );
			$billing_inst_sector = get_post_meta( $order->id, 'billing_inst_sector', true );
			$billing_inst_province = get_post_meta( $order->id, 'billing_inst_province', true );
		?>
		<div class="address">
			<p><strong>Fecha de Instalación:</strong> <?php echo $billing_inst_date; ?></p>
			<p><strong>Hora de Instalación:</strong> <?php echo $billing_inst_time; ?></p>
			<p><strong>Lugar:</strong> <?php echo sprintf("%s , %s", $billing_inst_address, $billing_inst_sector ); ?></p>
			<p><strong>Referencia:</strong> <?php echo $billing_inst_reference; ?></p>
			<p><strong>Provincia:</strong> <?php echo $billing_inst_province; ?></p>
		</div>
		<?php
	}

	/**
	 * Adding custom cedula in order
	 */
	public function fa_woocommerce_order_details_after_order_table( $order ) {
		$user_id = get_post_meta( $order->id, '_customer_user', true );
		$user_cedula = get_user_meta( $user_id, 'billing_cedula', true );
		
		echo '<p><strong>'.__('Cedula').':</strong> <br />' . $user_cedula . '</p>';

	}

}
