using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using MySql.Data.MySqlClient;

    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            txtUserName.Focus();
        }
        private bool checpass()
        {
            if (txtUserName.Text == "" || txtPWD.Text == "")
            {
                if (txtUserName.Text == "")
                {
                    rfvUser.Enabled = true;
                }
                if (txtPWD.Text == "")
                {
                    rfvPWD.Enabled = true;
                }
                if (txtPWD.Text.Length != 4 || txtPWD.Text.Length != 8)
                {
                    revpwds.Enabled = true;
                }
                return false;
            }
            else
            {
                return true;
            }
        }

        protected void btnSubmit_Click(object sender, EventArgs e)
        {
            checpass();
            MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString);
            con.Open();
            MySqlCommand cmd = new MySqlCommand("select * from nduser where usrname =@username and passwrd=@password", con);

            byte[] lopassBytes = System.Text.Encoding.Unicode.GetBytes(txtPWD.Text);
            string loencryptPass = Convert.ToBase64String(lopassBytes);
            cmd.Parameters.AddWithValue("@username", txtUserName.Text.ToLower());
            cmd.Parameters.AddWithValue("@password", loencryptPass);
            MySqlDataAdapter da = new MySqlDataAdapter(cmd);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                Session["loggedIn"] = true;
                Session["username"]=txtUserName.Text.ToUpper();
                Response.Redirect("./dlrc/dlrc.aspx");
            }
            else
            {
                ClientScript.RegisterStartupScript(Page.GetType(), "validation", "<script language='javascript'>alert('Invalid Username and Password')</script>");
            }
        }
    }
