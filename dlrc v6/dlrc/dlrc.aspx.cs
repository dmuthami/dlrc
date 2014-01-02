using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.Security;
public partial class dlrc_dlrc : System.Web.UI.Page
{
    protected override void OnPreInit(EventArgs e)
    {
        bool loggedIn = Session["loggedIn"] == null ? false : (bool)Session["loggedIn"];
        if (!loggedIn)
        {
            Response.Redirect("~/Default.aspx");
        }
        base.OnPreInit(e);
        
    }
    protected void Page_Load(object sender, EventArgs e)
    {
        
        lbllogged.Text = "WELLCOME :: " + Session["username"].ToString();
        Request.Cookies.Clear();
        Response.Cache.SetCacheability(HttpCacheability.NoCache);
        Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
        Response.Cache.SetNoStore();
        string usr=Session["username"].ToString();
        if (usr == "ADMIN" || usr == "ADMINISTRATOR")
        {
            listuser.Visible = true;
        }
        else
        {
            listuser.Visible = false;
        }

    }
    protected void lnk_changepassword_Click(object sender, EventArgs e)
    {
        Response.Redirect("/dlrc/regs/Changepass.aspx");
    }
    protected void lnk_logout_Click(object sender, EventArgs e)
    {
        FormsAuthentication.SignOut();
        Session.Abandon();
        Session.Clear();
        Response.Redirect("~/Default.aspx");
    }
    protected void lnk_listuser_Click(object sender, EventArgs e)
    {
        Response.Redirect("/dlrc/regs/userAccounts.aspx");
    }
}