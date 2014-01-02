using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Data.SqlClient;
using System.Text;
using MySql.Data.MySqlClient;

public partial class regs_reset : System.Web.UI.Page
{
    private string code;
    protected void Page_Load(object sender, EventArgs e)
    {
        txt_pwd.Focus();
        code = Request.QueryString["code"];

        using (MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString))
        {
            con.Open();
            if (con.State == ConnectionState.Closed)
            {
                con.Open();
            }
            try
            {

                MySqlDataAdapter adp = new MySqlDataAdapter("select usrname,Email,code from nduser where code=@code )", con);
                adp.SelectCommand.Parameters.AddWithValue("@code", code);

                DataTable dt = new DataTable();
                adp.Fill(dt);
                if (dt.Rows.Count == 0)
                {

                    Pane_image.Visible = true;
                    Panel_reset_pwd.Visible = false;

                    return;
                }
                else
                {
                    Pane_image.Visible = false;
                    Panel_reset_pwd.Visible = true;

                }
            }
            catch
            {

            }
            finally
            {

            }
        }
    }
    private bool checkreset()
    {
        if (txt_pwd.Text == "" || txt_retype_pwd.Text == "")
        {
            if (txt_pwd.Text == "")
            {
                rfvpass.Enabled = true;
            }
            if (txt_retype_pwd.Text == "")
            {
                rfvretpwd.Enabled = true;
            }
            if (txt_pwd.Text != txt_retype_pwd.Text)
            {
                cmvpwd.Enabled = true;
            }
            if (txt_pwd.Text.Length != 4 || txt_pwd.Text.Length != 8)
            {
                rcvretpwd.Enabled = true;
            }
            return false;
        }
        else
        {
            return true;
        }
    }
 
            protected void btn_change_pwd_Click(object sender, EventArgs e){
                checkreset();
        if (string.Equals(txt_pwd.Text, txt_retype_pwd.Text))
        {
            using (MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString))
            {
                if (con.State == ConnectionState.Closed)
                { con.Open(); }
                try
                {

                    MySqlCommand cmd = new MySqlCommand("update nduser set code='',passwrd=@pwd where   code=@code", con);
                    byte[] rpassBytes = System.Text.Encoding.Unicode.GetBytes(txt_pwd.Text);
                    string resPass = Convert.ToBase64String(rpassBytes);
                    
                    cmd.Parameters.AddWithValue("@pwd", resPass);

                    cmd.Parameters.AddWithValue("@code", Request.QueryString["code"].ToString());

                    cmd.ExecuteNonQuery();
                    cmd.Dispose();
                    lbl_msg.Text = "Your Password has been Changed successfully";
                    txt_pwd.Text = "";
                    txt_retype_pwd.Text = "";
                    Response.Redirect("~/Default.aspx");
                }
                catch
                {

                }

            }
        }
    }
}