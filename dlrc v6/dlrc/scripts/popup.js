/**
 * popup.js 
 * @author David Muthami
 * Created on 2013-11-11
 * 
 * Modified by:Samuel Mukua
 * Modified on 2013-11-19
 */

//Global variables
var identifyTask, identifyParams;
//boolean variable that ensures mapReady function is executed only once
var isMapReady = 0;

/**
 * instanitates an identify task for the dynamic map service 
 */
function mapReady(map) {

    //wire onClick event on the map object to the executeIdentifyTask event handler
    //dojo.connect(map,"onClick",executeIdentifyTask);

    //create identify tasks and setup parameters 
    identifyTask = new esri.tasks.IdentifyTask("http://localhost:6080/arcgis/rest/services/DLRC_Malawi/DLRC_Basemap_Layers/MapServer");

    identifyParams = new esri.tasks.IdentifyParameters();
    identifyParams.tolerance = 3;
    identifyParams.returnGeometry = true;
    //Operational layers only
    identifyParams.layerIds = [1,3,4,6,7,8,9,11,13,14,16,18,19,21,22,23,24,25];
    identifyParams.layerOption = esri.tasks.IdentifyParameters.LAYER_OPTION_ALL;
    identifyParams.width = map.width;
    identifyParams.height = map.height;
	//Switch on indicates mapReady function has already been executed
    isMapReady = 1;
}

/**
 * function gets clicked map point for dynamic map services and retrievs attribute information 
 * evt object is argument passed to the function
 */
