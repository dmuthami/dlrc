
/**
* malawi.min.js 
* @author Samuel Mukua
* Created on 2013-11-11
* 
* Modified by:David Muthami
* Modified on 2013-11-19
*/

//Declare global variables
var map, toc, Layer, osmLayer, navToolbar, queryTask, query;

/**
*Load dojo libraries
*/
require([
"dojo/_base/connect",
"dojo/dom",
"dojo/parser",
"dojo/on",
"dojo/_base/Color",

"esri/map",
"esri/geometry/Extent",
"esri/layers/FeatureLayer",
"esri/dijit/HomeButton",
"esri/dijit/Scalebar",
"esri/dijit/OverviewMap",

"esri/toolbars/draw",
"esri/graphic",

"esri/layers/ArcGISTiledMapServiceLayer",
"esri/layers/ArcGISDynamicMapServiceLayer",

"esri/renderers/ClassBreaksRenderer",
"esri/layers/LayerDrawingOptions",

"esri/symbols/SimpleFillSymbol",
"esri/symbols/SimpleLineSymbol",
"esri/symbols/SimpleMarkerSymbol",

"agsjs/dijit/TOC",
"esri/layers/osm",
"esri/toolbars/navigation",
"dijit/layout/BorderContainer",
"dijit/layout/ContentPane",
"dijit/layout/AccordionContainer",

"dojox/grid/DataGrid",
"dojo/data/ItemFileReadStore",
"dojo/data/ItemFileWriteStore",

"dojo/_base/array",
"dojo/dom-style",

"esri/tasks/find",
"esri/dijit/Popup",
"esri/dijit/Measurement",
"esri/dijit/Scalebar",

"dijit/form/Button",
"dijit/registry",

"dojo/fx",
"dojo/number",

"dojo/store/Memory",
"dojo/date/locale",
"dojo/_base/declare",

"dgrid/OnDemandGrid",
"dgrid/Selection",
"dojo/domReady!"],
  function (connect, dom, parser, on, Color, Map, Extent, FeatureLayer,
   HomeButton, Scalebar, OverviewMap,
   Draw, Graphic, ArcGISTiledMapServiceLayer,
   ArcGISDynamicMapServiceLayer, /*LayerDrawingOptions,*/
   SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol,
   Query, ClassBreaksRenderer, TOC, number,
   SimpleLineSymbolSnappingManager, Measurement, keys,
   Memory, locale, declare,
   Grid, Selection) {

      // Parse DOM nodes decorated with the data-dojo-type attribute
      parser.parse();

      /**
      * Create popup object
      *
      */
      var popup = new esri.dijit.Popup({
          fillSymbol: new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_SOLID, new dojo.Color([255, 0, 0]), 2), new dojo.Color([255, 255, 0, 0.25]))
      }, dojo.create("div"));



      //Specify extent
      var extentInitial = new esri.geometry.Extent({
          "xmin": 3653078.4558041804, // 3653078.4558041804		3504179.125
          "ymin": -1945780.9920269293, // -1945780.9920269293		-1859254.276
          "xmax": 4045659.0330767394, // 4045659.0330767394		4187531.906
          "ymax": -969833.0148820624, // -969833.0148820624		-971361.755
          "spatialReference": {
              "wkid": 102100
          }
      });

      //------------------------initt function goes here----------------------------------------------------------------------------------------------------------------------
      function initt() {

          Ext.require('Ext.tab.*');

          var viewport = new Ext.Viewport({
              layout: "fit",
              title: "DLRC",
              items: [{
                  layout: "border",
                  margins: '2 2 2 2',
                  defaults: {
                      collapsible: false,
                      split:false,
                      bodyStyle: 'padding:0px'
                  },
                  items: [{
                      region: "center",
                      title: "Map",
                      collapsible: false,
                      html: "<div id='malawimap' dojotype='dijit.layout.ContentPane' style='height:100%; width:100%;z-index=: 1000;'>" +
								"<div style='position:absolute; right:20px; top:10px; z-Index:1001;'>" +
									"<div dojoType='dijit.TitlePane' title='<b>Switch Basemap</b>' closable='false' open='false'>" +
										"<div dojoType='dijit.layout.ContentPane' style='width:380px; height:280px; overflow:auto;'>" +
											"<div id='basemapGallery'>" +
											"</div>" +
										"</div>" +
									"</div>" +
								"</div>" +
								"<div id='HomeButton'></div>" +
							"</div>"
                  }, {
                      region: "north",
                      height: 96,
                      collapsible: false,
                      contentEl: "header"
                  },
                  /*				*/
					  {
					  region: "south",
					  id: "idSouth",
					  collapsible: false,
					  split: false,
					  bodyStyle: 'padding:0px',
					  height: 35,
					  minHeight: 10,
					  contentEl: "footer" // this gets the content from the div named "footer"
			},

				  {
				      region: "west",
				      title: "Controls",
				      width: 155,
				      bodyStyle: 'padding:3px',
				      split:true,
				      collapsible: true,
				      autoScroll: true, 
				      contentEl: "Control", // this gets the content from the div named "Control"
				      //html: "Left panel content. This panel is collapsible and can be resized using the splitter",
				      listeners: {
				          collapse: resizeMap,
				          expand: resizeMap
				      }
				  },
					  {
					      region: "east",
					      title: "Operations",
					      collapsible: true,
					      floatable: true,
					      split: true,
					      bodyStyle: 'padding:2px',
					      width: 250,
					      //contentEl: "idAccordionMaster" // this gets the content from the div named "tabscontainer"
					      layout: 'accordion',
					      defaults: {
					          // applied to each contained panel
					          bodyStyle: 'padding:2px',
					          width: '100%'
					      },
					      layoutConfig: {
					          // layout-specific configs go here
					          titleCollapse: false,
					          animate: true,
					          activeOnTop: true
					      },
					      items:
						    [
									 {
									     title: 'Legend/Map Key',
									     id: 'pnllegend',
									     autoScroll: true, //Allows scroll
									     contentEl: "legend"
									 },
									  {
									      title: 'Measure (Distance/Area)',
									      id: 'panel2',
									      autoScroll: true, //Allows scroll
									      contentEl: "measurementDiv"
									  },
									{
									    title: 'Search by Scheme Name',
									    id: 'pnlSearch',
									    autoScroll: true, //Allows scroll
									    contentEl: "idSearch"
									},
									{
									    title: 'Select by Box',
									    id: 'pnlSelect',
									    autoScroll: true, //Allows scroll
									    contentEl: "idAccordionSelect"
									},
									{
									    title: 'Find by Attribute',
									    id: 'pnlSelectby',
									    autoScroll: true, //Allows scroll
									    contentEl: "sel_list"
									}
							],
					      listeners: {
					          collapse: resizeMap,
					          expand: resizeMap
					      }

					  }
				  ]
              }]
          });
      }

      //-------------------------init function ends here-----------------------------------------------------------------------------------------------------------------------
      /**
      * function used to resize map 
      */
      function resizeMap() {
          map.resize();
      }

      //Call initt function from ExtJS javascript File
      initt();
      /*
      * Create map object
      * Specify parameters in cinstructor: logo,pop up window and map extent
      */
      map = new Map("malawimap", {
          basemap: "osm",
          logo: false,
          infoWindow: popup,
          extent: extentInitial

      });

      //Create  basemap switcher here
      createBasemapGallery();

      //HomeButton widget
      var home = new HomeButton({
          map: map
      }, "HomeButton");
      home.startup();

      /*
      * Step: Add the scalebar widget to the map
      */
      var dijitScaleBar = new Scalebar({
          map: map,
          attachTo: "bottom-left",
          scalebarUnit: "dual"
      });

      //Add overview map
      var overviewMapDijit = new OverviewMap({
          map: map,
          attachTo: "bottom-right",
          visible: true
      });
      overviewMapDijit.startup();

      //Add a css class for the popups
      dojo.addClass(map.infoWindow.domNode, "myTheme");

      //define basemap from Open street map    
      osmLayer = new esri.layers.OpenStreetMapLayer();

      //create navigation toolbar
      navToolbar = new esri.toolbars.Navigation(map);
      //disable map scroll wheel
      map.disableScrollWheelZoom();
      //Connect navigation toolbar to the map
      dojo.connect(navToolbar);

      /**
      * Catchments Feature Layer
      */

      //Catchments constructor parameters
      var urlCatchments = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/0";
      //Define fields to be output
      outFieldsCatchments = [
    				"scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "altitude_m",
                    "area_ha",
						  ];

      // Construct the Catchments layer,global variable
      lyrCatchments = new FeatureLayer(urlCatchments, {
          /*
          * Step: Set the Hotspots layer output fields
          */
          outFields: outFieldsCatchments,
          visibility: true

      });

      /**
      * IrrigationSchemes Feature Layer
      */

      //IrrigationSchemes constructor parameters
      var urlIrrigationSchemes = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/1";
      //Define fields to be output for irrigation schemes
      outFieldsIrrigationSchemes = [
    				"scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "epa",
                    "area_ha",
									  ];

      // Construct the IrrigationSchemes layer
      lyrIrrigationSchemes = new FeatureLayer(urlIrrigationSchemes, {
          /*
          * Step: Set the Hotspots layer output fields
          */
          outFields: outFieldsIrrigationSchemes,
          visibility: true

      });

      /**
      * LULC Feature Layer
      */

      //LULC constructor parameters
      var urlLULC = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/2";
      //Define fields to be output
      outFieldsLULC = [
					"scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "epa",
                    "area_ha",
                    ];

      // Construct the LULC layer
      lyrLULC = new FeatureLayer(urlLULC, {
          /*
          * Step: Set the Hotspots layer output fields
          */
          outFields: outFieldsLULC,
          visibility: true

      });

      /**
      * FBO Feature Layer
      */

      //FBO constructor parameters
      var urlFBO = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/3";
      //Define fields to be output
      outFieldsFBO = [
				    "scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "altitude_m",
                     "area_ha",
                     ];

      // Construct the FBO layer
      lyrFBO = new FeatureLayer(urlFBO, {
          /*
          * Step: Set the Hotspots layer output fields
          */
          outFields: outFieldsFBO,
          visibility: true

      });

      /**
      * Hotspots Feature Layer
      */

      //Hotspots constructor parameters
      var urlHotspots = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/4";
      //Define fields to be output
      outFieldsHotspots = [
					"scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "epa",
                     "area_ha",
                     ];

      // Construct the Hotspots layer
      lyrHotspots = new FeatureLayer(urlHotspots, {
          /*
          * Step: Set the Hotspots layer output fields
          */
          outFields: outFieldsHotspots,
          visibility: true

      });

      /**
      * TankBunds Feature Layer
      */

      //TankBunds constructor parameters
      var urlTankBunds = "http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Operational_Layers/MapServer/5";
      //Define fields to be output
      outFieldsTankBunds = [
					"scheme",
		            "region",
		            "district",
		            "catchment",
		            "description",
		            "OBJECTID",
		            "ADD_Name",
		            "epa",
                     "area_ha",
                     ];

      // Construct the TankBunds layer
      lyrTankBunds = new FeatureLayer(urlTankBunds, {
          /*
          * Step: Set the TankBunds layer output fields
          */
          outFields: outFieldsTankBunds,
          visibility: true

      });

      //Dynamic Basemap services
      lyrMalawiBaseLayers = new ArcGISDynamicMapServiceLayer("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Basemap_Layers/MapServer", {
          opacity: 0.8
      });

      /**
      * After all layers are added
      * Create the legend from the operational feature services and the
      * and the dynamic map service 
      */
      map.on('layers-add-result', function (evt) {
          toc = new TOC({
              map: map,
              layerInfos: [
            	{
            	    layer: lyrCatchments,
            	    title: "Catchments"

            	},
				{
				    layer: lyrIrrigationSchemes,
				    title: "Irrigation Schemes"

				},
				{
				    layer: lyrLULC,
				    title: "Land Use Land Cover"

				},
				{
				    layer: lyrFBO,
				    title: "Farmer Based Org."

				},
				{
				    layer: lyrHotspots,
				    title: "Hotspots"

				},
				{
				    layer: lyrTankBunds,
				    title: "Tank Bunds"

				},
				{
				    layer: lyrMalawiBaseLayers,
				    title: "BaseMap layers"
				}
			]
          }, 'legend');
          //
          toc.startup();
          toc.on('load', function () {
              //check out that the toc component is loaded well
              if (console)
                  console.log('TOC loaded');
          });

      });
      //Add layers
      map.addLayers([
      //osmLayer,
    	lyrMalawiBaseLayers,
    	lyrTankBunds,
    	lyrHotspots,
    	lyrFBO,
    	lyrLULC,
    	lyrIrrigationSchemes,
    	lyrCatchments]);

      //Call all functions boss
      // Construct and wire callMyFunctions handler after all layers have loaded
      map.on("layers-add-result", callMyFunctions);


  });

/**
* Loads other loader functons
*/
function callMyFunctions() {
    //Function allows you to set the popup template
    //setInfoTemplate();

    //init select
    initSelect();

    //Jquery function
    jqueryReady();

    //Turn popup after all layers have been loaded
    tooglePopup();
}
    