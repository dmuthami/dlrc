/**
 * popup.js
 * @author Samuel Mukua
 * Created on 2013-11-
 *
 * Modified by:David Muthami
 * Modified on 2013-11-22
 */

//Define global variables
var operationalLayer, get = [];
//an array storing current layer ids for the operational layer map service
var currentLayersArray = [];

/**
 * Function checks if the operatiional layer dynamic service is existing
 */
function create() {
	//Define operational layer
	operationalLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer");
	//Check if layer is loade
	if (operationalLayer.loaded) {
		//build layer list from operational layer for SEARCH functionality
		//build layer list for the SELECT functionality
		loadControls();
	} else {
		//else wire the event handler buildLayerList to the map's onload event
		dojo.connect(operationalLayer, "onLoad", loadControls);
	}
}

/**
 *	Load the check box and
 *  the radio buttons
 */
function loadControls() {
	//build layer list for search functionality
	buildLayerList(operationalLayer);
	//build layer list for checkbox function
	buildSelectLayerList(operationalLayer);
	buildSearchbyattrib(operationalLayer);
}

/**
 * Builds a list of operational layers from the Malawi operational layer
 * Called by create function
 *
 */
function buildLayerList(operationalLayer) {
	//create an array
	var infos = operationalLayer.layerInfos, info;
	//create array for the list
	var items = [];
	//loop through and creaste an array of radio buttons
	for (var i = 0, il = infos.length; i < il; i++) {
		info = infos[i];
		items[i] = "<input type='radio' name='list_item''" + "' id='" + info.id + "' onclick='processServiceInfo(this.id);' /><label for='" + info.id + "'>" + info.name + "</label><br/>";
		//console.log(i);
	}
	//Add the radio buttons to the div element in the search tab in the accordion
	dojo.byId("layer_list").innerHTML = items.join(' ');
}

/**
 * Build layer list for the Select functionality
 * Adds check boxes to the Select box
 */
function buildSelectLayerList(operationalLayer) {
	if ( typeof operationalLayer === 'undefined') {
		// variable is undefined. create object
		operationalLayer = new esri.layers.ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer");
	}

	//create an array
	var infos = operationalLayer.layerInfos, info;
	//create array for the list
	var items = [];
	//loop through and creaste an array of radio buttons
	for (var i = 0, il = infos.length; i < il; i++) {
		info = infos[i];
		//bind to the on change event
		items[i] = "<input type='checkbox' class='list_item' checked='" + (info.defaultVisibility ? "checked" : "") + "' id='" + info.id + "' onclick='updateSelectedLayers();' /><label for='" + info.id + "'>" + info.name + "</label>" + "</br>";
		//Populate array with layer id's for checked layers only
		currentLayersArray.push(info.id);	
	}
	//Add the radio buttons to the div element in the search tab in the accordion
	dojo.byId("idAccordionSelect").innerHTML = items.join(' ');
}
function buildSearchbyattrib(operationalLayer) {
    //create an array
    var infos = operationalLayer.layerInfos, info;
    //create array for the list
    var items = [];
    //loop through and creaste an array of radio buttons
    for (var i = 0, il = infos.length; i < il; i++) {
        info = infos[i];
        items[i] = "<input type='radio' name='created_list''" + "' id='" + info.id + "' onclick='processselectby(this.id);' /><label for='" + info.id + "'>" + info.name + "</label><br/>";
        //console.log(i);
    }
    //Add the radio buttons to the div element in the search tab in the accordion
    dojo.byId("sel_list").innerHTML = items.join(' ');
}


/**
 * Function sets the layer to be searched when user clicks the search button after
 * typing text
 * @param {Object} sel
 */

var selectedLayerId;
function processServiceInfo(sel) {
    //Sets the layer to search in the paremeters object for searching
       
        //set res variable to assume the value id value of selected layer
       // res = sel;
    selectedLayerId = sel;
   // dojo.query(".list_item");
}


function processselectby(attrib) {
    //set res variable to assume the value id value of selected layer
    resultattrib =attrib;
    //not sure what the cod
    //dojo.query(".created_list");
    findbyattrib.layerIds = [resultattrib];
    display();
}
function loadfield(fieldattrib) {
    result = fieldattrib;
   a= findbyattrib.searchFields = [result];
   $("#sle-appr").dialog("close");
   disp();
}
/**
 * Function sets the layer to be searched when user clicks the search button after
 * typing text
 * @param {Object} sel
 */
//function processServiceInfo(sel) {
//	//Sets the layer to search in the paremeters object for searching
//	findParams.layerIds = [sel];
//	//set res variable to assume the value id value of selected layer
//	res = sel;
//	//not sure what the code below does
//	dojo.query(".list_item");
//	//alert(res);
//}

/**
 *  
 * Function is an event handler for checkbox click event
 * Updates the array showing currently selected layers 
 * @param {Object} 
 */
function setval(sel) {
   
}

function updateSelectedLayers() {
	//Get inputs
	var inputs = dojo.query(".list_item"), input;
	//initialize current layers array
	currentLayersArray = [];
	//loop through inputs
	for (var i = 0, il = inputs.length; i < il; i++) {
		//if check box is checked
		if (inputs[i].checked) {
			//Add to current layers
			currentLayersArray.push(inputs[i].id);		
			//console.log("Llayer ID: " +inputs[i].id);
		}
	}
	//layer.setVisibleLayers(visible);
}

/**
 *Call create function when dojo is ready
 */
dojo.ready(create);