jQuery(document).ready (function($) {

//   +++++++++++++++++++++++++++++++++++++++
//           RAPID TRACKING
//   +++++++++++++++++++++++++++++++++++++++


/**********************************************
//  TRACKING - JSON ARRAY - Use until DB is set up
**********************************************/   
var allResourcesStr =  '{"activeResource" : [' +
  '{"name":"Engine 1", "incidentNum":"101", "dispatched":"12:01"},' +
  '{"name":"Engine 2", "incidentNum":"102", "dispatched":"12:02"},' +
    '{"name":"Engine 3", "incidentNum":"103", "dispatched":"12:03"},' +
    '{"name":"Engine 4", "incidentNum":"104", "dispatched":"12:04"},' +
    '{"name":"Engine 5", "incidentNum":"105", "dispatched":"12:05"} ]}';

var trackedResource = JSON.parse(allResourcesStr);

  
/**********************************************
// TRACKING - POPULATE LIST
**********************************************/ 

$('#set').collapsibleset().trigger('create'); 

var resourceListHtml = "";  

  $.each( trackedResource, function() {
   $.each( this, function(k, v) {
       
        var resourceName = trackedResource.activeResource[k].name;
        var iNum = trackedResource.activeResource[k].incidentNum;
        var dispatchedTime = trackedResource.activeResource[k].dispatched;      
        
        resourceListHtml = resourceListHtml + '<div data-role="collapsible" data-collapsed="true" data-collapsed-icon="carat-d" data-expanded-icon="carat-u" data-inset="true" class="ui-btn ui-shadow ui-corners-all">' +
            '<h1>' + resourceName + '</h1>' +
            '<div class="ui-grid-b my-breakpoint">' + 
                '<div class="ui-block-a">' +
                '<ul data-role="listview">' +
                  '<li><a href="#" id="info'+ [k] +'" class="info-btn ui-btn ui-btn-icon-left ui-icon-info ui-btn-icon-notext ui-btn-inline"></a>' + 
                    '<label for="dispatched">Dispatched:</label>' + 
                      '<input type="text" data-enhanced="true" name="dispatched" value="'+ dispatchedTime +'" disabled="disabled" class="shortInput"></li>' +
                  '<li><button class="ui-btn ui-corners-all ui-shadow">Enroute</button></li>' +
                    '<li><button class="ui-btn ui-corners-all ui-shadow">On Scene</button></li>' +
            '</ul></div>' +  
            '<div class="ui-block-b">' +
                '<ul data-role="listview" class="removeGap">' +
                   '<li><button class="ui-btn ui-corners-all ui-shadow">Transporting</button></li>' +
                     '<li><button class="ui-btn ui-corners-all ui-shadow">At Hospital</button></li>' +
                   '<li><button class="ui-btn ui-corners-all ui-shadow">Returning</button></li>' +
                '</ul></div>' +     
            '<div class="ui-block-c">' +
                '<ul data-role="listview" class="removeGap">' +
                   '<li><select id="rt-select' + [k] + '" data-native-menu="false">' + 
                       '<option>Choose Disposition...</option>' + 
                       '<option value="disregarded">Disregarded</option>' +
                         '<option value="transported">Transported</option>' +
                         '<option value="sor">SOR</option>' +
                         '<option value="unfound">Unfound</option></select></li>' +
                '<li><button class="ui-btn ui-corners-all ui-shadow">Available</button></li>' +   
              '</ul></div>' +        
                  '</div>' +
            '</div></div>';
    }); // this .each loop

    $( '#set' ).append( resourceListHtml ).collapsibleset('refresh');
  }); // trackedResource .each loop
  

/**********************************************
// TRACKING - INFO BUTTON
**********************************************/ 
  $( '[id^="info"]' ).on('click', function() {

    var clickedInfoBtn = $( this ).attr('id');
    alert( 'When this Info icon is clicked, it will display the incident number, call type, location, location notes, and the run string' );

  }); // [id^="info"]


}); // document ready







