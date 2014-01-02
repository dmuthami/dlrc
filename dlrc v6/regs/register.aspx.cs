using System;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using MySql.Data.MySqlClient;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
public partial class register : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        txtFirstName.Focus();
    }
    private void clear()
    {
        txtFirstName.Text = "";
        txtemail.Text = "";
        txtsecndName.Text = "";
        UserName.Text = "";

    }

    protected void CreateUser_Click(object sender, EventArgs e)
    {


        chckusr();
    }
    protected void log_Click(object sender, EventArgs e)
    {
        Response.Redirect("~/Default.aspx");

    }
    public void chckusr()
    {
        string connectionString = ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString;
        MySqlConnection con = new MySqlConnection(connectionString);
        con.Open();
        MySqlCommand cmd = new MySqlCommand("select*from nduser where usrname='" + UserName.Text + "'", con);
        MySqlDataReader dr = cmd.ExecuteReader();

        if (dr.Read())
        {
            lblmsg.Text = "User Name is Already in use";
            UserName.Focus();

        }
        else
        {
            Register();

        }
        con.Close();
    }


    public void Register()
    {
        string connectionString = ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString;
        string insertSql = "INSERT INTO nduser (ufirstname,usecondname,Email,usrname,passwrd,userprivilledge)"
        + " values (@FirstName,@secondname,@email,@UserName,@Password,@userpri)";
        //Create SQL connection
        MySqlConnection con = new MySqlConnection(connectionString);

        //Create SQL Command And Sql Parameters
        MySqlCommand cmd = new MySqlCommand();
        cmd.Connection = con;
        cmd.CommandType = CommandType.Text;
        cmd.CommandText = insertSql;

        MySqlParameter frst = new MySqlParameter("@FirstName", MySqlDbType.VarChar, 50);
        frst.Value = txtFirstName.Text.ToString();
        cmd.Parameters.Add(frst);

        MySqlParameter scnd = new MySqlParameter("@secondname", MySqlDbType.VarChar, 50);
        scnd.Value = txtsecndName.Text.ToString();
        cmd.Parameters.Add(scnd);

        MySqlParameter em = new MySqlParameter("@email", MySqlDbType.VarChar, 50);
        em.Value = txtemail.Text.ToString();
        cmd.Parameters.Add(em);

        MySqlParameter usrnm = new MySqlParameter("@UserName", MySqlDbType.VarChar, 100);
        usrnm.Value = UserName.Text.ToString();
        cmd.Parameters.Add(usrnm);

        MySqlParameter pwd = new MySqlParameter("@Password", MySqlDbType.VarChar, 100);
        byte[] passBytes = System.Text.Encoding.Unicode.GetBytes(Password.Text);
        string encryptPass = Convert.ToBase64String(passBytes);
        pwd.Value = encryptPass;
        cmd.Parameters.Add(pwd);

        MySqlParameter userpriv = new MySqlParameter("@userpri", MySqlDbType.VarChar, 40);
        userpriv.Value = "user";
        cmd.Parameters.Add(userpriv);

        try
        {
            con.Open();
            cmd.ExecuteNonQuery();
            lblmsg.Text = "User Registration successful !";
            clear();

        }
        catch (MySqlException ex)
        {
            string errorMessage = "Error in registering user";
            errorMessage += ex.Message;
            throw new Exception(errorMessage);
        }
        finally
        {

        }
    }
}