using Azure.Core;
using backend.Models.Domain;
using backend.Models.DTO;
using backend.Repositories.Interfaces;
using backend.Services.Implementations;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EvaluationController : ControllerBase
    {
        private readonly IEvaluationService _evaluationService;

        public EvaluationController(IEvaluationService evaluationService)
        {
            _evaluationService = evaluationService;
        }

        [HttpPost("save")]
        [Authorize]
        public async Task<IActionResult> SaveEvaluation([FromBody] SaveEvaluationRequest request)
        {
            try
            {
                var result = await _evaluationService.SaveAsync(request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("by-result/{UserId}")]
        [Authorize]
        public async Task<IActionResult> GetByUserId(int UserId)
        {
            try
            {
                var result = await _evaluationService.GetResultByUserId(UserId);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }
    }

}
