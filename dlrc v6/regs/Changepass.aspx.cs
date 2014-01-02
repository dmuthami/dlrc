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
using MySql.Data.MySqlClient;
public partial class regs_Changepass : System.Web.UI.Page
{
    string str = null;
    MySqlCommand com;
    byte up;

    protected void Page_Load(object sender, EventArgs e)
    {
        txt_cpassword.Focus();
    }
    private bool chgpass()
    {

        if (txt_cpassword.Text == "" || txt_npassword.Text == "" || txt_ccpassword.Text == "")
        {
            if (txt_cpassword.Text == "")
            {
                RequiredFieldValidator1.Enabled = true;
            }
            if (txt_npassword.Text == "")
            {
                RequiredFieldValidator2.Enabled = true;
            }
            if (txt_ccpassword.Text == "")
            {
                RequiredFieldValidator3.Enabled = true;
            }
            if (txt_npassword.Text != txt_ccpassword.Text)
            {
                CompareValidator1.Enabled = true;
            }
            if (txt_npassword.Text.Length != 4 || txt_npassword.Text.Length != 8)
            {
                rgnpaswd.Enabled = true;
            }
            return false;
        }
        else
        {
            return true;
        }
    }
    protected void btn_update_Click(object sender, EventArgs e)
    {
        chgpass();
        using (MySqlConnection con = new MySqlConnection(ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString))
        {
            try
            {
                con.Open();
                str = "select * from nduser ";
                com = new MySqlCommand(str, con);
                MySqlDataReader reader = com.ExecuteReader();
                while (reader.Read())
                {
                    byte[] currntgpassBytes = System.Text.Encoding.Unicode.GetBytes(txt_cpassword.Text);
                    string currentPass = Convert.ToBase64String(currntgpassBytes);

                    if (currentPass == reader["passwrd"].ToString())
                    {
                        up = 1;
                    }
                }
                reader.Close();
                con.Close();
                if (up == 1)
                {
                    con.Open();
                    str = "update nduser set passwrd=@Password where usrname='" + Session["username"].ToString() + "'";
                    com = new MySqlCommand(str, con);
                    com.Parameters.Add(new MySqlParameter("@Password", MySqlDbType.VarChar, 50));

                    byte[] chgpassBytes = System.Text.Encoding.Unicode.GetBytes(txt_npassword.Text);
                    string chresPass = Convert.ToBase64String(chgpassBytes);

                    com.Parameters["@Password"].Value = chresPass;
                    com.ExecuteNonQuery();
                    con.Close();
                    lbl_msg.Text = "Password changed Successfully";
                }
                else
                {
                    lbl_msg.Text = "Please enter correct Current password";
                }
            }
            catch (MySqlException ex)
            {
                string errorMessage = "Error in changing password";
                errorMessage += ex.Message;
                throw new Exception(errorMessage);
            }
            finally
            {
                con.Close();
            }
        }
    }
}