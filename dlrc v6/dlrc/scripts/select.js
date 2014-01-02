/**
* popup.js
* @author David Muthami
* Created on 2013-11-11
*
* Modified by:Samuel Mukua
* Modified on 2013-11-19
*/

/**
* Function called by callMyFunctions in malawi.min.js
* 
*/
function initSelect() {
    /*
    * Step: Wire the draw tool initialization function
    */
    //map.on("load",initDrawTool);
    initDrawTool();

    //Create button and add it to a certain div
    //wire toogleSelect event

    /*
    * 
    var btnApplyRenderer = new dijit.form.Button({
    label : "Enable Select",
    onClick : toogleSelect
    }, "idSelect");	
    */
}

/**
* Function that initiales the draw toolbar 
*/
function initDrawTool() {
    /*
    * Step: Implement the Draw toolbar
    */
    tbDraw = new esri.toolbars.Draw(map);
    //Wire the onDrawEnd evemt
    tbDraw.on("draw-end", displayPolygon);
    //Call activate method
    //tbDraw.activate(Draw.POLYGON);

};

/**
* Function draws polygon as digitized by user on map 
* Calls selectHotspots function
*/
function displayPolygon(evt) {
    require([
			"dojo/_base/Color",
		  	"esri/symbols/SimpleFillSymbol",
			"esri/symbols/SimpleLineSymbol",
			"esri/graphic"
			],
			function (Color, SimpleFillSymbol, SimpleLineSymbol,
				Graphic) {
			    // Get the geometry from the event object
			    var geometryInput = evt.geometry;

			    // Define symbol for finished polygon

			    var tbDrawSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASHDOT, new Color([255, 255, 0]), 2), new Color([255, 255, 0, 0.2]));

			    // Clear the map's graphics layer
			    map.graphics.clear();

			    /*
			    * Step: Construct and add the polygon graphic
			    */
			    var graphicPolygon = new Graphic(geometryInput, tbDrawSymbol);
			    map.graphics.add(graphicPolygon);

			    // Call the next function that performs the selection
			    performTheSelection(geometryInput);

			    //Loop thru current layers grid
			    //selectHotspots(geometryInput);			
			});

};

//--------------------------catchments Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for catchments
* The display polygon is used as an argument
*/
function selectcatchments(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrcatchments.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var querycatchments = new Query();
		    querycatchments.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrcatchments.on("selection-complete", populatecatchmentsGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrcatchments.selectFeatures(querycatchments, FeatureLayer.SELECTION_NEW);
		    
            $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();


		});

};

/***
* event handler for selection-complete event for layer of inteeest
* results is a parameter  
*/
function populatecatchmentsGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;

		    datacatchments = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */


		            "scheme": feature.attributes[outFieldsCatchments[0]],
		            "region": feature.attributes[outFieldsCatchments[1]],
		            "district": feature.attributes[outFieldsCatchments[2]],
		            "catchment": feature.attributes[outFieldsCatchments[3]],
		            "description": feature.attributes[outFieldsCatchments[4]],
		            "OBJECTID": feature.attributes[outFieldsCatchments[5]],
		            "ADD_Name": feature.attributes[outFieldsCatchments[6]],
		            "altitude_m": feature.attributes[outFieldsCatchments[7]],
                    "area_ha": feature.attributes[outFieldsCatchments[8]]

		        }
		    });




		    // Pass the data to the grid
		    /*
		    * 
		    * 
		    *
		    */
		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: datacatchments
		    };

		    //Create data store and bind to grid.
		    store1 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    gridf = dijit.byId('gridj');
		    gridf.setStore(store1);

		    		
		});
};

//---------------------------------------------------catchments Selection Code ends here-------------------------------------------------------------------------------

//--------------------------IrrigationSchemes Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for IrrigationSchemes
* The display polygon is used as an argument
*/
function selectIrrigationSchemes(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrIrrigationSchemes.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var queryIrrigationSchemes = new Query();
		    queryIrrigationSchemes.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrIrrigationSchemes.on("selection-complete", populateIrrigationSchemesGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrIrrigationSchemes.selectFeatures(queryIrrigationSchemes, FeatureLayer.SELECTION_NEW);
		    
            $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();

		});

};

