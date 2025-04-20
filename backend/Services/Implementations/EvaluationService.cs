using AutoMapper;
using backend.JWT;
using backend.Models.Domain;
using backend.Models.DTO;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class EvaluationService : IEvaluationService
    {
        private readonly IEvaluationRepository _repository;
    private readonly IMapper _mapper;
    private readonly IJwtTokenGenerator _tokenGenerator;

    public EvaluationService(IEvaluationRepository repository, IMapper mapper, IJwtTokenGenerator tokenGenerator)
    {
        _repository = repository;
        _mapper = mapper;
        _tokenGenerator = tokenGenerator;
    }

        public async Task<IEnumerable<GetEvaluationsDTO>> GetResultByUserId(int userId)
        {
            var evaluations = await _repository.GetByUserIdAsync(userId);
            return _mapper.Map<IEnumerable<GetEvaluationsDTO>>(evaluations);
        }

      

        public async Task<SaveEvaluationRequest> SaveAsync(SaveEvaluationRequest request)
        {
            var evaluation = new EvaluationResult
            {
                UserId = request.UserId, 
                OverallScore = request.OverallScore,
                ContentAccuracy = request.ContentAccuracy,
                Coverage = request.Coverage,
                Clarity = request.Clarity,
                Structure = request.Structure,
                Terminology = request.Terminology,
                Originality = request.Originality
            };

            await _repository.AddAsync(evaluation);
            return _mapper.Map<SaveEvaluationRequest>(evaluation);
        }
    }
}
