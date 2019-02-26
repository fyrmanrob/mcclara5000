<?php

/*************************************
//   Prevents Malicious Attacks
**************************************/
	if ( ! defined ( 'ABSPATH' ) ) {
		exit;
	}

echo ( 'rapid-acct.php is included' );

/******************************************
//   Get Rapid Accountability List Titles
*******************************************/
function get_rapidStatus_listTitles() {

	global $wpdb;

		$results = $wpdb->get_results( "SELECT * FROM wpcv_rapidListTitle", ARRAY_A );

		$json_results = ( json_encode( $results ) );

		echo $json_results;
	
	die();

}
add_action( 'wp_ajax_get_rapidStatus_listTitles', 'get_rapidStatus_listTitles' );
add_action( 'wp_ajax_nopriv_get_rapidStatus_listTitles', 'get_rapidStatus_listTitles' );


/***************************************
//   Get Rapid Accountability Resources
****************************************/
function get_rapidStatus_resources() {

	global $wpdb;

		$results = $wpdb->get_results( "SELECT * FROM wpcv_rapidStatus", ARRAY_A );

		$json_results = ( json_encode( $results ) );

		echo $json_results;
	
	die();

}
add_action( 'wp_ajax_get_rapidStatus_resources', 'get_rapidStatus_resources' );
add_action( 'wp_ajax_nopriv_get_rapidStatus_resources', 'get_rapidStatus_resources' );


/*********************************************
//   UPDATE RESOURCE NAME CHANGES
**********************************************/
function update_listTitle_text() {

		$updatedTitleID = $_POST['updatedTitleID'];
        $updatedTitleText = $_POST['updatedTitleText'];

        // Update the database record with the text
        global $wpdb;

		$wpdb->update(
			// Table Name
			'wpcv_rapidListTitle',

			// data 
			array( 'ra_listTitleText'   => $updatedTitleText ), 

			// where
			array( 	'ra_listTitleID' => $updatedTitleID ) 
		);	

	die();

}
add_action( 'wp_ajax_update_listTitle_text', 'update_listTitle_text' );
add_action( 'wp_ajax_nopriv_update_listTitle_text', 'update_listTitle_text' );


/**************************************
//   UPDATE RESOURCE NAME CHANGES
***************************************/
function update_input_text() {

		$updatedInpID = $_POST['updatedInpID'];
        $updatedResourceName = $_POST['updatedResourceName'];

        // Update the database record with the text
        global $wpdb;

		$wpdb->update(
			// Table name
			'wpcv_rapidStatus',

			// Data
			array( 'ra_resourceName' => $updatedResourceName ),

			// Where
			array( 'ra_resourceID' => $updatedInpID )

		);	

	die();

}
add_action( 'wp_ajax_update_input_text', 'update_input_text' );
add_action( 'wp_ajax_nopriv_update_input_text', 'update_input_text' );



/*********************************************
//   INSERT NEWLY ADDED ROW INTO DATABASE
**********************************************/
function insert_new_row() {

	$ra_resourceID = $_POST['ra_resourceID'];
    $ra_statusID   = $_POST['ra_statusID'];

        //Update the database record with the text
        global $wpdb;

		$wpdb->insert(
			// Table name
			'wpcv_rapidStatus',

			// Data
			array( 
					'ra_resourceID'   => $ra_resourceID,					
					'ra_statusID'     => $ra_statusID,
					'ra_status'       => 'OFF DUTY'					
			)
		);	

	die();
}
add_action( 'wp_ajax_insert_new_row', 'insert_new_row' );
add_action( 'wp_ajax_nopriv_insert_new_row', 'insert_new_row' );

