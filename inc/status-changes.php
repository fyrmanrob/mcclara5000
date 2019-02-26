<?php


/*************************************
//   Prevents Malicious Attacks
**************************************/
	if ( ! defined ( 'ABSPATH' ) ) {
		exit;
	}


/***********************************
//   UPDATE STATUS CHANGES IN DB 
************************************/
function update_status_change( $statusRequested, $clickedStatusID ){
			
	global $wpdb;

		$wpdb->update(

			// table
			'wpcv_rapidStatus',

			// data 
			array( 'ra_status' => $statusRequested ), 

			// where
			array( 	'ra_statusID' => $clickedStatusID ) 
		);	

	die();
}
add_action( 'wp_ajax_update_status_change', 'update_status_change' );
add_action( 'wp_ajax_nopriv_update_status_change', 'update_status_change' );


/********************************
//   VALIDATE STATUS CHANGES
*********************************/
function validate_status_change() {

		$clickedStatusID = $_POST['clickedStatusID'];
		$statusRequested = $_POST['statusRequested'];

	// Get the current status of the resource
		global $wpdb;
			
			// Prepare sanitizes user input
			$sql = $wpdb->prepare( "SELECT ra_status FROM wpcv_rapidStatus WHERE ra_statusID = %s", $clickedStatusID );

			$currentStatus = (string)$wpdb->get_var( $sql );

		// Check the validity of the request
			if ( $currentStatus == 'AVAILABLE' ) {

					switch ( $statusRequested ) {
						case 'ENROUTE':
						case 'STAGING':
						case 'OFF DUTY':
						case 'OOS':
							update_status_change( $statusRequested, $clickedStatusID );
						break;
				
						default:
							echo ( 'Invalid' );
							echo ( $currentStatus );
						break;
					}
			}

			if ( $currentStatus == 'ENROUTE' ) {
				switch ( $statusRequested ) {
					case 'ON SCENE':
					case 'AVAILABLE':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'ON SCENE' ) {
				switch ( $statusRequested ) {
					case 'TRANSPORTING':
					case 'AVAILABLE':
					case 'OOS':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}
			
			if ( $currentStatus == 'TRANSPORTING' ) {
				switch ( $statusRequested ) {
					case 'AT HOSPITAL':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'AT HOSPITAL' ) {
				switch ( $statusRequested ) {
					case 'RETURNING':
					case 'AVAILABLE':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'RETURNING' ) {
				switch ( $statusRequested ) {
					case 'AVAILABLE':
					case 'OOS':
					case 'OFF DUTY':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'STAGING' ) {
				switch ( $statusRequested ) {
					case 'AVAILABLE':
					case 'OFF DUTY':
					case 'OOS':

						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'OOS' ) {
				switch ( $statusRequested ) {
					case 'AVAILABLE':
					case 'OFF DUTY':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}

			if ( $currentStatus == 'OFF DUTY' ) {
				switch ( $statusRequested ) {
					case 'AVAILABLE':
					case 'STAGING':
						update_status_change( $statusRequested, $clickedStatusID );
					break;
				
					default:
						echo ( 'Invalid' );
						echo ( $currentStatus );
					break;
				}
			}       

         die();
}
add_action( 'wp_ajax_validate_status_change', 'validate_status_change' );
add_action( 'wp_ajax_nopriv_validate_status_change', 'validate_status_change' );