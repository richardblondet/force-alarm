<?php

/**
 * Response 
 * @deprecated 
 * @see wp_send_json, wp_send_json_error and wp_send_json_success
 * @see  {@link https://developer.wordpress.org/reference/functions/wp_send_json/}
 */
function fans_response( $arr = array(), $header = 'Content-Type:application/json; charset=UTF-8' ) {
	$json = json_encode( $arr );

	header( $header );
	echo $json;
	wp_die();
}