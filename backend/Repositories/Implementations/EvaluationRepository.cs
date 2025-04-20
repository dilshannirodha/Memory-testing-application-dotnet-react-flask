using backend.Data;
using backend.Models.Domain;
using backend.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories.Implementations
{
    public class EvaluationRepository : IEvaluationRepository
    {
        private readonly AppDbContext _context;
        public EvaluationRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(EvaluationResult result)
        {
            await _context.EvaluationResults.AddAsync(result);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EvaluationResult>> GetByUserIdAsync(int UserId)
        {
            return await _context.EvaluationResults
                .Where(er => er.UserId == UserId)
                .ToListAsync();
        }

    }

}
