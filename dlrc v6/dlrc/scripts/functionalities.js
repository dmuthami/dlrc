/**
 *Functionality.js 
 *  @author Samuel Mukua
 * Created on 2013-11-11
 * 
 * Modified by:David Muthami
 * Modified on 2013-11-19
 */

/**
 * zoomin function
 * event handler for zoom in image
 */
function zoomIn_onclick() {
    navToolbar.activate(esri.toolbars.Navigation.ZOOM_IN);
    map.enableScrollWheelZoom();
  
}

/**
 * Zoom last function
 * event handler for zoom last image 
 */
function Zoomlast_onclick() {
    navToolbar.zoomToPrevExtent();
    map.enableScrollWheelZoom();
}

/**
 * Zoom out function
 * event handler for zoom out image 
 */
function ZoomOut_onclick() {
    navToolbar.activate(esri.toolbars.Navigation.ZOOM_OUT);
    map.enableScrollWheelZoom();   
}

/**
 * Disables map navigation capabilities
 * 
 */
function deactive_onclick() {
    navToolbar.deactivate();
    map.disableRubberBandZoom();
    map.disablePan();
    map.disableScrollWheelZoom();
}

/**
 * Pan function
 * event handler for pan image 
 */
function pan_onclick() {
    navToolbar.activate(esri.toolbars.Navigation.PAN);
    map.hidePanArrows();
    map.openHandCursorVisible = true;
}

/**
 * Zoom to full extent function
 * event handler for full extent image 
 */
function full_onclick() {
	//specify spatial extent
    var startExtent = new esri.geometry.Extent({
        "xmin": 3653078.4558041804, // 3653078.4558041804		3504179.125
        "ymin": -1945780.9920269293, // -1945780.9920269293		-1859254.276
        "xmax": 4045659.0330767394, // 4045659.0330767394		4187531.906
        "ymax": -969833.0148820624, // -969833.0148820624		-971361.755
        "spatialReference": {
            "wkid": 102100
        }
    });
  	//Set map extent
    map.setExtent(startExtent);
}

/**
 * Enable identify capability on map 
 */
function identify_onclick() {
    tooglePopup();
}

/**
 * Clears all graphics on the map 
 */
function clear_onclick() {
    map.graphics.clear();
    clearselection();
    cleartxt();
    cleardg();
}

/**
 * Search functionality function
 * Calls dofind function in query.js
 */
function get_onclick() {
    //Call search function
    setval();
    doFind();
    //Show results on grid. This function is in index.html
    
}
/**
 * Select Event that toggles off or on the select event
 * This is in select.js file
 */
function select_onclick(){
	//Call to toogle 
	toogleSelect();
}
function takeback() {
    var startExtent = new esri.geometry.Extent({
        "xmin": 3653078.4558041804, // 3653078.4558041804		3504179.125
        "ymin": -1945780.9920269293, // -1945780.9920269293		-1859254.276
        "xmax": 4045659.0330767394, // 4045659.0330767394		4187531.906
        "ymax": -969833.0148820624, // -969833.0148820624		-971361.755
        "spatialReference": {
            "wkid": 102100
        }
    }); map.setExtent(startExtent);
}
function serattrib_onclick() {
    $("#attribser").dialog("close");
    //Call search function
    attribFind();
    //Show results on grid. This function is in index.html
    
}
function help_onclick() {
window.open(href='argislib/System%20Walkthrough%20Feedback.pdf');
}
function refresh_onclick() {
    Ext.MessageBox.confirm('Confirm', 'Do you really want to refresh the page?', function (btn) {
        if (btn === 'yes') {
            location.reload(true);
        }
                else {
                 //some code
                }
    });
}

