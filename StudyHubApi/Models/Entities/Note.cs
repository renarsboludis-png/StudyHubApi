using System.ComponentModel.DataAnnotations;

namespace StudyHubApi.Models.Entities;

public class Note
{
    public int Id { get; set; }

    public int LessonId { get; set; }
    public Lesson Lesson { get; set; } = null!;

    public int StudentId { get; set; }
    public User Student { get; set; } = null!;

    [Required]
    [MaxLength(2000)]
    public string Text { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
