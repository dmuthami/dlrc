<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Login</title>
    <style type="text/css">
        
        #lhead
        {
            background-color:#157fcc;
            width:230px;
        }
        #usr
        {
            padding-top:2;
            padding-bottom:5px;  
        }
        
        
        #dmain
        {
            width: 430px;
	        height: 162px;
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
   .BtnStyle {
    width:60px;
    height:25px;
    background-color:#BEBEBE;
    border:2px solid;
    border-color:#778899;    
    border-radius: 10px;
    text-align:center;
}
        #form1
        {
            width: 383px;
        }
        .txtdstyle
{
    border-style:none;
    height:20px;
    
}

    </style>
</head>
<body style="width: 383px; height: 19px">
    <form id="form1" runat="server">
    <div id="dmain">
   <br/>
   <br/>
         <div style="margin-bottom:5px">
                    &nbsp&nbsp<asp:Label ID="usr" runat="server" Text="Username:" Font-Size="Larger" Width="105px"></asp:Label>
                    &nbsp<asp:TextBox ID="txtUserName" runat="server" width="175px" CssClass="txtdstyle" />&nbsp
                    <asp:RequiredFieldValidator ID="rfvUser" ErrorMessage=" Required!" ControlToValidate="txtUserName" runat="server" ForeColor="Red"/>
         </div>
         <div style="margin-bottom:10px">
         
                    &nbsp&nbsp<asp:Label ID="psr" runat="server" Text="Password:" Font-Size="Larger" Width="105px"></asp:Label>
                    &nbsp<asp:TextBox ID="txtPWD" runat="server" TextMode="Password" width="175px" CssClass="txtdstyle"/>&nbsp
                    <asp:RequiredFieldValidator ID="rfvPWD" runat="server" ControlToValidate="txtPWD" ErrorMessage=" Required!" ForeColor="Red" /><br/>
                    <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "txtPWD" 
                    ID="revpwds" ValidationExpression = "^[\s\S]{4,8}$" runat="server" ErrorMessage="A min 4 and max 8 characters Required"
                     ForeColor="Blue" Font-Size="Medium"></asp:RegularExpressionValidator>
         </div>
                        
         <div style="margin-bottom:10px">
         <a href="regs/register.aspx"style="color:#228B22">Register</a>&nbsp&nbsp<a href="regs/Forgotpass.aspx" style="color:#0000CD">Forgot password?</a>&nbsp&nbsp
                    <asp:Button ID="btnSubmit" runat="server" Text="Login" CssClass="BtnStyle" OnClick="btnSubmit_Click" />
                            
        </div>
        </div>                
    </form>
</body>
</html>
