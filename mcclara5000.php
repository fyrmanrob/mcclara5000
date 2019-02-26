<?php
/**
* Plugin Name: McClara 5000
* Plugin URI: fyrmanrob.com
* Description: Main PHP file
* Author: Rob McClara
* Version: 1.0
*/

require ( 'inc/rapid-acct.php' );
require ( 'inc/status-changes.php' );

/*************************************
//   Prevents Malicious Attacks
**************************************/
	if ( ! defined ( 'ABSPATH' ) ) {
		exit;
	}


/*************************************
//   Add CSS & JS Files
**************************************/
function rm_enqueue_scripts() {
         wp_enqueue_style( 'rm_main_css', 			plugins_url( 'css/main.css', 		__FILE__ ) );
         wp_enqueue_style( 'rm_call_entry_css', 	plugins_url( 'css/call-entry.css', 	__FILE__ ) );
         wp_enqueue_style( 'rm_dispatch_css', 		plugins_url( 'css/dispatch.css', 	__FILE__ ) );
         wp_enqueue_style( 'rm_rapid_acct_css', 	plugins_url( 'css/rapid-acct.css', 	__FILE__ ) );
         wp_enqueue_style( 'rm_tracking_css', 		plugins_url( 'css/tracking.css', 	__FILE__ ) );
         wp_enqueue_style( 'rm_jquery_css', 		plugins_url( 'css/jquery.css', 		__FILE__ ) );
         wp_enqueue_style( 'rm_media_queries_css', 	plugins_url( 'css/media-queries.css',__FILE__ ) );
         wp_enqueue_style( 'rm_fdic_buses_css', 	plugins_url( 'css/fdic-buses.css', 	__FILE__ ) );
    
         wp_enqueue_script( 'rm_rapid_acct_js', plugins_url( 'js/rapid-acct.js', 	__FILE__ ), array( 'jquery' ), '', true );
         wp_enqueue_script( 'rm_call_entry_js', plugins_url( 'js/call-entryt.js', 	__FILE__ ), array( 'jquery' ), '', true );
         wp_enqueue_script( 'rm_tracking_js', 	plugins_url( 'js/tracking.js', 		__FILE__ ), array( 'jquery' ), '', true );
         wp_enqueue_script( 'rm_dispatch_js', 	plugins_url( 'js/dispatch.js',		__FILE__ ), array( 'jquery' ), '', true );
         wp_enqueue_script( 'rm_jquery_js', 	plugins_url( 'js/jquery.js',		__FILE__ ), array( 'jquery' ), '', true );
}
add_action( 'wp_enqueue_scripts', 'rm_enqueue_scripts' );


/*************************************
*   Activate AJAX
**************************************/
function rm_localize_Ajax() { 

	wp_enqueue_script( 'ajax-script', get_stylesheet_directory_uri() . '/js/my-ajax-script.js', array('jquery'), '1.0.0', true );
	wp_localize_script( 'ajax-script', 'my_ajax_object', array( 'ajaxurl' => admin_url( 'admin-ajax.php' ) ) );

}
//add_action('wp_enqueue_scripts', 'rm_localize_Ajax');


/*************************************
*	Enqueue Dashicons
**************************************/
function load_dashicons_front_end() {
	wp_enqueue_style( 'dashicons' );
}
add_action( 'wp_enqueue_scripts', 'load_dashicons_front_end' );


/*********************************************
*  Disables Automatic Add Paragraph feature
**********************************************/	
remove_filter( 'the_content', 'wpautop' );


/*************************************
//   Enqueue jQuery UI Core
**************************************/
/*function get_jq_ui() {
	
	wp_enqueue_script('jquery-ui-core', '/wp-includes/js/jquery/ui/core.min.js', array('jquery'), '1.12.1');
	
	wp_enqueue_script('jquery-ui-sortable', '/wp-includes/js/jquery/ui/core.min.js', array('jquery'), '1.12.1');

	wp_enqueue_script('jquery-ui-draggable', '/wp-includes/js/jquery/ui/core.min.js', array('jquery'), '1.12.1');

}*/
//add_action('wp_enqueue_scripts', 'get_jq_ui');



/***************************************************
//   Enqueue jQuery Mobile Scripts & Styling
//        It is not a default script in wordpress
****************************************************/

/* NOTE:  This is causing "loading" to be displayed in the footer of the page */
function get_jqmobile() { 

	wp_enqueue_script('jqmobile_js', 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.js', array('jquery'), '1.4.5');

	wp_enqueue_style ('jqmobile_css', 'https://ajax.googleapis.com/ajax/libs/jquerymobile/1.4.5/jquery.mobile.min.css', array('jquery'), '1.4.5');

} 
//add_action('wp_enqueue_scripts', 'get_jqmobile');

/*************************************
//   Enqueue jQuery UI Sortable
**************************************/
// function get_jq_ui_sortable() {
	
// }
// add_action('wp_enqueue_scripts', 'get_jq_ui_sortable');


/*************************************
//   Enqueue jQuery UI Sortable
**************************************/
// function get_jq_ui_draggable() {
	
// }
// add_action('wp_enqueue_scripts', 'get_jq_ui_draggable');


/*************************************
//   Enqueue jQuery Touch-Punch
**************************************/
// function get_jq_touch_punch() {

// 	wp_enqueue_script ('jq_touch_punch', 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js', array( 'jquery' ), '0.2.3');
// }
//add_action('wp_enqueue_scripts', 'get_jq_touch_punch');

