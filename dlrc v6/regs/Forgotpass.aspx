<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Forgotpass.aspx.cs" Inherits="regs_Forgotpass" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Code to recover forgot password in asp.net using C# and VB.NET</title>
    <style type="text/css">
           #fmain
        {
            width: 400px;
	        height: 143px;
	        background-color: #87CEEB;
	        position: absolute;
	        top:0;
	        bottom: 0;
	        left: 0;
	        right: 0;
	        margin: auto;
            border:4px solid;
            border-color:#1E90FF;
            border-radius:20px;
            text-align:center;
        }
        #errsty
        {
            padding-left:70px;
            font-size:small;
            color:Red;
            margin-bottom:10px;
            text-align:center;
        }
         .Btnsub {
            width:60px;
            height:25px;
            background-color:#BEBEBE;
            border:2px solid;
            border-color:#778899;    
            border-radius: 10px;
            text-align:center;            
            }
            #ftitle
            {
                margin-bottom:8px;
                text-align:center;
                font-weight:bold;
                font-family:Cambria;
            }
            .txtstyl
            {
                border-style:none;
                height:20px;
            }
                
</style>
</head>
<body>
<form id="form1" runat="server">
<div id="fmain"> 
<br/>
<div id="ftitle">Forgot Password</div>
<div style="margin-bottom:5px">
     <asp:Label ID="lblEmail" runat="server" Text="Email Address: "/>
     <asp:TextBox ID="txtEmail" runat="server" Width="240px" CssClass="txtstyl"></asp:TextBox><br />
     </div>
     <div id="errsty">
     <asp:RequiredFieldValidator ID="RfVfem" runat="server" ControlToValidate="txtEmail" ErrorMessage=" Please enter Email ID" /><br />
     <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Invalid email address"    ControlToValidate="txtEmail" 
    ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic" ForeColor="Blue" Font-Size="small">
</asp:RegularExpressionValidator>
     </div>
     <div style="margin-bottom:0px">
    <asp:Button ID="btnPass" runat="server" Text="Submit" onclick="btnPass_Click" CssClass="Btnsub"/>&nbsp&nbsp
    <asp:Button ID="btflogin" runat="server" Text="login" OnClick="btnfog_click" 
             CausesValidation="False" CssClass="Btnsub"/>
     </div>
    <div>           
    <asp:Label ID="lblMessage" runat="server" Text="" />
    </div></div>
</form>
</body>
</html>