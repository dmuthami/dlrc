using System;
using System.Data.SqlClient;
using System.Configuration;
using System.Data;
using System.Net.Mail;
using MySql.Data.MySqlClient;
public partial class regs_Forgotpass : System.Web.UI.Page
{

    protected void Page_Load(object sender, EventArgs e)
    {
        txtEmail.Focus();
    }
    public void validate(){
        System.Text.RegularExpressions.Regex rEMail = new System.Text.RegularExpressions.Regex(@"^[a-zA-Z][\w\.-]{0,68}[a-zA-Z0-9]@[a-zA-Z0-9][\w\.-]*[a-zA-Z0-9]\.[a-zA-Z][a-zA-Z\.]*[a-zA-Z]$");
        if (txtEmail.Text.Length > 0)
        {
            if (!rEMail.IsMatch(txtEmail.Text))
            {
                RfVfem.Enabled = true;
            }
        }
    }
    protected void btnPass_Click(object sender, EventArgs e)
    {
        string code = Guid.NewGuid().ToString();
        string connstr = ConfigurationManager.ConnectionStrings["loginConnectionString"].ConnectionString;
        using (MySqlConnection conn = new MySqlConnection(connstr))
        {
            conn.Open();
            string qry = "update nduser set code=@code where Email=@email";
            MySqlCommand cmd = new MySqlCommand(qry, conn);
            cmd.Parameters.AddWithValue("@code", code);
            cmd.Parameters.AddWithValue("@email", txtEmail.Text);
            cmd.ExecuteNonQuery();
        }

        string apppath = string.Format("{0}://{1}{2}?code={3}",
                    Request.Url.Scheme, Request.Url.Authority, Request.Url.AbsolutePath.Replace("Forgotpass", "reset"), code);
        string reseturl = string.Format("<a href='{0}'>Reset Password</a>", apppath);

        string user = ConfigurationManager.AppSettings["smtpUser"];
        string pwd = ConfigurationManager.AppSettings["smtpPass"];
        int port = Convert.ToInt32(ConfigurationManager.AppSettings["smtpPort"]);
        string smtp = ConfigurationManager.AppSettings["smtpServer"];
        bool enablessl = ConfigurationManager.AppSettings["EnableSsl"].ToLower() == "true" ? true : false;

        MailMessage mail = new MailMessage(user, txtEmail.Text, "Password Reset", reseturl);
        System.Net.NetworkCredential mailAuthenticaion = new System.Net.NetworkCredential(user, pwd);
        System.Net.Mail.SmtpClient mailclient = new System.Net.Mail.SmtpClient(smtp, port);
        mailclient.EnableSsl = enablessl;
        mailclient.Credentials = mailAuthenticaion;
        mail.IsBodyHtml = true;
        mailclient.Send(mail);
    }
    protected void btnfog_click(object sender, EventArgs e)
    {
        Response.Redirect("~/Default.aspx");
    }
}