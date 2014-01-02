/**
* popup.js
* @author Samuel Mukua
* Created on 2013-11-11
*
* Modified by:David Muthami
* Modified on 2013-11-19
*/
//Define global variables
var findTask, findParams;
var center, zoom;
var grid, store;

/**
* init function
* define query parameters, servive endpoints and creates query tasks
*/
function init() {
    dojo.connect(grid, "onRowClick", onRowClickHandler);
    //Create Find Task using the URL of the map service to search
    dojo.connect(map, "onLoad");
    findTask = new esri.tasks.FindTask("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer");
    //Define the find parameters
    findParams = new esri.tasks.FindParameters();
    findParams.returnGeometry = true;
    /*
    * The below parameters has been greyed out
    * 
    * //findParams.layerIds =[2];
    * 
    * It is defined in the function processServiceInfo(sel) found in querysel function
    */

    //Define search fields on the so defined layer
    findParams.searchFields = ["scheme", "OBJECTID"];
    //define srid to be that of the 
    findParams.outSpatialReference = map.spatialReference;
    //Write to the console
    //console.log("find sr: ", findParams.outSpatialReference);
    //for details on setting up a proxy page.
    esri.config.defaults.io.proxyUrl = "/proxy";
    esri.config.defaults.io.alwaysUseProxy = false;

    //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
    esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");
    //Initialize measure functionality
    measure(map);

}

/**
* dofind function
* Conducts a synchronous queryusing parameters defind in the init() function and uses call
* 	back function named showResults to display results
*
*/
function doFind() {
    //Set the search text to the value in the box
    if (typeof(selectedLayerId) == 'undefined') {
        Ext.Msg.alert('Message', 'Please select the layer to be searched');
    } else {
        var userInput = dojo.byId("scheme").value;
        if (userInput.length > 0) {
            findParams.layerIds = [selectedLayerId];
            findParams.searchText = userInput;
            //Call execute method on the query task object
            findTask.execute(findParams, showResults);
            start();
        } else {
            Ext.Msg.alert('Message', 'Please enter the scheme to be searched');
        }

    }

}

/**
*
* @param {Object} results
* Call back function
*/
function showResults(results) {
    //This function works with an array of FindResult that the task returns
    map.graphics.clear();
    //var symbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([98, 194, 204]), 2), new dojo.Color([98, 194, 204, 0.5]));
    var symbol = new esri.symbol.SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([0, 255, 0]));
    //create array of attributes
    var items = dojo.map(results, function (result) {
        var graphic = result.feature;
        graphic.setSymbol(symbol);
        map.graphics.add(graphic);
        return result.feature.attributes;
    });

    //Create data object to be used in store
    var data = {
        identifier: "OBJECTID", //This field needs to have unique values
        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
        items: items
    };

    //Create data store and bind to grid.
    store = new dojo.data.ItemFileReadStore({
        data: data
    });
    //Populate grid with data
    var grid = dijit.byId('grid');
    grid.setStore(store);
}

//Zoom to the parcel when the user clicks a row
/**
* Measure tool bar
* @param {Object} evt
* Zooms to grid selected item on the map
*/
function onRowClickHandler(evt) {
    //Get selected row
    var clickedscheme = grid.getItem(evt.rowIndex).OBJECTID;
    var selectedscheme;
    //Define symbol to highight selected feature on map
    var select = new esri.symbol.SimpleMarkerSymbol().setSize(20).setColor(new dojo.Color([0, 0, 255]));
    //Default non select symbol
    var sym = new esri.symbol.SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([0, 255, 0]));
    //loop through all graphics available in the graphics layer
    dojo.forEach(map.graphics.graphics, function (graphic) {
        if ((graphic.attributes) && graphic.attributes.OBJECTID === clickedscheme) {
            //use selected symbol
            selectedscheme = graphic;
            graphic.setSymbol(select);
            return;

        } else {
            //set default symbol
            graphic.setSymbol(sym);
        }

    });
    //zoom factor
    var factor = 2000;
    //define bounding rectangle parameters
    var x1 = selectedscheme.geometry.x - factor;
    var y1 = selectedscheme.geometry.y - factor;
    var x2 = selectedscheme.geometry.x + factor;
    var y2 = selectedscheme.geometry.y + factor;
    //Create bounding rectangle object
    var PointExtent = new esri.geometry.Extent(x1, y1, x2, y2, map.spatialReference);
    //Zoom to the extent as defined in the bounding rectangle
    map.setExtent(PointExtent);
}

/**
* 
* @param {Object} mp
* mp is the map object
* Measure tool widget
*/
function measure(mp) {
    //define a new line symbol and point symbol to use for measure tools
    var pms = new esri.symbol.PictureMarkerSymbol("images/flag.png", 24, 24);
    pms.setOffset(9, 11);
    var sls = new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color("blue"), 3);
    //instantiate the measure tool widget
    var measurement = new esri.dijit.Measurement({
        map: map,
        lineSymbol: sls,
        pointSymbol: pms
    }, dojo.byId('measurementDiv'));
    //Call startup method to activate the measure widget
    measurement.startup();
    //Call set tool function and set it to false
    measurement.setTool("area", false);
}

dojo.ready(init);
