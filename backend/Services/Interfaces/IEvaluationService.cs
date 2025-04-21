using backend.Models.DTO;

namespace backend.Services.Interfaces
{
    public interface IEvaluationService
    {
        Task<IEnumerable<GetEvaluationsDTO>> GetResultByUserId(int UserId);
        Task SaveAsync(SaveEvaluationRequest request);
    }
}
