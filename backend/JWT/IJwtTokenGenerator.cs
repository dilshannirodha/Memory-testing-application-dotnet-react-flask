using backend.Models.Domain;

namespace backend.JWT
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(User user);
    }

}
