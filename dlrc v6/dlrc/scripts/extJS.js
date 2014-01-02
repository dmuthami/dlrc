require([
			"esri/map", 
		  	"esri/layers/FeatureLayer",
			"esri/dijit/PopupTemplate",
			"dojo/number",
			"dojo/domReady!"
	],function(Map,FeatureLayer,PopupTemplate, number){
		 var map;
		 
		      function initt() {
		        var viewport = new Ext.Viewport({
		          layout: "fit",
		          title: "EXT JS Layout",
		          items: [{
		            layout: "border",
		            defaults: {
					    collapsible: true,
					    split: true,
					    bodyStyle: 'padding:15px'
					},
		            items: [{
		              region: "center",
		              title: "center",
		              html: "<div id='malawimap' style='height:100%; width:100%;z-index=: 1000;'></div>"
		            }, {
		              region: "north",
		              height: 50,
		              collapsible: false,
		              contentEl:"header" 
		            }, {
		              region: "south",
		              collapsible: true,
		              floatable: true,
            		  split: true,
		              height: 200,
		              minHeight: 120,
		              contentEl: "griddiv" // this gets the content from the div named "footer"
		            }, {
		              region: "west",
		              title: "Controls",
		              width: 150,
		              split: true,
		              collapsible: true,
		              contentEl: "Control" ,// this gets the content from the div named "Control"
		              //html: "Left panel content. This panel is collapsible and can be resized using the splitter",
		              listeners:{
		                collapse: resizeMap,
		                expand: resizeMap
		              }
		            }, {
		              region: "east",
		              collapsible: true,
                      floatable: true,
                      split: true,
		              width: 200,
					  //contentEl: "idAccordionMaster" // this gets the content from the div named "tabscontainer"
					  layout: 'accordion',
					      defaults: {
					        // applied to each contained panel
					        bodyStyle: 'padding:15px',
							width: '100%'
					    },
					    layoutConfig: {
					        // layout-specific configs go here
					        titleCollapse: false,
					        animate: true,
					        activeOnTop: true
					    },
						items:[{
							    title: 'legend',
							    id: 'pnllegend',
							    contentEl: "legend" 
							},{
							    title: 'Measure',
							    id: 'panel2',
							    contentEl: "measurementDiv" 
							},
							{
							    title: 'Search',
							    id: 'pnlSearch',
							    contentEl: "layer_list" 
							},
							{
							    title: 'Select',
							    id: 'pnlSelect',
							    contentEl: "idAccordionSelect" 
							}
						]
		            }]
		          }]
		        });
		
		        map = new esri.Map("malawimap", {
		          basemap: "topo", 
		          center: [-118.35, 34.45],
		          zoom: 11
		        });
		
		        var template = new esri.dijit.PopupTemplate({
		          title: "Geologic Outcrop",
		          description:"{lithology_type} with the following metamorphic facies: {metamorphic_facies}"
		        });      
		        var featureLayer = new esri.layers.FeatureLayer("http://sampleserver5.arcgisonline.com/ArcGIS/rest/services/Energy/Geology/MapServer/9",{
		          mode:esri.layers.FeatureLayer.MODE_SNAPSHOT,
		          infoTemplate:template,
		          outFields:["lithology_type","metamorphic_facies"]
		        });
		        map.addLayer(featureLayer);
		      }//end of init function
		      
		      /**
		       * function used to resize map 
		       */
		      function resizeMap() {
		        map.resize();
		      }
		 
		 	  //Call init
		 	  //initt();
	});
