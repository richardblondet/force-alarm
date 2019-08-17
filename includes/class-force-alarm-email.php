<?php 
/**
 *
 * Fans Dominos Emails
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
	 * The template path to locate templates
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      array    $path
	 */
    protected $path;
    
	var $template_path = CHILD_TEMPLATEPATH_PATH.'/partials/email/%s.php';
	var $template_name = 'base-email';
	
	var $email;

	public function __construct( $options = array() ) {
        $this->path = plugin_dir_path( dirname( __FILE__ ) ) . 'public/patials/email-%s.html';

        $available_templates = array(
            'base'
        );
        
        $this->template = $options['template'];

        // hold the string in here for future manipulation
        $this->html = $this->get_template();
	}
	public function set_template_name( $name ) {
		$this->template_name = $name;
		return $this;
	}
	public function set_template( $template_path, $template_name ) {
		$this->template = sprintf( $template_path, $template_name );
		return $this;
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
     * Get template from file to string by buffer
     */
	public function get_template() {
		ob_start();
		require sprintf( $this->path, $this->template );
		$output = ob_get_clean();
		
		return $output;
    }
    /**
     * Return the html
     */
	public function get_html() {
		return $this->html;
	}
}