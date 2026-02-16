using System.ComponentModel.DataAnnotations;

namespace StudyHubApi.Models.Entities;

public class User
{
    public int Id { get; set; }

    [Required]
    [EmailAddress]
    [MaxLength(200)]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string PasswordHash { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Role { get; set; } = "Student";

    public ICollection<Course> TeachingCourses { get; set; } = new List<Course>();
    public ICollection<Enrollment> Enrollments { get; set; } = new List<Enrollment>();
    public ICollection<Note> Notes { get; set; } = new List<Note>();
}
