            dojo.require("dijit.layout.BorderContainer");
            dojo.require("dijit.layout.ContentPane");
            dojo.require("esri.map");
            dojo.require("esri.virtualearth.VETiledLayer");
            dojo.require("dijit.TitlePane");
            dojo.require("esri.dijit.BasemapGallery");
            dojo.require("esri.arcgis.utils");
            dojo.require("agsjs.layers.GoogleMapsLayer");
              
            function createBasemapGallery() {
              //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
              var basemapGallery = new esri.dijit.BasemapGallery({
                showArcGISBasemaps: true,
                toggleReference: true,
                google: {
                  apiOptions: {
                    v: '3.7' // use a specific version is recommended for production system.
                  }
                },
                map: map
              }, "basemapGallery");
              basemapGallery.startup();
              
              //wire event to error handler
              dojo.connect(basemapGallery, "onError", function(msg) {
                if (console) console.log(msg)
              });
            }
            
