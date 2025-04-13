using Microsoft.AspNetCore.Mvc;
using PasswordPro.Web.Models;

namespace PasswordPro.Web.Controllers
{
    public class PasswordsController : Controller
    {
        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Add(AddPasswordViewModel viewModel)
        {
            return View();
        }
    }
}
