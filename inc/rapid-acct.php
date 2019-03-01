<?php

/*************************************
//   Prevents Malicious Attacks
**************************************/
	if ( ! defined ( 'ABSPATH' ) ) {
		exit;
	}


/*********************************************
//   UPDATE COLUMN TITLE CHANGES
**********************************************/
function ra_update_column_title() {

	$updatedColumnTitleID   = esc_html( $_POST['ra_column_title_ID'] );
	echo ( '$updatedColumnTitleID: ' + $updatedColumnTitleID );

    $updatedColumnTitle 	= esc_html( $_POST['ra_column_title'] );
    echo ( '$updatedColumnTitle: ' + $updatedColumnTitle );

    // Update the database record with the text
    global $options;

    $options['ra_column_title_ID'] 	= $updatedColumnTitleID;
    $options['ra_column_title'] 	= $updatedColumnTitle;
	
	
	update_option( 'ra_column_titles', $options );

	die();

}
add_action( 'wp_ajax_ra_update_column_title', 'ra_update_column_title' );
add_action( 'wp_ajax_nopriv_ra_update_column_title', 'ra_update_column_title' );


/******************************************
//   Get Rapid Acct Column Titles
*******************************************/
function ra_get_column_titles() {

	global $options;

		$ra_column_titles = get_option( 'ra_column_titles' );

		$json_results = ( json_encode( $results ) );

		echo $json_results;
	
	die();

}
add_action( 'wp_ajax_ra_get_column_titles', 'ra_get_column_titles' );
add_action( 'wp_ajax_nopriv_ra_get_column_titles', 'ra_get_column_titles' );



/***************************************
//   Get Rapid Accountability Resources
****************************************/
// function get_rapidStatus_resources() {

// 	global $wpdb;

// 		$results = $wpdb->get_results( "SELECT * FROM wpcv_rapidStatus", ARRAY_A );

// 		$json_results = ( json_encode( $results ) );

// 		echo $json_results;
	
// 	die();

// }
// add_action( 'wp_ajax_get_rapidStatus_resources', 'get_rapidStatus_resources' );
// add_action( 'wp_ajax_nopriv_get_rapidStatus_resources', 'get_rapidStatus_resources' );


/**************************************
//   UPDATE RESOURCE NAME CHANGES
***************************************/
// function update_input_text() {

// 		$updatedInpID = $_POST['updatedInpID'];
//         $updatedResourceName = $_POST['updatedResourceName'];

//         // Update the database record with the text
//         global $wpdb;

// 		$wpdb->update(
// 			// Table name
// 			'wpcv_rapidStatus',

// 			// Data
// 			array( 'ra_resourceName' => $updatedResourceName ),

// 			// Where
// 			array( 'ra_resourceID' => $updatedInpID )

// 		);	

// 	die();

// }
// add_action( 'wp_ajax_update_input_text', 'update_input_text' );
// add_action( 'wp_ajax_nopriv_update_input_text', 'update_input_text' );



/*********************************************
//   INSERT NEWLY ADDED ROW INTO DATABASE
**********************************************/
// function insert_new_row() {

// 	$ra_resourceID = $_POST['ra_resourceID'];
//     $ra_statusID   = $_POST['ra_statusID'];

//         //Update the database record with the text
//         global $wpdb;

// 		$wpdb->insert(
// 			// Table name
// 			'wpcv_rapidStatus',

// 			// Data
// 			array( 
// 					'ra_resourceID'   => $ra_resourceID,					
// 					'ra_statusID'     => $ra_statusID,
// 					'ra_status'       => 'OFF DUTY'					
// 			)
// 		);	

// 	die();
// }
// add_action( 'wp_ajax_insert_new_row', 'insert_new_row' );
// add_action( 'wp_ajax_nopriv_insert_new_row', 'insert_new_row' );
