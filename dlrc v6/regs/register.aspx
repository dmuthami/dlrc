<%@ Page Language="C#" AutoEventWireup="true" CodeFile="register.aspx.cs" Inherits="register" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>User Registration</title>
    <style type="text/css">
    #regmain
        {
            width: 500px;
	        height: 353px;
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
        }
        .Btnreg {
    width:70px;
    height:25px;
    border:2px solid;
    border-radius: 10px;
    text-align:center;
    border-color:#778899;
    background-color:#BEBEBE;   
}
.Btnlog {
    width:60px;
    height:25px;
    border:2px solid;
    border-radius: 10px;
    text-align:center;
    border-color:#778899;
    background-color:#BEBEBE;   
}
#htitle
{
    text-align:center;
    padding-top:15px;
    font-weight:bold;
    font-family:Cambria;
}
.txtstyle
{
    border-style:none;
    height:20px;
}
#lbdstyl
{
    padding-top:3px;
    padding-bottom:3px;
}
        #form1
        {
            width: 463px;
        }
        .reglbls
        {
            text-align:left;
            padding-left:3px;
            
            
        }
    </style>
</head>
<body style="width: 469px; height: 24px">
    <form id="form1" runat="server">
    
    <div id="regmain">
    <div id="htitle">
        Register a New User
    </div>
    <div id="lbdstyl">
           <asp:Label ID="lblmsg" runat="server" ForeColor="Blue" Font-Bold="true"></asp:Label>&nbsp
            </div>
      <div style="margin-bottom:10px">
         <asp:Label ID="lblfirstnm" runat="server" Width="128px" CssClass="reglbls">First Name:</asp:Label>
        <asp:TextBox ID="txtFirstName" runat="server" width="250px" CssClass="txtstyle" /> 
        <asp:RequiredFieldValidator ID="rfvFirstName" runat="server" ControlToValidate="txtFirstName" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator>
      </div>
          <div style="margin-bottom:10px">
         <asp:Label ID="Label5" runat="server" Width="128px" CssClass="reglbls">Second Name:</asp:Label>
        <asp:TextBox ID="txtsecndName" runat="server" width="250px" CssClass="txtstyle"/> 
        <asp:RequiredFieldValidator ID="rfvScnd" runat="server" ControlToValidate="txtsecndName" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator>
      </div>  
          <div style="margin-bottom:10px">
         <asp:Label ID="Label6" runat="server" Width="128px" CssClass="reglbls">Email:</asp:Label>
        <asp:TextBox ID="txtemail" runat="server" width="250px" CssClass="txtstyle"/> 
        <asp:RequiredFieldValidator ID="rfvem" runat="server" ControlToValidate="txtemail" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator><br/>
      <asp:RegularExpressionValidator ID="RegularExpressionValidator1" runat="server" ErrorMessage="Invalid email address"    ControlToValidate="txtemail" 
    ValidationExpression="\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*" Display="Dynamic" ForeColor="Blue" Font-Size="small">
</asp:RegularExpressionValidator>
      </div>    
        <div style="margin-bottom:10px">
            <asp:Label ID="Label1" runat="server" Width="128px" CssClass="reglbls">User name</asp:Label>
                <asp:TextBox runat="server" ID="UserName" width="250px" 
                CssClass="txtstyle"/> 
   <asp:RequiredFieldValidator ID="rfvusr" runat="server" ControlToValidate="UserName" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator><br/>
   <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "UserName" ID="rgvusr" ValidationExpression = "^[\s\S]{4,8}$" runat="server" ErrorMessage="A max of 8 characters allowed" ForeColor="Blue" Font-Size="small"></asp:RegularExpressionValidator>
        </div>

        <div style="margin-bottom:10px">
            <asp:Label ID="Label2" runat="server" Width="128px" CssClass="reglbls">Password:</asp:Label>
                <asp:TextBox runat="server" ID="Password" TextMode="Password" width="250px" CssClass="txtstyle"/>
       <asp:RequiredFieldValidator ID="rfvpss" runat="server" ControlToValidate="Password" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator><br/>
       <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "Password" ID="rgvpaswd" ValidationExpression = "^[\s\S]{4,8}$" runat="server" ErrorMessage="A min of 4 or max of 8 characters Required" ForeColor="Blue" Font-Size="small"></asp:RegularExpressionValidator>
            </div>
        <div style="margin-bottom:10px">
            <asp:Label ID="Label3" runat="server" Width="128px" CssClass="reglbls">Confirm password:</asp:Label>&nbsp
                <asp:TextBox runat="server" ID="ConfirmPassword" TextMode="Password" width="250px" CssClass="txtstyle"/>
                <asp:RequiredFieldValidator ID="rfvcf" runat="server" ControlToValidate="ConfirmPassword" ErrorMessage="Required" SetFocusOnError="True" ForeColor="Red">Required* </asp:RequiredFieldValidator><br />
            <asp:CompareValidator id="comparePasswords" runat="server" ControlToCompare="Password" ControlToValidate="ConfirmPassword" ErrorMessage="Password did not match!"
             Display="Dynamic" ForeColor="Blue"/>
            </div>
        <div>
            <div>
                <asp:Button ID="Button1" runat="server" OnClick="CreateUser_Click" Text="Register" CssClass="Btnreg"/>
                &nbsp&nbsp&nbsp
                <asp:Button ID="log" runat="server" Text="Login" onclick="log_Click" CausesValidation="False" cssClass="Btnlog"/>
            </div>
        </div></div>
    </form>
</body>
</html>