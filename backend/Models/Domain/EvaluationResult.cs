using System.ComponentModel.DataAnnotations;

namespace backend.Models.Domain
{
    public class EvaluationResult
    {
        [Key]
        public int ResultId { get; set; }
        public int UserId { get; set; } 

        public int OverallScore { get; set; }
        public int ContentAccuracy { get; set; }
        public int Coverage { get; set; }
        public int Clarity { get; set; }
        public int Structure { get; set; }
        public int Terminology { get; set; }
        public int Originality { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