function executeIdentifyTask(evt) {
    identifyParams.geometry = evt.mapPoint;
    identifyParams.mapExtent = map.extent;
	//run identify task
    var deferred = identifyTask.execute(identifyParams);

    /**
    *Call back function
    *  */
    deferred.addCallback(function (response) {
        // response is an array of identify result objects    
        // Let's return an array of features.
        return dojo.map(response, function (result) {
            var feature = result.feature;
            feature.attributes.layerName = result.layerName;
            var lyrname = result.layerName;
            //Check if Met Stations
            console.log("We wanna show grid for basemap layers");
            if (result.layerName === 'Met Stations') {
                //console.log(feature.attributes.SCHEME);
                var str = "${Station Name} <br/> Latitude : ${Latitude}";
                str += "<br/> Longitude : ${Longitude}";
                str += "<br/> Altitude : ${Altitude}";
                var template = new esri.InfoTemplate("Met Station", str);
                feature.setInfoTemplate(template);
            }
            //Check if Railway layer
            else if (result.layerName === 'Railway') {
                var template = new esri.InfoTemplate("Railway",
                	"Railway", "Length: ${LENGTH}");
                feature.setInfoTemplate(template);
            }
            //Check if Lake Roads
            else if (result.layerName === 'Roads') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> Ref : ${Ref}";
                str += "<br/> Type : ${Type}";
                str += "<br/> One Way : ${One Way}";
                str += "<br/> Bridge : ${Bridge}";
                str += "<br/> Max Speed : ${Max Speed}";
                var template = new esri.InfoTemplate("Road",str);
                feature.setInfoTemplate(template);
            }
            //Check if contours
            else if (result.layerName === 'Contours') {
                var str = "<br/> Numeric Use : ${Numeric Use}";
                str += "<br/> Contour  : ${Contour }";
                var template = new esri.InfoTemplate("Contour", str);
                feature.setInfoTemplate(template);
            }
            //Check if Rivers
            else if (result.layerName === 'Rivers') {
                var str = "<br/> LENGTH : ${LENGTH}";
                var template = new esri.InfoTemplate("Rivers", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Wetlands
            else if (result.layerName === 'Wetlands') {
                var str = "<br/> Wet Type : ${Wet Type}";
                str += "<br/> Hectares : ${Hectares}";
                var template = new esri.InfoTemplate("Wetlands", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Lake
            else if (result.layerName === 'Lake') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> Area (SqKm) : ${Area (SqKm)}";
                var template = new esri.InfoTemplate("Lake", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Protected Areas
            else if (result.layerName === 'Protected Areas') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> TYPE : ${TYPE}";
                str += "<br/> Region : ${Region}";
                str += "<br/> Traditional Area : ${TA}";
                str += "<br/> District : ${District}";
                var template = new esri.InfoTemplate("Protected Areas", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Land Use
            else if (result.layerName === 'Land Use') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> TYPE : ${TYPE}";
                str += "<br/> OSM ID : ${OSM ID}";
                var template = new esri.InfoTemplate("Land Use", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Soil
            else if (result.layerName === 'Soil') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> TYPE : ${TYPE}";
                str += "<br/> OSM ID : ${OSM ID}";
                var template = new esri.InfoTemplate("Soil", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Agro Ecological Zones
            else if (result.layerName === 'Agro Ecological Zones') {
                var str = "<br/> Soil Unit : ${SOIL_UNIT}";
                str += "<br/> LGP : ${LGP}";
                str += "<br/> Typical SI : ${TYPICAL_SI}";
                str += "<br/> Agr. Eco. Zone : ${AGR_ZONE}";
                str += "<br/> Temp OC : ${TEMP_OC}";
                var template = new esri.InfoTemplate("Agro Ecological Zones", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Livelihood Zones
            else if (result.layerName === 'Livelihood Zones') {
                var str = "<br/> Name : ${NAME}";
                str += "<br/> LZ Name  : ${LZ_NAME}";
                str += "<br/> LZ Code  : ${LZ_CODE}";
                str += "<br/> District : ${DISTRICT}";
                str += "<br/> Temp OC : ${TEMP_OC}";
                var template = new esri.InfoTemplate("Livelihood Zones", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Population
            else if (result.layerName === 'Population') {
                var str = "<br/> Household : ${HOUSEHOLDS}";
                str += "<br/> Male  : ${MALE}";
                str += "<br/> Female  : ${FEMALE}";
                str += "<br/> District : ${DISTRICT}";
                str += "<br/> Total : ${TOTAL}";
                str += "<br/> Density : ${DENSITY}";
                str += "<br/> Code : ${CODE}";
                str += "<br/> EA Code : ${EA_CODE2}";
                var template = new esri.InfoTemplate("Population", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Traditional Areas
            else if (result.layerName === 'Traditional Areas') {
                var str = "<br/> Tradition Area Name : ${Tradition Area Name}";
                str += "<br/> District  : ${DISTRICT}";
                str += "<br/> Region  : ${REGION}";
                var template = new esri.InfoTemplate("Traditional Areas", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Project District
            else if (result.layerName === 'Project District') {
                var str = "<br/> Hotspots : ${Hotspots}";
                str += "<br/> District  : ${DISTRICT}";
                str += "<br/> Region  : ${REGION}";
                var template = new esri.InfoTemplate("Project District", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Project Regions
            else if (result.layerName === 'Project Regions') {
                var str = "<br/> Hotspots : ${Hotspots}";
                str += "<br/> Region  : ${REGION}";
                var template = new esri.InfoTemplate("Project Regions", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Agricultural Dev. Divisions
            else if (result.layerName === 'Agricultural Dev. Divisions') {
                var str = "<br/> Name : ${Name}";
                str += "<br/> Area  : ${Shape_Area}";
                var template = new esri.InfoTemplate("Agricultural Dev. Divisions", str);
                feature.setInfoTemplate(template);
            }
            //DLRC Agricultural Dev. Divisions
            else if (result.layerName === 'Contry Boundary') {
                var str = "<br/> Area : ${Shape_Area}";
                var template = new esri.InfoTemplate("Contry Boundary", str);
                feature.setInfoTemplate(template);
            }
            //return object with attribute information to be displayed
            return feature;
        });
    });


    // InfoWindow expects an array of features from each deferred
    // object that you pass. If the response from the task execution 
    // above is not an array of features, then you need to add a callback
    // like the one above to post-process the response and return an
    // array of features.
    map.infoWindow.setFeatures([deferred]);
    map.infoWindow.show(evt.mapPoint);
}

	/*
	 * Get content
	 * For layers with epa field
	 */
     function getTextContent(graphic) {
       
       var content;
       content = "<br/>SCHEME:&nbsp " + graphic.attributes.scheme;
       content += "<br/>DISTRICT:&nbsp " + graphic.attributes.district;
       content += "<br/>REGION:&nbsp " + graphic.attributes.region;
       content += "<br/>AGRICULTURAL DEVELOPMENT DIVISION:&nbsp " + graphic.attributes.ADD_Name;
       content += "<br>EXTENSION PLANNING AREA:&nbsp " + graphic.attributes.epa;
       content += "<br>CATCHMENT:&nbsp " + graphic.attributes.catchment;
       content += "<br>ALTITUDE(M):&nbsp " + graphic.attributes.altitude_m;
       content += "<br>DESCRIPTION:&nbsp " + graphic.attributes.description;
       content += "<br>AREA(Ha):&nbsp " + graphic.attributes.area_ha;
       return  content;
      }
      
      /**
       *Function gets map point and converts it to a point extent 
       */
     function pointToExtent(map, point, toleranceInPixel) {
       var pixelWidth = map.extent.getWidth() / map.width;
       var toleraceInMapCoords = toleranceInPixel * pixelWidth;
       return new esri.geometry.Extent( point.x - toleraceInMapCoords,
                    point.y - toleraceInMapCoords,
                    point.x + toleraceInMapCoords,
                    point.y + toleraceInMapCoords,
                    map.spatialReference );                           
      }
      
      /**
       * Creates a standard template for all feature service layers
       * 
       */
	function setInfoTemplate(){
		//Create info template object
		var template = new esri.InfoTemplate();
		/*
		 * Set the content of the info template
		 * Need to diversify this to ensure that each layer receives a native info template
		 */
		template.setContent(getTextContent);	
				 
		/*
		 *For the five feature service layers 
		 * hotspots,tank bunds, Farmer based organizations, Land use land cover, catchments, irrigation schemes
		 */
		try {lyrcatchments.infoTemplate = template; }catch(err){console.log(err.message);}
		try {lyrIrrigationSchemes.infoTemplate = template;}catch(err){console.log(err.message);}
		try {lyrLULC.infoTemplate = template;}catch(err){console.log(err.message);}
		try {lyrFBO.infoTemplate = template;}catch(err){console.log(err.message);}
		try {lyrTankBunds.infoTemplate = template;}catch(err){console.log(err.message);}
		try {lyrHotspots.infoTemplate = template;}catch(err){console.log(err.message);}
		
	}
	
	  /**
       * Removes info template
       * 
       */
	function removeInfoTemplate(){
		
		/*
		 *For the five feature service layers  set the template to null
		 * hotspots,tank bunds, Farmer based organizations, Land use land cover, catchments, irrigation schemes
		 */
		lyrTankBunds.infoTemplate = null;
		lyrHotspots.infoTemplate = null;
		lyrFBO.infoTemplate = null;
		lyrLULC.infoTemplate = null;
		lyrIrrigationSchemes.infoTemplate = null;
		lyrcatchments.infoTemplate = null;
		
	}
	
	
	var showPopUp = 0; //off
	//handler for the map onclick event 
	var popupHandle;
	/**
	 * event handler for the onclick event for Select  
	 */
	function tooglePopup() {
	    if (isMapReady==0) {
	        mapReady(map);
	    }
	    if (showPopUp == 0) {
	        showPopUp = 1; //Turn it on and pops display
	        activatePopup();
	        document.getElementById('idShowPopup').innerHTML = " Disable Identify";
	
	    } else {
	        showPopUp = 0; //Turn it off and pops display
	        deactivatePopup();
	        document.getElementById('idShowPopup').innerHTML = " Enable identify";
	    }
	}

/**
 * Event handler for onMap click event 
 * If the point (map click) falls on a feature service layer then code within first try block is executed
 * If the point (map click) falls on an ArcGIS dynamic map service now refreed as basemap layer then an exception is thrown and within the try catch
 * 	the executeIdentifyTask event is called and passing the evt object. This shows popup from 
 */
	function popUpIdentifyExecute(evt){
	    try
		  {
		  //Try running pop up for feature layer
	          var query = new esri.tasks.Query();
	          query.geometry = pointToExtent(map,evt.mapPoint,10);
	          var deferred = featureLayer.selectFeatures(query,esri.layers.FeatureLayer.SELECTION_NEW);
	          map.infoWindow.setFeatures([deferred]);
	          map.infoWindow.show(evt.mapPoint);		  
		  
		  }
		catch(err)
		  {
		  //In the nested try catch 
		  //attempt running identify on the arcgis dynamic map service
			  try
			  {
		          //For basemaps
		          executeIdentifyTask(evt);			  
			  }
				catch(err)
			  {
			  //Handle errors here and write to programmers notepad
			  console.log(err.message);
			  }
		  }    	
	}
	/*
	 * Activate popup
	 */
	function activatePopup() {
	
	    //wire onClick event on the map object to the popUpIdentifyExecute event handler
	    //Create global variable
	    popupHandle = dojo.connect(map, "onClick", popUpIdentifyExecute);
	    
	    //Set info template
	    setInfoTemplate();
	
	}
	/*
	 * Deactivate popup
	 */
	function deactivatePopup() {
	
	    //dewire onClick event on the map object to the executeIdentifyTask event handler
	    dojo.disconnect(popupHandle);
	    
	    //Remove info template
	    removeInfoTemplate();
	
	}
