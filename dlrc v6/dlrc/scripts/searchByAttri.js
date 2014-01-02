/**
* popup.js
* @author Samuel Mukua
* Created on 2013-11-26
*
* Modified by:David Muthami
* Modified on 2013-11-28
*/
//Define global variables
var findTaskattrib, findbyattrib;
var grid, store;

/**
* init function
* define query parameters, servive endpoints and creates query tasks
*/
function intiselectby() {
    dojo.connect(grid, "onRowClick", onRowClickHandler);
    //Create Find Task using the URL of the map service to search
    dojo.connect(map, "onLoad");
    findTaskattrib = new esri.tasks.FindTask("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer");
    //Define the find parameters
    findbyattrib = new esri.tasks.FindParameters();
    findbyattrib.returnGeometry = true;
    /*
    * The below parameters has been greyed out
    * 
    * //findParams.layerIds =[2];
    * 
    * It is defined in the function processServiceInfo(sel) found in querysel function
    */

    //Define search fields on the so defined layer
    //define srid to be that of the 
    findbyattrib.outSpatialReference = map.spatialReference;
    //Write to the console
    //for details on setting up a proxy page.
    esri.config.defaults.io.proxyUrl = "/proxy";
    esri.config.defaults.io.alwaysUseProxy = false;

    //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications
    esri.config.defaults.geometryService = new esri.tasks.GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

}

/**
* dofind function
* Conducts a synchronous queryusing parameters defind in the init() function and uses call
* 	back function named showResults to display results
*
*/
function attribFind(){
    //Set the search text to the value in the box
     var attribInput = dojo.byId("attrib").value;
     if (attribInput.length > 0) {
         findbyattrib.searchText = attribInput;
         //Call execute method on the query task object
         findTaskattrib.execute(findbyattrib, showResults);
         start();
     } else {
         Ext.Msg.alert('Message', 'Please enter the value to be searched');
         disp();
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
    var symbo = new esri.symbol.SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([0, 255, 0]));
    var infoTemplate = new esri.InfoTemplate("SCHEME= ${SCHEME}",
    "<b>SCHEME:</b>&nbsp${scheme}<br /><b>REGION:</b></em> &nbsp${region} <br /><b>DISTRICT:</b>&nbsp ${district}<br/><b>AGRICULTURAL-<br/> DEVELOPMENT DIVISION:</b>&nbsp ${ADD_Name}<br/><b>EXTENSION PLANNING<br/> AREA:</b>&nbsp ${epa}<br/><b>catchment:</b> &nbsp${catchment}<br/><b>ALTITUDE(Meters):</b> &nbsp${altitude_m}<br/><b>DESCRIPTION:</b> &nbsp${description}<br/><b>AREA(hectares):</b> &nbsp${area_ha}");
    //create array of attributes
    var items = dojo.map(results, function (result) {
        var graphic = result.feature;
        graphic.setSymbol(symbo);
        graphic.setInfoTemplate(infoTemplate);
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
    store0 = new dojo.data.ItemFileReadStore({
        data: data
    });
    //Populate grid with data
   var grid = dijit.byId('grid');
   grid.setStore(store0);
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
    var symi = new esri.symbol.SimpleMarkerSymbol().setSize(10).setColor(new dojo.Color([0, 255, 0]));
    //loop through all graphics available in the graphics layer
    dojo.forEach(map.graphics.graphics, function (graphic) {
        if ((graphic.attributes) && graphic.attributes.OBJECTID === clickedscheme) {
            //use selected symbol
            selectedscheme = graphic;
            graphic.setSymbol(select);
            return;

        } else {
            //set default symbol
            graphic.setSymbol(symi);
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
dojo.ready(intiselectby);
//function for clearing the search by sceheme name textbox and search by attribute textbox
function cleartxt(){
    document.getElementById("scheme").value = "";
    document.getElementById("attrib").value = "";
}
function cleardg(){
    clearstore = new dojo.data.ItemFileReadStore({ data: { identifier: "", items: []} });
    grid = dijit.byId("grid");
    gda = dijit.byId("gridj");
    gdb = dijit.byId("gridk");
    gdc = dijit.byId("gridq");
    gdd = dijit.byId("gridm");
    gde = dijit.byId("gridn");
    gdf = dijit.byId("gridp");

        
    createemp();
}
function createemp() {

    var data = {
        items: clearstore
    };
    store = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store6 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store5 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store4 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store3 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store2 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    store1 = new dojo.data.ItemFileWriteStore({
        data: data
    });
    grid.setStore(store);
    gdf.setStore(store6);
    gde.setStore(store5);
    gdd.setStore(store4);
    gdc.setStore(store3);
    gdb.setStore(store2);
    gda.setStore(store1);
}
