<%@ Page Language="C#" AutoEventWireup="true" CodeFile="dlrc.aspx.cs" Inherits="dlrc_dlrc" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>Malawi DLRC</title> 
    <link href="styles/ext-theme-neptune-all.css" rel="stylesheet" type="text/css" />
    <link href="styles/ext-all-neptune.css" rel="stylesheet" type="text/css" />
    <link href="styles/claro.css" rel="stylesheet" type="text/css" />
    <link rel="stylesheet" href="http://js.arcgis.com/3.7/js/esri/css/esri.css"/>
    <link rel="stylesheet" href="styles/extCSS.css"/>
    <link rel="stylesheet" href="styles/dialog.css"/>
    <!-- Custom CSS-->
    <link rel="stylesheet" type="text/css" href="styles/layout.css" />
    <link rel="stylesheet" href="styles/popup.css" />
    <link href="jquery/themes/base/jquery.ui.all.css" rel="stylesheet" type="text/css" />
    <link href="jquery/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />
    <script src="scripts/ext-all.js" type="text/javascript"></script>
    <script type="text/javascript">
        var djConfig = {
            parseOnLoad: true,
            packages: [{
                "name": "agsjs",
                //"location": location.pathname.replace(/\/[^/]+$/, "")+'/../src/agsjs'
                "location": 'http://gmaps-utility-gis.googlecode.com/svn/tags/agsjs/2.02/xbuild/agsjs' // for xdomain load
            }]
        };
    </script>

    <script src="3.7/init.js" type="text/javascript"></script>
    <script src="argislib/toc/dijit/TOC.js" type="text/javascript"></script>
    <script type="text/javascript" src="scripts/main.js"></script>
    <script type="text/javascript" src="scripts/gmapsgallery.js"></script>
    <script src="scripts/functionalities.js" type="text/javascript"></script>
    <script src="scripts/query.js" type="text/javascript"></script>
    <script src="scripts/popup.js" type="text/javascript"></script>
    <script src="scripts/select.js" type="text/javascript"></script>
    <script src="jquery/tests/jquery-1.9.1.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery-ui.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.core.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.position.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.widget.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.effect.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.effect-blind.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.effect-explode.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.dialog.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.mouse.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.position.js" type="text/javascript"></script>
    <script src="scripts/querysel.js" type="text/javascript"></script>
    <script src="jquery/ui/jquery.ui.draggable.js" type="text/javascript"></script>
    <script src="scripts/searchByAttri.js" type="text/javascript"></script>
    <script type="text/javascript">
        $(function () {
            $("#griddiv").dialog({
                width: 1033,
                height: 155,
                autoOpen: false,
                autoScroll: false,
                resizable: false,
                position: {
                    my: "center top+400px",
                    at: "center"
                },
                show: {
                    effect: "blind",
                    duration: 200
                },
                hide: {
                    effect: "explode",
                    duration: 200
                },
                close: function (event, ui) {
                    map.graphics.clear();
                    takeback();

                }
            });
        });
        function start() {
            $("#griddiv").dialog("open");
        }

    </script>
    <script type="text/javascript">
        $(function () {
            $("#sle-appr").dialog({
                width: 300,
                height: 220,
                autoOpen: false,
                autoScroll: false,
                resizable: false,
                position: {
                    my: "right center",
                    at: "left+81.5%"
                },
                show: {
                    effect: "blind",
                    duration: 200
                },
                hide: {
                    effect: "explode",
                    duration: 200
                }
            });
        });
        function display() {
            $("#sle-appr").dialog("open");
        }
    </script>
    <script type="text/javascript">
        $(function () {
            $("#attribser").dialog({
                width: 235,
                height: 100,
                autoOpen: false,
                autoScroll: false,
                resizable: false,
                position: {
                    my: "right center",
                    at: "left+81.5%"
                },
                show: {
                    effect: "blind",
                    duration: 200
                },
                hide: {
                    effect: "explode",
                    duration: 200
                }
            });
        });
        function disp() {
            $("#attribser").dialog("open");
        }
    </script>
