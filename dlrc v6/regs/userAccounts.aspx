<%@ Page Language="C#" AutoEventWireup="true" CodeFile="userAccounts.aspx.cs" Inherits="regs_userAccounts" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Accounts</title>

    <style type="text/css">
    .BtnStyle {
    width:60px;
    height:25px;
    background-color:#BEBEBE;
    border:2px solid;
    border-color:#778899;    
    border-radius: 10px;
    text-align:center;
}
 #accmain
        {
            width:800px;
	        height:auto;
	        background-color: white;
	        position:relative;
	        top:0;
	        bottom: 0;
	        left: 0;
	        right: 0;
	        margin: auto;
            text-align:center;
        }
        
    </style>
    <script type = "text/javascript">
<!--
         function Check_Click(objRef) {
             //Get the Row based on checkbox
             var row = objRef.parentNode.parentNode;

             //Get the reference of GridView
             var GridView = row.parentNode;

             //Get all input elements in Gridview
             var inputList = GridView.getElementsByTagName("input");

             for (var i = 0; i < inputList.length; i++) {
                 //The First element is the Header Checkbox
                 var headerCheckBox = inputList[0];

                 //Based on all or none checkboxes
                 //are checked check/uncheck Header Checkbox
                 var checked = true;
                 if (inputList[i].type == "checkbox" && inputList[i] != headerCheckBox) {
                     if (!inputList[i].checked) {
                         checked = false;
                         break;
                     }
                 }
             }
             headerCheckBox.checked = checked;

         }
         function checkAll(objRef) {
             var GridView = objRef.parentNode.parentNode.parentNode;
             var inputList = GridView.getElementsByTagName("input");
             for (var i = 0; i < inputList.length; i++) {
                 var row = inputList[i].parentNode.parentNode;
                 if (inputList[i].type == "checkbox" && objRef != inputList[i]) {
                     if (objRef.checked) {
                         inputList[i].checked = true;
                     }
                     else {
                         if (row.rowIndex % 2 == 0) {
                             row.style.backgroundColor = "#0000CD";
                         }
                         else {
                             row.style.backgroundColor = "white";
                         }
                         inputList[i].checked = false;
                     }
                 }
             }
         }
</script>
<script type = "text/javascript">
    function ConfirmDelete() {
        var count = document.getElementById("<%=hfCount.ClientID %>").value;
        var gv = document.getElementById("<%=gvAll.ClientID%>");
        var chk = gv.getElementsByTagName("input");
        for (var i = 0; i < chk.length; i++) {
            if (chk[i].checked && chk[i].id.indexOf("chkAll") == -1) {
                count++;
            }
        }
        if (count == 0) {
            alert("No records to delete.");
            return false;
        }
        else {
            return confirm("Do you want to delete " + count + " records.");
        }
    }
</script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="accmain">
  
    <asp:GridView ID="gvAll" runat="server"
    AutoGenerateColumns = "false" Font-Names = "Arial"
    Font-Size = "11pt" AlternatingRowStyle-BackColor = "#87CEFA" 
    HeaderStyle-BackColor = "#4169E1" AllowPaging ="true"  
    OnPageIndexChanging = "OnPaging" DataKeyNames = "usrid"
    PageSize = "10" >
   <Columns>
    <asp:TemplateField>
       <HeaderTemplate>
            <asp:CheckBox ID="chkAll" runat="server" onclick = "checkAll(this);" />
        </HeaderTemplate> 
        <ItemTemplate>
            <asp:CheckBox ID="chk" runat="server" onclick = "Check_Click(this)"/>
        </ItemTemplate>
    </asp:TemplateField>
    <asp:BoundField ItemStyle-Width = "150px" DataField = "usrid" HeaderText = "User Id"/>
    <asp:BoundField ItemStyle-Width = "150px" DataField = "ufirstname" HeaderText = "First Name"/>
    <asp:BoundField ItemStyle-Width = "150px" DataField = "usecondname" HeaderText = "Second Name"/>
        <asp:BoundField ItemStyle-Width = "150px" DataField = "Email" HeaderText = "Email"/>
        <asp:BoundField ItemStyle-Width = "150px" DataField = "usrname" HeaderText = "User Name"/>
   </Columns>
   <AlternatingRowStyle BackColor="#87CEFA"  />
</asp:GridView>
<asp:HiddenField ID="hfCount" runat="server" Value = "0" />
<br />
<asp:Button ID="btnDelete" runat="server" Text="Delete"
   OnClientClick = "return ConfirmDelete();" OnClick="btnDelete_Click" CssClass="BtnStyle" />
    </div>
    </form>
</body>
</html>