/***
* event handler for selection-complete event for layer of inteeest
* results is a parameter  
*/
function populateIrrigationSchemesGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;

		    dataIrrigationSchemes = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */
		            "scheme": feature.attributes[outFieldsIrrigationSchemes[0]],
		            "region": feature.attributes[outFieldsIrrigationSchemes[1]],
		            "district": feature.attributes[outFieldsIrrigationSchemes[2]],
		            "catchment": feature.attributes[outFieldsIrrigationSchemes[3]],
		            "description": feature.attributes[outFieldsIrrigationSchemes[4]],
		            "OBJECTID": feature.attributes[outFieldsIrrigationSchemes[5]],
		            "ADD_Name": feature.attributes[outFieldsIrrigationSchemes[6]],
		            "epa": feature.attributes[outFieldsIrrigationSchemes[7]],
		            "area_ha": feature.attributes[outFieldsIrrigationSchemes[8]]
		        }
		    });

		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: dataIrrigationSchemes
		    };

		    //Create data store and bind to grid.
		    store2 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    grida = dijit.byId('gridk');
		    gridfa.setStore(store2);
		});
};

//---------------------------------------------------IrrigationSchemes Selection Code ends here-------------------------------------------------------------------------------

//--------------------------LULC Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for LULC
* The display polygon is used as an argument
*/
function selectLULC(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrLULC.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var queryLULC = new Query();
		    queryLULC.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrLULC.on("selection-complete", populateLULCGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrLULC.selectFeatures(queryLULC, FeatureLayer.SELECTION_NEW);
		    
            $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();

		});

};

/***
* event handler for selection-complete event for layer of interest
* results is a parameter  
*/
function populateLULCGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;
		    dataLULC = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */
		            "scheme": feature.attributes[outFieldsLULC[0]],
		            "region": feature.attributes[outFieldsLULC[1]],
		            "district": feature.attributes[outFieldsLULC[2]],
		            "catchment": feature.attributes[outFieldsLULC[3]],
		            "description": feature.attributes[outFieldsLULC[4]],
		            "OBJECTID": feature.attributes[outFieldsLULC[5]],
		            "ADD_Name": feature.attributes[outFieldsLULC[6]],
		            "epa": feature.attributes[outFieldsLULC[7]],
		            "area_ha": feature.attributes[outFieldsLULC[8]]
		        }
		    });

		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: dataLULC
		    };

		    //Create data store and bind to grid.
		    store3 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    gridb = dijit.byId('gridq');
		    gridb.setStore(store3);
		});
};

//---------------------------------------------------LULC Selection Code ends here-------------------------------------------------------------------------------



//--------------------------FBO  Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for FBO
* The display polygon is used as an argument
*/
function selectFBO(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrFBO.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var queryFBO = new Query();
		    queryFBO.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrFBO.on("selection-complete", populateFBOGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrFBO.selectFeatures(queryFBO, FeatureLayer.SELECTION_NEW);

		    $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();

		});

};

/***
* event handler for selection-complete event for layer of inteeest
* results is a parameter  
*/
function populateFBOGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;
		    dataFBO = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */
		            "scheme": feature.attributes[outFieldsFBO[0]],
		            "region": feature.attributes[outFieldsFBO[1]],
		            "district": feature.attributes[outFieldsFBO[2]],
		            "catchment": feature.attributes[outFieldsFBO[3]],
		            "description": feature.attributes[outFieldsFBO[4]],
		            "OBJECTID": feature.attributes[outFieldsFBO[5]],
		            "ADD_Name": feature.attributes[outFieldsFBO[6]],
		            "altitude_m": feature.attributes[outFieldsFBO[7]],
		            "area_ha": feature.attributes[outFieldsFBO[8]]
		        }
		    });

		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: dataFBO
		    };

		    //Create data store and bind to grid.
		    store4 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    gridc = dijit.byId('gridm');
		    gridc.setStore(store4);
		});
};

//---------------------------------------------------FBO Selection Code ends here-------------------------------------------------------------------------------   


//--------------------------Hotspots Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for hotspots
* The display polygon is used as an argument
*/
function selectHotspots(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrHotspots.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var queryHotspots = new Query();
		    queryHotspots.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrHotspots.on("selection-complete", populateHotspotGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrHotspots.selectFeatures(queryHotspots, FeatureLayer.SELECTION_NEW);
		    $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();


		});

};

