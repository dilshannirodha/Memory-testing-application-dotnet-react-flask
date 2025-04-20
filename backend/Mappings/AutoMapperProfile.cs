using AutoMapper;
using backend.Models.Domain;
using backend.Models.DTO;

namespace backend.Mappings
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserResponse>();
            CreateMap<RegisterRequest, User>();
            CreateMap<SaveEvaluationRequest, EvaluationResult>();
            CreateMap<EvaluationResult, GetEvaluationsDTO>();
        }
    }
}
