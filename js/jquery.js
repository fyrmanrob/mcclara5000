jQuery(document).ready (function($) {

//   +++++++++++++++++++++++++++++++++++++++
//           JQUERY
//   +++++++++++++++++++++++++++++++++++++++


/**********************************************
// jQuery UI Sortable function
**********************************************/ 

    $( document ).ready( function() {
      $( '.sortable' ).sortable({
           placeholder: "ui-state-highlight"
       });
    });  


/**********************************************
// jQuery UI Draggable function
**********************************************/ 

    $( document.body ).on('click', '.draggable', function() {
           $( '.draggable' ).draggable();
    });
  
/**********************************************
// Touch Punch
**********************************************/ 


}); // document ready