/***
* event handler for selection-complete event for layer of inteeest
* results is a parameter  
*/
function populateHotspotGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;

		    dataHotspots = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */
		            "scheme": feature.attributes[outFieldsHotspots[0]],
		            "region": feature.attributes[outFieldsHotspots[1]],
		            "district": feature.attributes[outFieldsHotspots[2]],
		            "catchment": feature.attributes[outFieldsHotspots[3]],
		            "description": feature.attributes[outFieldsIrrigationSchemes[4]],
		            "OBJECTID": feature.attributes[outFieldsIrrigationSchemes[5]],
		            "ADD_Name": feature.attributes[outFieldsIrrigationSchemes[6]],
		            "epa": feature.attributes[outFieldsIrrigationSchemes[7]],
		            "area_ha": feature.attributes[outFieldsIrrigationSchemes[8]]
		        }
		    });

		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: dataHotspots
		    };

		    //Create data store and bind to grid.
		    store5 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    gridd = dijit.byId('gridn');
		    gridd.setStore(store5);
		});
};

//---------------------------------------------------Hotspots Selection Code ends here-------------------------------------------------------------------------------


//--------------------------TankBunds Selection Code starts here----------------------------------------------------------------------------------    
/**
* Called by displayPolygon function for TankBunds
* The display polygon is used as an argument
*/
function selectTankBunds(geometryInput) {
    require(["esri/tasks/query", "esri/symbols/SimpleMarkerSymbol", "esri/layers/FeatureLayer"],
		function (Query, SimpleMarkerSymbol, FeatureLayer) {
		    // Define symbol for selected features
		    var symbolSelected = new SimpleMarkerSymbol({
		        "type": "esriSMS",
		        "style": "esriSMSCircle",
		        "color": [255, 115, 0, 128],
		        "size": 6,
		        "outline":
		        {
		            "color": [255, 0, 0, 214],
		            "width": 1
		        }
		    });

		    /*
		    * Step: Set the selection symbol
		    */
		    lyrTankBunds.setSelectionSymbol(symbolSelected);

		    /*
		    * Step: Initialize the query
		    */
		    var queryTankBunds = new Query();
		    queryTankBunds.geometry = geometryInput;

		    /*
		    * Step: Wire the layer's selection complete event
		    */
		    lyrTankBunds.on("selection-complete", populateTankBundsGrid);

		    /*
		    * Step: Perform the selection
		    */
		    lyrTankBunds.selectFeatures(queryTankBunds, FeatureLayer.SELECTION_NEW);

		    $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

		    showSelectLayersBox();
		});

};

/***
* event handler for selection-complete event for layer of inteeest
* results is a parameter  
*/
function populateTankBundsGrid(results) {
    require(["dojo/store/Memory",
		"dojo/_base/array"], function (Memory, array) {
		    var gridData;

		    dataTankBunds = array.map(results.features, function (feature) {
		        return {
		            /*
		            * Step: Reference the attribute field values
		            */
		            "scheme": feature.attributes[outFieldsTankBunds[0]],
		            "region": feature.attributes[outFieldsTankBunds[1]],
		            "district": feature.attributes[outFieldsTankBunds[2]],
		            "catchment": feature.attributes[outFieldsTankBunds[3]],
		            "description": feature.attributes[outFieldsTankBunds[4]],
		            "OBJECTID": feature.attributes[outFieldsTankBunds[5]],
		            "ADD_Name": feature.attributes[outFieldsTankBunds[6]],
		            "epa": feature.attributes[outFieldsTankBunds[7]],
		            "area_ha": feature.attributes[outFieldsTankBunds[8]]
		        }
		    });

		    var data = {
		        identifier: "OBJECTID", //This field needs to have unique values
		        label: "OBJECTID", //Name field for display. Not pertinent to a grid but may be used elsewhere.
		        items: dataTankBunds
		    };

		    //Create data store and bind to grid.
		    store6 = new dojo.data.ItemFileReadStore({
		        data: data
		    });
		    //Populate grid with data
		    gride = dijit.byId('gridp');
		    gride.setStore(store6);
		});
};

//---------------------------------------------------Hotspots Selection Code ends here-------------------------------------------------------------------------------

