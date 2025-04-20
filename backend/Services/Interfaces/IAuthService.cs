using backend.Models.DTO;

namespace backend.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserResponse> RegisterAsync(RegisterRequest request);
        Task<UserResponse> LoginAsync(LoginRequest request);
    }
}
