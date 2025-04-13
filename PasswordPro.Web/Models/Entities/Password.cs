namespace PasswordPro.Web.Models.Entities
{
    public class Password
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Url { get; set; }
        public string? UserName { get; set; }
        public string? Passphrase { get; set; }
        public string? Email { get; set; }
        public string? QuestionAnwser { get; set; }
        public string? Note { get; set; }

    }
}