function performTheSelection(geometryInput) {

    for (var i = 0, il = currentLayersArray.length; i < il; i++) {
        if (currentLayersArray[i] == 0) {//catchment sites
            selectcatchments(geometryInput); ;
        } else if (currentLayersArray[i] == 1) {//Irrigation Schemes 
            selectIrrigationSchemes(geometryInput); ;
        } else if (currentLayersArray[i] == 2) {//LULC
            selectLULC(geometryInput);
        } else if (currentLayersArray[i] == 3) {// selectFBO
            selectFBO(geometryInput);
        } else if (currentLayersArray[i] == 4) {// Hotspots
            selectHotspots(geometryInput); ;
        } else if (currentLayersArray[i] == 5) {// Tankbunds
            selectTankBunds(geometryInput); ;
        }

    }
}
//Global variable    
var activateSelect = 0; //off 		
/**
* event handler for onClick event of the enable click event
*/
function toogleSelect() {
    if (activateSelect == 0) {
        activateSelect = 1; //Turn it on and pops display
        //Activates capabilities for user to draw
        activateDraw();
        //Change controls dispay text
        document.getElementById('idSelect').innerHTML = " Disable Select";

        //Get selected layers
        //getSelectedLayers();
        //Show Dialog box to display box for select layersvar

       // $('#tabsDiv-1').removeClass('none').siblings("div").addClass('none');

        //showSelectLayersBox();

    } else {
        activateSelect = 0; //Turn it off and pops display
        //diable draw toolbar
        deactivateDraw();
        //Change display text for display toolbar
        document.getElementById('idSelect').innerHTML = " Enable Select";
    }
}

/*
* Activate Draw toolbar
*/
function activateDraw() {

    //Call activate method
    tbDraw.activate(esri.toolbars.Draw.POLYGON);

}
/*
* Deactivate Draw toolbar
*/
function deactivateDraw() {

    //dewire onClick event on the map object to the executeIdentifyTask event handler
    tbDraw.deactivate();
    //clears map graphics
    map.graphics.clear();
    //get rid of the datagrids
    closedialog();
    //clear the datagrids
    cleardg();
}

/**
*Called by toggleSelect() function
* Displays dialog box showing list of ;layers upon which user can select from 
*/
function showSelectLayersBox() {
    //$("#idDialog").html(items.join(' '));
    $("#tabs").dialog("open");
}

//----------------JQuery code goes here

/**
* Function called by when layers-add-result event is fired
*/
function jqueryReady() {
    //Add jquery code here
    $(document).ready(function () {
        $("#tabs").dialog({
            width: 1100,
            height: 210,
            autoOpen: false,
            autoScroll: false,
            resizable: false,
            position: {
                my: "center top+400px",
                at: "center"
            },
            show: {
                effect: "blind",
                duration: 800
            },
            hide: {
                effect: "explode",
                duration: 800
            }
        });

        //tab codes
        tabcode();
    });
}
function closedialog() {
    $("#tabs").dialog("close");
}

/**
* Tab code
*/
function tabcode() {
    $(':radio').change(function (event) {
        var id = $(this).data('id');
        $('#' + id).removeClass('none').siblings("div").addClass('none');
        if (id == 'tabsDiv-1') {
            try {

                gridf.setStore(store1);
            } catch (e) {
                grid0.innerHTML = "Sorry no data to be displayed since there was no selection was made on the catchment";
            }
        }
        else if (id == 'tabsDiv-2') {
         try {
            grida.setStore(store2);
        } catch (e) {
            grid2.innerHTML = "Sorry no data to be displayed since there was no selection was made on the IrrigationSchemes";
        }
        }
    else if (id == 'tabsDiv-3') {
         try {
            gridb.setStore(store3);
        } catch (e) {
            grid3.innerHTML = "Sorry no data to be displayed since there was no selection was made on the land use land cover";
        }
        }
    else if (id == 'tabsDiv-4') {
        try {
            gridc.setStore(store4);
        } catch (e) {
            grid4.innerHTML = "Sorry no data to be displayed since there was no selection was made on the farmers based org";
        }
        }
    else if (id == 'tabsDiv-5') {
        try {
            gridd.setStore(store5);
            }
            catch (e) {
                grid5.innerHTML = "Sorry no data to be displayed since there was no selection was made on the Hotspots";
             }
        } else if (id == 'tabsDiv-6') {
        try {
            gride.setStore(store6);
            }catch (e) {
             grid6.innerHTML ="Sorry no data to be displayed since there was no selection was made on the Tank bunds";
             }
        }
    });

}

function clearselection() {
    lyrcatchments.clearSelection();
    lyrIrrigationSchemes.clearSelection();
    lyrLULC.clearSelection();
    lyrFBO.clearSelection();
    lyrHotspots.clearSelection();
    lyrTankBunds.clearSelection();
}


	
	
    

