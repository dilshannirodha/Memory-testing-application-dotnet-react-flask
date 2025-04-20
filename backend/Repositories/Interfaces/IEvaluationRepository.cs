using backend.Models.Domain;

namespace backend.Repositories.Interfaces
{
    public interface IEvaluationRepository
    {
        Task AddAsync(EvaluationResult result);
        Task<IEnumerable<EvaluationResult>> GetByUserIdAsync(int UserId);
    }

}
