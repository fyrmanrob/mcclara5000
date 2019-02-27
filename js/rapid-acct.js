jQuery(document).ready (function($) {

//   +++++++++++++++++++++++++++++++++++++++
//           RAPID ACCOUNTABILITY 
//   +++++++++++++++++++++++++++++++++++++++


var apparatusStatus = ["AVAILABLE", "ENROUTE", "ON SCENE", "TRANSPORTING", "AT HOSPITAL", "RETURNING", "OFF DUTY", "STAGING", "OOS"];
var colNum = 0;  
var colRowCnt = 0;

/**********************************************  
// RAPID ACCT - ADD COLUMN
***********************************************/ 
  $( '#addColumn' ).on('click', function() {
      
        // Increase column number 
        var colNum = $( 'div[id^="colNum"]' ).length;
        //console.log( colNum );

        // Create new Div with column ID number 
        var newColDiv = document.createElement( 'div' );
        newColDiv.id = "colNum" + colNum;
        newColDiv.className = "ra-column-container";
        //newColDiv.className = "draggable ui-widget-content";
    
      // Establish starting Select ID number
        var newSelIDNum = (colNum * 2) * 10;
        //console.log( "newSelIDNum after math = " + newSelIDNum );
      
        // Build HTML - Use colStartingSel ID for select ID
      newColDiv.innerHTML =
        '<div><input type="text" id="listTitle' + colNum + '" class="listTitle longInput" placeholder="Title"></div>' +
        '<ul id="listCol' + colNum + '" class="sortable">' +
        '<li id="li' + newSelIDNum + '" class="listItem"><span class="dashicons dashicons-leftright vertArrows"></span><input type="text" id="ra_resource' + newSelIDNum + '" class="ui-state-default ra_input" placeholder="Resource Name"><a href="#"><span class="dashicons dashicons-welcome-write-blog"></span></a><select id="ra_status' + newSelIDNum + '" class="black ra_select"></select><a href=""><span class="dashicons dashicons-undo"></span></a></li></ul>' +
        '<button class="ra_add-del_btn" id="addRow' + colNum + '">+</button><button class="ra_add-del_btn" id="delRow'+ colNum +'"">-</button>' +
      '<span id="msgBox' + colNum + '"></span>' +
        '<span class="dashicons dashicons-admin-generic settingsButton"></span>';

      // Insert new Div into document
        document.getElementById( 'allColumnsContent' ).appendChild( newColDiv );
    
        // Adds options to the new Select box
        //console.log( "newSelIDNum sent to addStatusOptions Func = " + newSelIDNum );
        addStatusOptions( newSelIDNum );
        
        // Call function to hide the Del Row button
        hideDel( colNum );

        // ******* Save New Row in Database ******

  }); // #addColumn

/**********************************************
// RAPID ACCT - ADD ROW
***********************************************/
$( "#allColumnsContent" ).on( 'click', 'button[id^="addRow"]', function() {

    // User-Defined Preference - actual max number of rows desired per column
      var maxRowsAllowed = 10;

    // Adjust number due to zero-based index
        maxRowsAllowed = maxRowsAllowed - 1;    
      
    // Get the <ul> ID of the column clicked
      var listCol = "#" + $( this ).siblings( 'ul' ).attr('id');
      //console.log( "listCol = " + listCol);
     
    // Get the colNum of the column clicked
      var colNum = parseInt( listCol.slice(8) );
      //console.log( 'colNum = ' + colNum );
    
    // Get the first <select> ID (lowest ID number)
      var firstSelectID = $( listCol + ' li:first-child select' ).attr('id');
      //console.log( "firstSelectID = " + firstSelectID );
     
      var firstSelectNum = parseInt( firstSelectID.slice(9) );  // used to be parseInt
      //console.log( "firstSelectNum = " + firstSelectNum );
      //console.log( "typeof firstSelectNum = " + typeof firstSelectNum );
     
    // Get the last <select> ID
      var lastSelectID = $( listCol + ' li:last-child select' ).attr('id');
      //console.log( "lastSelectID before Add row = " + lastSelectID );

    // Find the number of rows in the column by counting the number of select elements   
      colRowCnt = $( listCol +' select' ).length;
      //console.log( "colRowCnt at start of Logic = " + colRowCnt );
      //console.log( "typeof colRowCnt = " + typeof colRowCnt );

    // Create new selID number to use for the new row ID
      var newSelIDNum = firstSelectNum + colRowCnt;
      //console.log( "(Add Row Func) newSelIDNum = " + newSelIDNum );
      //console.log( "typeof newSelIDNum upon declare = " + typeof newSelIDNum);

    // Run Logic to see if permitted to add another row  
          if ( colRowCnt < maxRowsAllowed ) {   

                //  Add Row
                    $( listCol ).append( '<li id="li' + newSelIDNum + '" class="listItem"><span class="dashicons dashicons-leftright vertArrows"></span><input type="text" id="ra_resource' + newSelIDNum + '" class="ui-state-default ra_input" placeholder="Resource Name"><a href="#"><span class="dashicons dashicons-welcome-write-blog"></span></a><select data-role="none" id="ra_status' + newSelIDNum + '" class="black ra_select"></select><a href="#"><span class="dashicons dashicons-undo"></span></a></li></div>' ); 
                
                //  Adds options to the new Select box 
                    addStatusOptions( newSelIDNum );  // Sends as a Number...but will need to be appended as a string
              
                //  Show/Hide Add/Del Row Buttons
                    $( '#addRow' + colNum ).css( 'visibility', 'visible' );
                    $( '#delRow' + colNum ).css( 'visibility', 'visible' ); 

            } else {

                //  Add Row
                $( listCol ).append( '<li id="li' + newSelIDNum + '" class="listItem"><span class="dashicons dashicons-leftright vertArrows"></span><input type="text" id="ra_resource' + newSelIDNum + '" class="ui-state-default ra_input" placeholder="Resource Name"><a href="#"><span class="dashicons dashicons-welcome-write-blog"></span></a><select data-role="none" id="ra_status' + newSelIDNum + '" class="black ra_select"></select><a href="#"><span class="dashicons dashicons-undo"></span></a></li></div>' );               
              
               //  Adds options to the new Select box 
                    addStatusOptions( newSelIDNum );
            
              //  Hide Add Button (Max rows reached) & Display Message
                  $( "#addRow" + colNum ).css( 'visibility', 'hidden' );
                  $( "#delRow" + colNum ).css( 'visibility', 'visible' );   

              // Display Message Max Rows reached         
                  displayMessage( colNum, 'Maximum of ' + (maxRowsAllowed + 1) + ' rows allowed.' );            
         
          }
              //******* Insert New Row into Database ******
        
                 //  var ra_resourceID = '#ra_resourceID' + newSelIDNum;
                 //  var ra_statusID = '#ra_statusID' + newSelIDNum;

                 //  $.ajax({
                 //        type: 'POST',
                 //        dataType: 'text',
                 //        url: my_ajax_object.ajaxurl,
                 //        data: {
                 //            ra_resourceID: ra_resourceID,
                 //            ra_statusID: ra_statusID,
                 //            action: 'insert_new_row'
                 //        },
                 //        success: function ( response ) {

                 //            console.log( 'Updated successfully.');

                 //        },
                 //        error: function ( error ) {

                 //        }

                 // }); // ajax 

}); // #Rapid Status - add Row


/**************************************************
// RAPID ACCT - ADD OPTIONS TO EACH SELECT BOX
***************************************************/  
  
  function addStatusOptions( selIDNUM ) {

      var selIDNUM = selIDNUM.toString();
      //console.log( 'selIDNUM inside function: ' + selIDNUM );
      //console.log( "selIDNUM typeof inside function: " + typeof selIDNUM );

      // Loop - Append Status Option to an individual select box 
        $.each( apparatusStatus, function( i ){
            
            var opt = document.createElement('option');
            
            opt.innerHTML = apparatusStatus[i];
            opt.value = apparatusStatus[i];
          
          // Append the status options to each status select box
          $( '#ra_status' + selIDNUM ).append(opt);
          }); // $.each apparatusStatus
    
      // Sets default option to Off Duty 
      $( '#ra_status' + selIDNUM ).val( 'OFF DUTY' );

  } // addStatusOptions
  
/**********************************************
// RAPID ACCT - DEL ROW    
***********************************************/
  $( "#allColumnsContent" ).on( 'click', 'button[id^="delRow"]', function() { 
  
      // Get the <ul> ID of the column clicked
        var listCol = "#" + $( this ).siblings( 'ul' ).attr( 'id' );
          //console.log("listCol = " + listCol);  

      // Count the number of rows in the column
        var numRows = $( listCol + ' li' ).length;  
          //alert( 'There are ' + numRows + ' rows');

      // Get the ID of the last <li> element
        var lastLi_ID = "#" + $( listCol + ' li:last-child' ).attr( 'id' );
          //console.log( 'lastLi_ID = ' + lastLi_ID );

      // Get the colNum of the clicked Del button 
        var delColNum = parseInt( listCol.slice(8) );
          //console.log( 'delColNum after splice(8): ' + delColNum );

        if ( confirmDelRow() ){

              // Delete Row Logic
                // If more than 2 rows- delete row
            if ( numRows > 2 ) {

              // Confirm Delete Row Action

              //delete the row
              $( listCol + ' ' + lastLi_ID  ).remove();

              // Show the Add Button
              $( '#addRow' + delColNum ).css( 'visibility','visible' )

            } else {

                  // Delete row #2
                  $( listCol + ' ' + lastLi_ID  ).remove();

                  // Hide the proper Del button; Get ID of Del Row button
                  var listColDel_btn = "#" + $( this ).attr('id');
                  $( listColDel_btn ).css( 'visibility','hidden' );

                  // Display message in proper column list
                  displayMessage( delColNum, 'Last row cannot be deleted.' );
            } 
        }
   }); // #allColumnsContent - Del Row


/**********************************************
// RAPID ACCT - Confirm Delete Row
**********************************************/
function confirmDelRow() {
    var confirmed = confirm("Are you sure you want to delete the row?");
    return confirmed;
}


/**********************************************
// RAPID ACCT- Hides the Del button
**********************************************/  
function hideDel( colNum ) {

    var test = $( "#delRow" + colNum ).css( 'visibility','hidden' );

} 
                                                  
/********************************************** 
// RAPID ACCT - Display Message Function 
**********************************************/
  function displayMessage( colNum, message ) {
      $( '#msgBox' + colNum ).hide().fadeIn(500).delay(700).fadeOut(500).text( message );
      return false;
  } 

/*********************************************** 
// FUNCTION - COLOR CODING FOR SELECT OPTIONS
************************************************/
function statusColorCoding( selectBoxID ) {
    
    var newStatus = $( selectBoxID ).val();
    //console.log( "newStatus = " + newStatus );
 
    // Remove color prior to change
    $( selectBoxID ).removeClass('green yellow red black blue');
  
    // Add new color based on new select value  
  if ( newStatus === "AVAILABLE" ) {

      $( selectBoxID ).addClass('green');

  } else {  

      if ( newStatus === "RETURNING" || newStatus === "STAGING") {

       $( selectBoxID ).addClass('yellow');

      } else { 

          if ( newStatus === "OFF DUTY" || newStatus === "OOS") {

            $( selectBoxID ).addClass('black');

          } else {

              if ( newStatus === "AT HOSPITAL" ) {

                $( selectBoxID ).addClass('blue');

              } else {

                  $( selectBoxID ).addClass('red');
             }
    }}}
}

/*********************************************** 
// ON CHANGE - COLOR CODING FOR SELECT OPTIONS
************************************************/
$( document.body ).on('change', '.listItem', function() {

    var selectBoxID = '#' + $( this ).find('select').attr('id');
    statusColorCoding( selectBoxID );

});


/**********************************************
// LISTENTER - FOR RAPID ACCT TITLE CHANGES
***********************************************/ 
$( document ).on('change', '[id^="listTitle"]', function() {

      // Get the ID of the updated input box
          var updatedTitleID = '#' + $( this ).attr( 'id' );
          //console.log( updatedTitleID );
      // Store the updated information
          var updatedTitleText = $( this ).val();
          //console.log( updatedTitleText );
      // Update record in database
          $.ajax({
                type: 'POST',
                dataType: 'text',
                url: my_ajax_object.ajaxurl,
                data: {
                    updatedTitleID: updatedTitleID,
                    updatedTitleText: updatedTitleText,
                    action: 'update_listTitle_text'
                },
                success: function ( response ) {

                    console.log( 'Updated successfully.');

                 // Remove focus so JS will work properly
                    $( updatedTitleID ).trigger('blur');
                },
                error: function ( error ) {

                }
          });
});


/**********************************************
// LISTENTER - FOR RAPID ACCT INPUT CHANGES
***********************************************/ 

$( document ).on('change', '[id^="ra_resource"]', function() {

      // Get the ID of the updated input box
          var updatedInpID = '#' + $( this ).attr( 'id' );
          //console.log( updatedInpID );
      // Store the updated information in variable
          var updatedResourceName = $( this ).val();

      // Update record in database
          $.ajax({
                type: 'POST',
                dataType: 'text',
                url: my_ajax_object.ajaxurl,
                data: {
                    updatedInpID: updatedInpID,
                    updatedResourceName: updatedResourceName,
                    action: 'update_input_text'
                },
                success: function ( response ) {

                    console.log( 'Updated successfully.');

                 // Remove focus so JS will work properly
                    $( updatedInpID ).trigger('blur');
                },
                error: function ( error ) {

                }
          });
});


/**********************************************
// LISTENTER - FOR RAPID ACCT STATUS REQUESTS
***********************************************/ 

$( document ).on('change', '[id^="ra_status"]', function() {

      // Get ColNum of clicked select box (for message box display only)
          var colNum = parseInt( $( this ).parent().parent().parent().attr( 'id' ).slice(6) );
            //console.log( 'colNum: ' ); console.log( colNum );
      // Get the ID of the clicked select box
          var clickedStatusID = '#' + $( this ).attr( 'id' );  
            //console.log( 'clickedStatusID: ' ); console.log( clickedStatusID );
      // Get the requested Status change
          var statusRequested = $( this ).val();
            //console.log( 'statusRequested: ' ); console.log( statusRequested );
      // Get the current status from the database.
          $.ajax({
                type: 'POST',
                dataType: 'text',
                url: my_ajax_object.ajaxurl,
                data: {
                    clickedStatusID: clickedStatusID,
                    statusRequested: statusRequested,
                    action: 'validate_status_change'
                },
                success: function ( response ) {

                    // If response has Invalid in it, then change the requested status back to the previous status
                    var prevStatus = response.slice(7);                    
                      //console.log( 'prevStatus: ' ); console.log( prevStatus );
                    if ( !response ) {

                         console.log( 'Status updated successfully.' );

                    } else {

                        // Add error msg styling to message box
                        $( '#msgBox' + colNum ).addClass('invalidStatusMsgBox');
                        console.log( 'Invalid status change.' );

                        $( clickedStatusID ).val( prevStatus );

                        statusColorCoding( clickedStatusID ); // Re-color code status box                    

                        // Disply error message
                        displayMessage( colNum, 'Invalid status change.' );

                    }
                      // Remove focus so JS will work properly
                        $( clickedStatusID ).trigger('blur');

                },
                error: function ( error ) {
                      alert( 'Error: ' + error );
                }
          }); // ajax call
}); // on change

/****************************************************
// FUNCTION - FOR RAPID ACCT STATUS CHANGE REQUESTS
!!! Must remain a function so that other pages can use it !!!
*****************************************************/ 
// function requestedStatusCheck( clickedStatusID, statusRequested ) {

// console.log( 'clickedStatusID in requestedStatusCheck func: ' + clickedStatusID );
// console.log( 'currentStatus in database: ' + currentStatus );
// console.log( 'statusRequested in requestedStatusCheck func: ' + statusRequested );

//           // Check the validity of the request
//             if ( currentStatus == 'AVAILABLE' && statusRequested == 'ENROUTE' ) {

//                // Update status in database                

//             }

//             else if ( currentStatus == 'ENROUTE' && statusRequested == 'ON SCENE' ){

//                 // Update status in database
                

//                 // Remove focus so JS will work properly
//                 $( clickedStatusID ).trigger('blur');

//             }

//             else {
//                 console.log( 'Invalid Status');
//                 $( clickedStatusID ).trigger('blur');

//             }            

// } // function



/**********************************************
 // Functions to Run onLoad 
**********************************************/ 
  
window.onload = addStatusOptions( 0 ), hideDel( 0 );

/****************************************************************  
// RAPID ACCOUNTABILITY AUTO-POPULATE RESOURCES WITHIN DATABASE
*****************************************************************/ 
  // $.ajax({
  //    type: 'GET',
  //    dataType: 'json',
  //    url: my_ajax_object.ajaxurl,
  //    data: {
  //        action: 'get_rapidStatus_resources'
  //    },
  //    success: function ( data ) {

  //      // Loop through individual resource establish vars for data
  //        $.each( data, function( key, resource ) {

  //            var resourceID   = resource.ra_resourceID;
  //            var resourceName = resource.ra_resourceName;
  //            var statusID     = resource.ra_statusID;
  //            var status       = resource.ra_status;

  //        //  // Establish which column the resource belongs in
  //        //    // Slice off the colNum from the ra_resourceID to get proper ColNum
  //            var resIDNum = parseInt( resourceID.slice(12) );
  //            console.log( 'resIDNum = ' + resIDNum );

  //            var belongsColNum = Math.floor( resIDNum/20 );
  //            console.log( 'belongsColNum: ' + belongsColNum );

  //            var colToCheck = '#colNum' + belongsColNum;

  //            while ( $( colToCheck ).length == 0 ) {

  //              // trigger Add Col
  //              $( '#addColumn' ).trigger( 'click' );

  //            }
              
  //            for ( i=0; i<20; i++ ) {

  //              if ( $( resourceID ).length === 0 ) {

  //                // trigger col-specific Add Row
  //                $( '#addRow' + belongsColNum ).trigger( 'click' );

  //              } 
  //            }
            
  //          // Insert resource
  //            $( resourceID ).val( resourceName );
  //            //console.log( 'resourceID: ' + resourceID );
  //            //console.log( 'resourceName: ' + resourceName );

  //          // Insert status
  //            $( statusID ).val( status );

  //          // Update Status Color Coding
  //            statusColorCoding( statusID );

  //        }); // .each 

  //    },
  //    error: function ( error ) {
  //        alert ( 'AJAX experienced an error. No data loaded.' );
  //    }

  // });


/*************************************************  
// RAPID ACCOUNTABILITY AUTO-POPULATE LIST TITLES
**************************************************/ 
$.ajax({
      type: 'GET',
      dataType: 'json',
      url: my_ajax_object.ajaxurl,
      data: {
          action: 'get_rapidStatus_listTitles'
      },
      success: function ( data ) {

        $.each( data, function( key, resource ) {

          // Loop through individual resource establish vars for data
            var listTitleID   = resource.ra_listTitleID;
            var listTitleText = resource.ra_listTitleText;

          // Establish which column the resource belongs in
            // Slice off the colNum from the resourceID to get proper ColNum
            var listIDNum      = parseInt( listTitleID.slice(12) );
            //console.log( 'resIDNum = ' + resIDNum );

            var belongsColNum = Math.floor( listIDNum/20 );
            //console.log( 'belongsColNum: ' + belongsColNum );

            var colToCheck = '#colNum' + belongsColNum;

          // Insert resource
            $( listTitleID ).val( listTitleText );
            //console.log( 'resourceID: ' + resourceID );

        }); // .each
      },
      error: function ( error ) {
          alert ( 'AJAX experienced an error. No data loaded.' );
      }
  });


/*********************************************** 
// FUNCTION - COLOR CODING FOR SELECT OPTIONS
//
// This is the exact same function as in app.js.
// This js file cant reference this function in the other js file.
//
************************************************/
function statusColorCoding( selectBoxID ) {
    
    var newStatus = $( selectBoxID ).val();
    //console.log( "newStatus = " + newStatus );
 
    // Remove color prior to change
    $( selectBoxID ).removeClass('green yellow red black blue');
  
    // Add new color based on new select value  
  if ( newStatus === "AVAILABLE" ) {

      $( selectBoxID ).addClass('green');

  } else {  

      if ( newStatus === "RETURNING" || newStatus === "STAGING") {

       $( selectBoxID ).addClass('yellow');

      } else { 

          if ( newStatus === "OFF DUTY" || newStatus === "OOS") {

            $( selectBoxID ).addClass('black');

          } else {

              if ( newStatus === "AT HOSPITAL" ) {

                $( selectBoxID ).addClass('blue');

              } else {

                  $( selectBoxID ).addClass('red');
             }
    }}}
}

}); // document ready







