jQuery(document).ready (function($) {

//   +++++++++++++++++++++++++++++++++++++++
//           CALL ENTRY
//   +++++++++++++++++++++++++++++++++++++++


/**********************************************
//  TRIAGE COLORS
**********************************************/  
  
    $( '#ceTriage' ).change( function() {
      
      var triageColor = $( this ).val();
        console.log( 'triageColor in jQuery:' + triageColor );
      
        this.className = "";
        
            if ( triageColor === 'red' ){
              $( this ).addClass( 'triageRed' );
            }
        
          else if ( triageColor === 'yellow' )  {
            $( this ).addClass( 'triageYellow' );
          }

        else {
           $( this ).addClass( 'triageGreen' );
        }
  }); // #ceTriage


}); // document ready







