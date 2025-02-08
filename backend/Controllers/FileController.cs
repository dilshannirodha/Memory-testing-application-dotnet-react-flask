using System.Net.Http.Headers;
using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{

    
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly AppDbContext _context;
        public FileController(AppDbContext context)
        {
            _context = context;
        }


        [HttpGet("getFile/{fileId}")]
        public async Task<IActionResult> GetFile(int fileId)
        {
            var file = await _context.UploadedFiles.FindAsync(fileId);

            if (file == null)
                return NotFound("File not found.");

            var fileContent = new ByteArrayContent(file.FileData);
            fileContent.Headers.ContentType = new MediaTypeHeaderValue("application/pdf");

            return File(file.FileData, "application/pdf", file.FileName);
        }

        [HttpGet("extract-text/{fileId}")]
        public async Task<IActionResult> ExtractTextFromFile(int fileId)
        {
            var flaskApiUrl = $"http://localhost:5001/extract-text/{fileId}";

            using (var httpClient = new HttpClient())
            {
                var response = await httpClient.GetAsync(flaskApiUrl);

                if (!response.IsSuccessStatusCode)
                    return BadRequest("Failed to extract text from file.");

                var extractedText = await response.Content.ReadAsStringAsync();
                return Ok(extractedText);
            }
        }

    }

}
