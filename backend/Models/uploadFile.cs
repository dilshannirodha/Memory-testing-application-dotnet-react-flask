using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class UploadedFile
    {
        [Key]
        public int FileId { get; set; }

        [Required]
        public string FileName { get; set; }

        [Required]
        public byte[] FileData { get; set; } // Stores the file in binary format

        public DateTime UploadedAt { get; set; } = DateTime.UtcNow;
    }
}
