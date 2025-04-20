using AutoMapper;
using backend.JWT;
using backend.Models.Domain;
using backend.Models.DTO;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;

namespace backend.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        private readonly IJwtTokenGenerator _tokenGenerator;

        public AuthService(IUserRepository repository, IMapper mapper, IJwtTokenGenerator tokenGenerator)
        {
            _repository = repository;
            _mapper = mapper;
            _tokenGenerator = tokenGenerator;
        }

        public async Task<UserResponse> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _repository.GetByEmailAsync(request.Email);
            if (existingUser != null)
                throw new Exception("User already exists");

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var user = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                PasswordHash = hashedPassword
            };

            await _repository.AddAsync(user);
            return _mapper.Map<UserResponse>(user);
        }

        public async Task<UserResponse> LoginAsync(LoginRequest request)
        {
            var user = await _repository.GetByEmailAsync(request.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
                throw new Exception("Invalid credentials");

            var response = _mapper.Map<UserResponse>(user);
            var token = _tokenGenerator.GenerateToken(user);
            response.Token = token;
            return response;
        }
    }

}
