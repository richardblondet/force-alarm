<?php 
/**
 *
 * Force Alarm Email
 * 
 * Example @see {@link https://postmarkapp.com/guides/receipt-and-invoice-email-best-practices}
 */
class Force_Alarm_Email {

    /**
	 * The template used.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $template
	 */
    protected $template;
    
    /**
	 * The html holding the entire message
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $html
	 */
	protected $html;
	
	/**
	 * Available templates and its modules
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $html
	 */
	protected $available_templates;

    /**
	 * The template path to locate templates
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $path
	 */
    protected $path;

	/**
	 * Class Construct 
	 * 
	 * initialize with basic configuration
	 */
	public function __construct( $options = array( 'template' => 'base','subject' => 'Message') ) {
		$this->path = plugin_dir_path( dirname( __FILE__ ) ) . 'public/partials/email-%s.html';

        $this->available_templates = array(
            'base' => array('content', 'table')
        );
        
		$this->template = $options['template'];
		$this->set_subject( $options['subject'] );
        $this->init();
	}
	
	// load html into var
	private function init() {
		$this->html = file_get_contents(sprintf( $this->path, $this->template ));
	}
	/**
	 * Add a module by row
	 * 
	 * Inserts a module given the module name
	 */
	public function add_module( $module_name, $module_data = array() ) {
		$module_result = '';
		switch ($module_name) {
			case 'table':
				$module_result = $this->_insert_table_module( $module_data );
				return $module_result;
				break;
			
			case 'content':
				$module_result = $this->_insert_content_module( $module_data );
				break;
		}
		$this->html = str_replace('<!-- MODULE_DYNAMIC -->', $module_result, $this->html);
		return $this;
	}
	// insert content module
	private function _insert_content_module( $data = array('title' => 'TITLE', 'message' => 'MESSAGE' )) {
		$module = $this->_get_module_string();
		
		$content_container = $this->_get_content_container();
		$content_container = str_replace('<!--title-->', $data['title'], $content_container);
		$content_container = str_replace('<!--message-->', $data['message'], $content_container);

		$module = str_replace('<!--module_content-->', $content_container, $module);
		return $module;
	}
	// insert table module
	private function _insert_table_module( $table_data = array() ) {
		
		$module = "";
		$table_container = $this->_get_table_container();
		
		if ( isset( $table_data['table_header'] )) {
			$table_container = str_replace('<!--table_header-->', $table_data['table_header'], $table_container);
		}
		/**
		 * $table_data = rows(
		 * 		row( col, col ),
		 *		row( col, col )
		 * )
		 */
		if ( isset( $table_data['table_data'] )) {
			$module = array_reduce($table_data['table_data'], array($this, '_build_table_body'));
			$table_container = str_replace('<!--table_content-->', $module, $table_container);
		}
		return $table_container;	
	}
	// build table body
	private function _build_table_body($a, $b){
		$table_col_attrs = 'style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top"';
		return $a .= sprintf('<tr><td %1$s>' . implode( '</td><td %1$s>', $b ) . "</td></tr>", $table_col_attrs);
	}
    /**
     * Set subject in text readable for email clients
     */
	public function set_subject( $subject ) {
		$this->html = str_replace( '<!--%subject%-->', $subject, $this->html );
		return $this;
	}
	/**
     * Set CTA in there
     */
	public function set_cta( $link, $text ) {
		
		$cta_tpl = '<table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color:#0064A1;"><tr><td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"><a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:150%;" href="%link%" target="_blank">%text%</a></td></tr></table>';
		
		$cta = str_replace( '%link%', $link, $cta_tpl );
		$cta = str_replace( '%text%', $text, $cta );

		$this->html = str_replace( '<!--%cta%-->', $cta, $this->html );
		return $this;
    }
    /**
     * Return the html
     */
	public function get_html() {
		return $this->html;
	}
	// get content container
	private function _get_content_container() {
		$str = <<< MOD
		<table border="0" cellpadding="0" cellspacing="0" width="100%">
			<tr>
				<td valign="top" class="textContent" style="padding: 0 25px;">
					<h3 mc:edit="header" style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;"><!--title--></h3>
					<div mc:edit="body" style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;"><!--message--></div>
				</td>
			</tr>
		</table>
MOD;
		return $str;
	}
	// get table container
	private function _get_table_container() {
		$str = <<< MOD
		<table style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; text-align: left; width: 90%; margin: 15px auto; padding: 0;">
			<tbody>
				<tr style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
					<td style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 5px 0;" valign="top">
						<!--table_header-->
					</td>
				</tr>
				<tr style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
					<td style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 5px 0;" valign="top">
						<table cellpadding="0" cellspacing="0" style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; margin: 0; padding: 0;">
							<tbody>
								<!--table_content-->
							</tbody>
						</table>
					</td>
				</tr>
			</tbody>
		</table>
MOD;
		return $str;
	}
	// get table col
	private function _get_table_col() {
		$str = <<< MOD
		<td style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top">
			<!--table_col-->
		</td>
MOD;
		return $str;
	}
	// get table row
	private function _get_table_row() {
		$str = <<< MOD
		<tr style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
			<!--table_row-->
		</tr>
MOD;
		return $str;
	}
	// get module row string
	private function _get_module_string() {
		$str = <<< MOD
		<!-- MODULE ROW // -->
		<tr>
			<td align="center" valign="top">
				<!-- CENTERING TABLE // -->
				<table border="0" cellpadding="0" cellspacing="0" width="100%" >
					<tr>
						<td align="center" valign="top">
							<!-- FLEXIBLE CONTAINER // -->
							<table border="0" cellpadding="0" cellspacing="0" width="600" class="flexibleContainer">
								<tr>
									<td align="center" valign="top" width="600" class="flexibleContainerCell">
										<table border="0" cellpadding="10" cellspacing="0" width="100%">
											<tr>
												<td align="center" valign="top">
													<!-- CONTENT // -->
													<!--module_content-->
													<!-- // CONTENT -->
												</td>
											</tr>
										</table>
									</td>
								</tr>
							</table>
							<!-- // FLEXIBLE CONTAINER -->
						</td>
					</tr>
				</table>
				<!-- // CENTERING TABLE -->
			</td>
		</tr>
		<!-- // MODULE ROW -->
MOD;

		return $str;
	}
}