<%@ Page Language="C#" AutoEventWireup="true" CodeFile="reset.aspx.cs" Inherits="regs_reset" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Change Your Password</title>
    <style type="text/css">
       #rstmain
        {
            width: 450px;
	        height: 170px;
	        background-color: white;
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
        .Btnchngpass {
            width:130px;
            height:25px;
            border:2px solid;
            border-radius: 10px;
            text-align:center;
            }
    </style>
</head>
<body>
    <form id="form1" runat="server">
    <div id="rstmain">
        <asp:Panel ID="Pane_image" runat="server" Visible="true">
            <%--here you can set image according to your requirement--%>
        </asp:Panel>
        <asp:Panel ID="Panel_reset_pwd" runat="server" Visible="true">
        <br />
             <div style="margin-bottom:10px">
                        Enter Your New Password:&nbsp
                        <asp:TextBox ID="txt_pwd" runat="server" TextMode="Password" Width="150px"></asp:TextBox>&nbsp
                        <asp:RequiredFieldValidator ID="rfvpass" runat="server" ControlToValidate="txt_pwd"
                            ErrorMessage="Reqired*" Font-Size="Medium" ForeColor="Red" set></asp:RequiredFieldValidator><br/>
                        <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "txt_pwd" ID="rgvpawrd" ValidationExpression = "^[\s\S]{4,8}$" runat="server"
                         ErrorMessage="A min 4 and max 8 characters Required" ForeColor="Blue" Font-Size="Medium"></asp:RegularExpressionValidator>
                   </div>
                   <div style="margin-bottom:10px">
                       &nbsp Retype Password:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
                        <asp:TextBox ID="txt_retype_pwd" runat="server" TextMode="Password" Width="150px"></asp:TextBox>&nbsp
                        <asp:RequiredFieldValidator ID="rfvretpwd" runat="server" ControlToValidate="txt_retype_pwd" Font-Size="Medium"
                             ForeColor="Red" ErrorMessage="Required*"></asp:RequiredFieldValidator>
                        <asp:CompareValidator ID="cmvpwd" runat="server" ControlToCompare="txt_pwd"
                            ControlToValidate="txt_retype_pwd" ErrorMessage="Password Mismatch" Font-Size="Medium" 
                            ForeColor="#CD0000"></asp:CompareValidator><br/>
                        <asp:RegularExpressionValidator Display = "Dynamic" ControlToValidate = "txt_retype_pwd" ID="rcvretpwd"
                         ValidationExpression = "^[\s\S]{4,8}$" runat="server" ErrorMessage="A min 4 and max 8 characters Required" 
                         ForeColor="Blue" Font-Size="Medium"></asp:RegularExpressionValidator>
                    </div>

                    <div>
                        <asp:Button ID="btn_change_pwd" runat="server" OnClick="btn_change_pwd_Click" Text="Change Password" cssClass="Btnchngpass"/>
                    </div>
                    <div>
                        <asp:Label ID="lbl_msg" runat="server"></asp:Label>
                    </div>
        </asp:Panel>
    </div>
    </form>
</body>
</html>
