using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordPro.Web.Data;
using PasswordPro.Web.Models;
using PasswordPro.Web.Models.Entities;

namespace PasswordPro.Web.Controllers
{
    public class PasswordsController : Controller
    {
        private readonly ApplicationDbContext _dbContext;
        public PasswordsController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Add()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddPasswordViewModel viewModel)
        {
            var password = new Password
            {
                Name = viewModel.Name,
                Url = viewModel.Url,
                UserName = viewModel.UserName,
                Passphrase = viewModel.Passphrase,
                Email = viewModel.Email,
                QuestionAnwser = viewModel.QuestionAnwser,
                Note = viewModel.Note
            };

            await _dbContext.Passwords.AddAsync(password);

            await _dbContext.SaveChangesAsync();

            return RedirectToAction("List", "Passwords");
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var passwords = await _dbContext.Passwords.ToListAsync();
            return View(passwords);
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            var password = await _dbContext.Passwords.FindAsync(id);

            return View(password);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(Password viewModel)
        {
            var password = await _dbContext.Passwords.FindAsync(viewModel.Id);

            if (password is not null)
            {
                password.Name = viewModel.Name;
                password.Url = viewModel.Url;
                password.UserName = viewModel.UserName;
                password.Passphrase = viewModel.Passphrase;
                password.Email = viewModel.Email;
                password.QuestionAnwser = viewModel.QuestionAnwser;
                password.Note = viewModel.Note;

                await _dbContext.SaveChangesAsync();
            }
            return RedirectToAction("List", "Passwords");
        }

        //[HttpPost]
        //public async Task<IActionResult> Delete(Password viewModel)
        //{
        //    var password = await _dbContext.Passwords
        //        .AsNoTracking()
        //        .FirstOrDefaultAsync(x => x.Id == viewModel.Id);

        //    if (password is not null)
        //    {
        //        _dbContext.Passwords.Remove(password);
        //        await _dbContext.SaveChangesAsync();
        //    }

        //    return RedirectToAction("List", "Passwords");
        //}

        [HttpPost]
        public async Task<IActionResult> Delete(int id)
        {
            var password = await _dbContext.Passwords
                .AsNoTracking()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (password is not null)
            {
                _dbContext.Passwords.Remove(password);
                await _dbContext.SaveChangesAsync();
            }

            return RedirectToAction("List", "Passwords");
        }
    }
}