</head>
<body>
    <!-- use class="x-hide-display" to prevent a brief flicker of the content
    -->
     <form id="form1" runat="server">
    <div id="header" class="x-hide-display">
        <div id="masterhead">
            <div class="img"><img src="jqwidgets/icons/logo 1.jpg" alt="Logo" /></div>
           
             <div class="lgoutstyle">
              <asp:LinkButton ID="listuser" runat="server"  OnClick="lnk_listuser_Click" >User Accounts</asp:LinkButton>
             <asp:Label ID="lbllogged" runat="server" Font-Size="small" Width="200px" CssClass="loggedstyl"/>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
             <asp:LinkButton ID="lnk_changepassword" runat="server"  OnClick="lnk_changepassword_Click" >Change Password</asp:LinkButton>&nbsp&nbsp&nbsp
               <asp:LinkButton id="hlLogout" runat="server" OnClick="lnk_logout_Click">Logout</asp:LinkButton>
            </div></div></div>   
    <div id="center" class="x-hide-display" style="z-index: 100;">
    </div>
    <div id="props-panel" class="x-hide-display">
    </div>
    <div id="footer" class="x-hide-display">
       <div class="copyright"> Copyright &copy; 2014 Department Of Land Resources & Conservation All rights reserved.</div>
</div>
                <div id="north" class="x-hide-display">
                </div>
                <!-- All controls are placed in below div element-->
                <div id="Control" class="x-hide-display">
                    <h3 id="Control-h3">
                        Controls</h3>
                    <!-- Zoom in button-->
                    <button style="padding: 1px 1px; width: 35px;" id="zoomIn" onclick="return zoomIn_onclick()">
                        <img src="jqwidgets/icons/Zoom in.png" alt="zoom in" />
                    </button>&nbsp
                    <label onclick="return zoomIn_onclick()">
                        Zoom In</label>
                    <br />
                    <!-- Zoom out button-->
                    <button style="padding: 1px 1px; width: 35px;" id="ZoomOut" onclick="return ZoomOut_onclick()">
                        <img src="jqwidgets/icons/zoom out.png" alt="zoom out" />
                    </button>&nbsp
                    <label onclick="return ZoomOut_onclick()">
                        Zoom Out</label>
                    <br />
                    <!-- Zoom last button-->
                    <button style="padding: 1px 1px; width: 35px;" id="Zoomlast" onclick="return Zoomlast_onclick()">
                        <img src="jqwidgets/icons/Zoom last.png" alt="last" />
                    </button>&nbsp
                    <label onclick="return Zoomlast_onclick()">
                        Zoom Previous</label>
                    <br />
                    <!-- Full Extent button-->
                    <button style="padding: 1px 1px; width: 35px;" id="full" onclick="return full_onclick()">
                        <img src="jqwidgets/icons/extent.jpg" alt="last" />
                    </button>&nbsp
                    <label onclick="return full_onclick()">
                        Full Extent</label>
                    <br />
                    <!-- Pan button-->
                    <button style="padding: 1px 1px; width: 35px;" id="pan"
                            onclick="return pan_onclick()">
                        <img src="jqwidgets/icons/pan.png" alt="pan" />
                    </button>&nbsp
                    <label onclick="return pan_onclick()">
                        Pan</label>
                    <br />
                    <!-- Deactivate  button-->
                    <button style="padding: 1px 1px; width: 35px;" id="deactive" onclick="return deactive_onclick()">
                        <img src="jqwidgets/icons/deact.jpg" alt="deactiv" />
                    </button>&nbsp
                    <label onclick="return deactive_onclick()">Deactivate</label>
                    <br />
                    <!-- Identify on click-->
                    <button style="padding: 1px 1px; width: 35px;" id="bh" onclick="return identify_onclick()">
                        <img src="jqwidgets/icons/identify.gif" alt="i" />
                    </button>&nbsp
                    <label id="idShowPopup" onclick="return identify_onclick()">Enable Identify</label>
                    <br />
                    <!-- Select button-->
                    <button style="padding: 1px 1px; width: 35px;" id="select" onclick="return select_onclick()">
                        <img src="jqwidgets/icons/selectbox.png" alt="slct" />
                    </button>&nbsp
                    <label id="idSelect" onclick="return select_onclick()">
                        Enable Select</label>
                    <br />
                    <!-- Clear button-->
                    <button style="padding: 1px 1px; width: 35px;" id="clear" onclick="return clear_onclick()">
                        <img src="jqwidgets/icons/clear.gif" alt="clear" />
                    </button>&nbsp
                    <label onclick="return clear_onclick()">
                        Clear
                    </label>
                    <br />
                    <button style="padding: 1px 1px; width: 35px;" id="help" onclick="return help_onclick()">
                        <img src="jqwidgets/icons/help.jpg" alt="help" />
                    </button>&nbsp
                    <label onclick="return help_onclick()">
                        Help
                    </label>
                    <br/>

                    <button style="padding: 1px 1px; width: 35px;" id="refresh" onclick="return refresh_onclick()">
                        <img src="jqwidgets/icons/refresh.jpg" " alt="refresh" />
                    </button>&nbsp
                    <label onclick="return refresh_onclick()">
                        Refresh
                    </label>
                    <br />
                    </div>
                    <div id="measurementDiv"><div>
                        </div>

                        <!-- Content pane appearing on the right
                            Contains the accordion-->
                        <div id="idAccordionMaster" class="x-hide-display">
                            <!-- The accordion is here-->

                            <!-- Layers and legend-->
                            <div id="legend"></div>
                            <!-- Measure acordion tab-->

                            <div id="idSearch">
                                <div id="layer_list"></div>
                                <br/>
                                <div id="navBar">
                                    <div id="search">
                                        <input type="text" id="scheme" size="20" value=" " />
                                        <br />
                                        <br/>
                                        <%--Or
                                        <br/>
                                        <label>Name:</label>
                                        <input type="text" id="sschname" size="20" value=""/>
                                        <br />--%>
                                        <button style="padding: 0.5px 1px; width: 60px; height: 24px;" id="get" onclick="return get_onclick()">
                                            Search
                                        </button>
                                    </div>
                                    <hr/>
                                    <div id="info">Click on the radio button to <br/>select the layer you want to Query</div>
                                </div>
                            </div>
                        </div>
                        <!-- -->
                        <div id="idAccordionSelect"></div>
                    </div>
                    <!-- Grid div -->
                    <div id="griddiv" title="Results">
                        <div id="gddiv" style="height: 135px">
                            <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="grid" id="grid" data-dojo-props="rowsPerPage:'2', rowSelector:'20px'">
                                <thead>
                                    <tr>
                                        <th field="SCHEME">
                                            Scheme
                                        </th>
                                        <th field="REGION">
                                            Region
                                        </th>
                                        <th field="DISTRICT">
                                            District
                                        </th>
                                        <th field="CATCHMENT" width="102px">
                                            Catchment
                                        </th>
                                        <th field="ADD_" width="185px">
                                            Agricultural Development Division
                                        </th>
                                        <!-- 
                                            <th field="EPA" width="170px">
                                                Extension Planning Area
                                            </th>
                                        -->
                                        <th field="DESCRIPTION_OF_GPS_POINTS" width="130px" >
                                            Description
                                        </th>
                                        <th field="AREA_Ha_" width="125px" >
                                            Area(Ha)
                                        </th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                   
                    <!-- Tabs for the select by box-->
                    <div id="tabs" title="Results">
                        <div id="tabsDiv" class="tabs-bottom" class="x-hide-display">
                            <input type="radio" name='thing' value='valuable' data-id="tabsDiv-1" checked="checked"/>Catchments
                            &nbsp<input type="radio" name='thing' value='valuable' data-id="tabsDiv-2" />Irrigation Schemes
                            &nbsp<input type="radio" name='thing' value='valuable' data-id="tabsDiv-3"/>Land Use Land Cover
                            &nbsp<input type="radio" name='thing' value='valuable' data-id="tabsDiv-4" />Farmer Based Org
                            &nbsp<input type="radio" name='thing' value='valuable' data-id="tabsDiv-5" />Hotspots
                            &nbsp<input type="radio" name='thing' value='valuable' data-id="tabsDiv-6"/>Tank Bunds
                            <hr/>
                           

                             <div id="idDataGrids" class="x-hide-display">     </div>
                            <div id="tabsDiv-1" class="none">
                                <!-- 	Div for catchments		-->
                                <div id="grid0" title="Catchments" style="height: 110px" width="1010px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridj" id="gridj" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME" width="120px">
                                                    Scheme
                                                </th>
                                                <th field="REGION">
                                                    Region
                                                </th>
                                                <th field="DISTRICT">
                                                    District
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    Catchment
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    Agricultural Development Division
                                                </th>
                                                <th field="altitude_m" width="170px">
                                                    Extension Planning Areas
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    Description
                                                </th>
                                                <th field="area_ha" width="130px" >
                                                    Area(Ha)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div id="tabsDiv-2" class="none">
                                <!-- 	Div for Irrigation Schemes		-->
                                <div id="grid2" title="IrrigationSchemes" style="height:110px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridk" id="gridk" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME">
                                                    Scheme
                                                </th>
                                                <th field="REGION">
                                                    Region
                                                </th>
                                                <th field="DISTRICT">
                                                    District
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    Catchment
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    Agricultural Development Division
                                                </th>
                                                <th field="EPA" width="170px">
                                                    Extension Planning Areas
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    Description
                                                </th>
                                                <th field="AREA_Ha" width="130px" >
                                                    Area(ha)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div id="tabsDiv-3" class="none">
                                <!-- 	Div for LULC		-->
                                <div id="grid3" title="LULC" style="height: 110px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridq" id="gridq" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME">
                                                    Scheme
                                                </th>
                                                <th field="REGION">
                                                    Region
                                                </th>
                                                <th field="DISTRICT">
                                                    District
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    Catchment
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    Agricultural Development Division
                                                </th>
                                                <th field="EPA" width="170px">
                                                    Extension Planning Areas
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    Description
                                                </th>
                                                <th field="AREA_Ha" width="130px" >
                                                    Area(Ha)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div id="tabsDiv-4">
                                <!-- 	Div for FBO		-->
                                <div id="grid4" title="FBO" style="height: 110px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridm" id="gridm" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME">
                                                    SCHEME
                                                </th>
                                                <th field="REGION">
                                                    REGION
                                                </th>
                                                <th field="DISTRICT">
                                                    DISTRICT
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    CATCHMENT
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    AGRICULTURAL DEVELOPMENT DIVISION
                                                </th>
                                                <th field="altitude_m" width="170px">
                                                    EXTENSION PLANNING AREAS
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    DESCRIPTION
                                                </th>
                                                <th field="AREA_Ha" width="130px" >
                                                    AREA(hectare)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div id="tabsDiv-5">
                                <!-- 	Div for Hotspots		-->
                                <div id="grid5" title="Hotspots" style="height: 110px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridn" id="gridn" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME">
                                                    Scheme
                                                </th>
                                                <th field="REGION">
                                                    Region
                                                </th>
                                                <th field="DISTRICT">
                                                    District
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    Catchment
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    Agricultural Development Division
                                                </th>
                                                <th field="EPA" width="170px">
                                                    Extension Planning Areas
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    Description
                                                </th>
                                                <th field="AREA_Ha" width="130px" >
                                                    Area(Ha)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                            <div id="tabsDiv-6">
                                <!-- 	Div for Hotspots		-->
                                <div id="grid6" title="Tank bunds" style="height: 110px">
                                    <table data-dojo-type="dojox.grid.DataGrid" data-dojo-id="gridp" id="gridp" data-dojo-props="rowsPerPage:'3', rowSelector:'20px'">
                                        <thead>
                                            <tr>
                                                <th field="SCHEME">
                                                    Scheme
                                                </th>
                                                <th field="REGION">
                                                    Region
                                                </th>
                                                <th field="DISTRICT">
                                                    District
                                                </th>
                                                <th field="CATCHMENT" width="102px">
                                                    Catchment
                                                </th>
                                                <th field="ADD_Name" width="185px">
                                                    Agricultural Development Division
                                                </th>
                                                <th field="EPA" width="170px">
                                                    Extension Planning Areas
                                                </th>
                                                <th field="DESCRIPTION" width="130px" >
                                                    Description
                                                </th>
                                                <th field="AREA_Ha" width="130px" >
                                                    Area(Ha)
                                                </th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div id="sel_list"> </div>
                        <div id="sle-appr" title="Fields">
                            <input type="radio" name="g1" value="SCHEME" onclick=" loadfield(this.value);" />
                            Scheme
                            <br/>
                            <input type="radio" name="g1" value="REGION" onclick=" loadfield(this.value);" />
                            Region
                            <br/>
                            <input type="radio" name="g1" value="DISTRICT" onclick=" loadfield(this.value);" />
                            District
                            <br/>
                            <input type="radio" name="g1" value="CATCHMENT" onclick=" loadfield(this.value);" />
                            Catchment
                            <br/>
                            <input type="radio" name="g1" value="ADD_" onclick=" loadfield(this.value);" />
                            Agricultural Development Division
                            <br/>
                            <input type="radio" name="g1" value="EPA" onclick=" loadfield(this.value);" />
                            Extension Planning Areas
                            <br/>
                            <input type="radio" name="g1" value="GPS_WAY_POINTS" onclick=" loadfield(this.value);" />
                            Description
                            <br/>
                            <input type="radio" name="g1" value="ALTITUDE__m_" onclick=" loadfield(this.value);" />
                            Altitude
                            <br/>
                        </div>
                        </div>
                        <div id="attribser">
                            <input type="text" id="attrib" size="15" value="Limphasa" />
                            <button style="padding: 0.5px 1px; width: 56px; height: 24px;" id="serattrib" onclick="return serattrib_onclick()">
                                Search
                            </button>
                        </div>
                </form>
</body>
</html> 
