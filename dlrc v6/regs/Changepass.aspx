<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Changepass.aspx.cs" Inherits="regs_Changepass" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
   <title>Change password</title>
   <style type="text/css"> 
   #chgmain
        {
            width: 425px;
	        height: 170px;
	        background-color: #87CEEB;
	        position: absolute;
	        top:0;
	        bottom: 0;
	        left: 0;
	        right: 0;
	        margin: auto;
            border:2px solid;
            border-radius:20px;
            text-align:center;
            padding-top:25px;
        }
        .clblsty
        {
            text-align:left;
            padding-left:3px;
        }
        .Btnupdate {
    width:62px;
    height:25px;
    border:2px solid;
    border-radius: 10px;
    text-align:center;
    font-weight:bold;
    border-color:#778899;
    background-color:#CCFF99;   
}
        </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="chgmain">
    <div style="margin-bottom:10px"> 
        <asp:Label ID="Label1" runat="server" Text="Current password" Width="150px" 
            Font-Bold="True" ForeColor="#000000" CssClass="clblsty"></asp:Label>
        <asp:TextBox ID="txt_cpassword" runat="server" TextMode="Password" width="160"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator1" runat="server" 
            ControlToValidate="txt_cpassword" 
            ErrorMessage="Required*" ForeColor="Red"></asp:RequiredFieldValidator>
        </div>
         <div style="margin-bottom:10px"> 
         <asp:Label ID="Label2" runat="server" Text="New password" Width="150px" 
            Font-Bold="True" ForeColor="#000000" CssClass="clblsty"></asp:Label>
        <asp:TextBox ID="txt_npassword" runat="server" TextMode="Password" width="160"></asp:TextBox>
        <asp:RequiredFieldValidator ID="RequiredFieldValidator2" runat="server" 
            ControlToValidate="txt_npassword" ErrorMessage="Required*" ForeColor="Red"></asp:RequiredFieldValidator><br/>
            <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "txt_npassword" ID="rgnpaswd" ValidationExpression = "^[\s\S]{4,8}$" runat="server" ErrorMessage="A min of 4 or max of 8 characters Required" ForeColor="Blue" Font-Size="small"></asp:RegularExpressionValidator>
        </div>
         <div style="margin-bottom:10px"> 
         <asp:Label ID="Label3" runat="server" Text="Confirm password" Width="150px" 
            Font-Bold="True" ForeColor="#000000" CssClass="clblsty"></asp:Label>

        <asp:TextBox ID="txt_ccpassword" runat="server" TextMode="Password" width="160"></asp:TextBox>   

        <asp:RequiredFieldValidator ID="RequiredFieldValidator3" runat="server" 
            ControlToValidate="txt_ccpassword" 
            ErrorMessage="Required*" ForeColor="Red"></asp:RequiredFieldValidator>

        <asp:CompareValidator ID="CompareValidator1" runat="server" 
            ControlToCompare="txt_npassword" ControlToValidate="txt_ccpassword" 
            ErrorMessage="Password Mismatch" ForeColor="blue"></asp:CompareValidator>    
    </div>
     <div style="margin-bottom:10px"> 
    <asp:Button ID="btn_update" runat="server" onclick="btn_update_Click" Text="Update" CssClass="Btnupdate" />
    <asp:Label ID="lbl_msg" Font-Bold="True" BackColor="#FFFF66" ForeColor="#FF3300" runat="server" Text=""></asp:Label>&nbsp&nbsp&nbsp
    <asp:HyperLink ID="HyperLink1" runat="server" NavigateUrl="~/Default.aspx">Login</asp:HyperLink>
    </div>
    </div>
    </form>
</body>
</html>