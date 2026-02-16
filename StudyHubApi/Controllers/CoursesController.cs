using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudyHubApi.Data;
using StudyHubApi.Models.Entities;
using System.Security.Claims;

namespace StudyHubApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly AppDbContext _db;

        public CoursesController(AppDbContext db)
        {
            _db = db;
        }

        /// <summary>
        /// Izveidot jaunu kursu (Tikai Teacher)
        /// </summary>
        [Authorize(Roles = "Teacher")]
        [HttpPost]
        public async Task<IActionResult> CreateCourse(Course course)
        {
            var userId = int.Parse(
                User.FindFirstValue(ClaimTypes.NameIdentifier)!
            );

            course.TeacherId = userId;

            _db.Courses.Add(course);
            await _db.SaveChangesAsync();

            return Ok(course);
        }

        /// <summary>
        /// Dabūt visus kursus
        /// </summary>
        [HttpGet]
        public async Task<IActionResult> GetCourses()
        {
            var courses = await _db.Courses
                .Include(c => c.Teacher)
                .ToListAsync();

            return Ok(courses);
        }
    }
}
