<?php 
/**
 *
 * Force Alarm Email
 * 
 * Example @see {@link https://postmarkapp.com/guides/receipt-and-invoice-email-best-practices}
 */
class FA_Email {

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
	public function __construct( $options = array( 
		'template' => 'base',
		'subject' => 'Message'
	)) {
        $this->path = plugin_dir_path( dirname( __FILE__ ) ) . 'public/patials/email-%s.html';

        $this->available_templates = array(
            'base' => array('content', 'table')
        );
        
		$this->template = $options['template'];
		$this->set_subject( $options['subject'] );
        $this->get_template();
	}
	
	/**
     * Get template from file
	 * 
	 * hold the template into a string for future manipulation.
     */
	public function get_template() {
		ob_start();
		require sprintf( $this->path, $this->template );
		$this->html = ob_get_clean();

		return $this;
	}
	/**
	 * Add a module by row
	 * 
	 * Inserts a module given the module name
	 */
	public function add_module( $module_name, $module_data = array() ) {
		switch ($module_name) {
			case 'table':
				$module_result = $this->_insert_table_module( $module_data );
				$this->html = str_replace('<!-- MODULE_DYNAMIC -->', $module_result, $this->html);
				return $this;
				break;
			
			default:
				# code...
				break;
		}
	}
	private function _insert_content_module( $title, $content ) {}
	private function _insert_table_module( $table_data = array() ) {
		$module = $this->_get_module_string();
		$table_container = $this->_get_table_container();
		
		if ( isset( $table_data['table_header'] )) {
			$table_container = str_replace('<!--table_header-->', $table_data['table_header'], $table_container);
		}
		/**
		 * $table_data[] => array(
		 * 		row => rows_values(
		 * 			col, col
		 * 		)
		 * 		row => rows_values(
		 * 			col, col
		 * 		)
		 * )
		 */
		if ( isset( $table_data['table_data'] )) {
			foreach ($table_data['table_data'] as $rows_index => $rows_values) {
				$table_row = $this->_get_table_row();
				foreach ($rows_values as $col) {
					$table_col = $this->_get_table_col();
					$table_col = str_replace('<!--table_col-->', $col, $table_col);
				}
				$table_row = str_replace('<!--table_row-->', $table_col, $table_row);
			}
			$table_container = str_replace('<!--table_content-->', $table_row, $table_container);
		}
		$module = str_replace('<!--module_content-->', $table_container, $module);

		return $module;
		
	}
	public function set_title( $title ) {
		$this->email = str_replace( '%title%', $title, $this->email );
		return $this;
	}
	public function set_message( $message ) {
		$this->email = str_replace( '%message%', $message, $this->email );
		return $this;
    }
    /**
     * Set subject in text readable for email clients
     */
	public function set_subject( $subject ) {
		$this->html = str_replace( '<!--%subject%-->', $subject, $this->html );
		return $this;
	}
	public function set_cta( $link, $text ) {
		
		$cta_tpl = '<table border="0" cellpadding="0" cellspacing="0" width="50%" class="emailButton" style="background-color:#0064A1;"><tr><td align="center" valign="middle" class="buttonContent" style="padding-top:15px;padding-bottom:15px;padding-right:15px;padding-left:15px;"><a style="color:#FFFFFF;text-decoration:none;font-family:Helvetica,Arial,sans-serif;font-size:20px;line-height:150%;" href="%link%" target="_blank">%text%</a></td></tr></table>';
		
		$cta = str_replace( '%link%', $link, $cta_tpl );
		$cta = str_replace( '%text%', $text, $cta );

		$this->email = str_replace( '<!--%cta%-->', $cta, $this->email );
		return $this;
    }
    
    /**
     * Return the html
     */
	public function get_html() {
		return $this->html;
	}
	private function _get_table_container() {
		$str = <<<MOD
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
	}
	private function _get_table_col() {
		$str = <<<MOD
		<td style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; border-top-width: 1px; border-top-color: #eee; border-top-style: solid; margin: 0; padding: 5px 0;" align="right" valign="top">
			<!--table_col-->
		</td>
		MOD;
	}
	private function _get_table_row() {
		$str = <<<MOD
		<tr style="font-family: &quot;Helvetica Neue&quot;, &quot;Helvetica&quot;, Helvetica, Arial, sans-serif; box-sizing: border-box; font-size: 14px; margin: 0; padding: 0;">
			<!--table_row-->
		</tr>
		MOD;
	}
	private function _get_module_string() {
		$str = <<<MOD
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