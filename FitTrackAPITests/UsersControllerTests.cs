using Microsoft.EntityFrameworkCore;
using FitTrack.API;
using FitTrack.API.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace FitTrack.API.Tests
{
    public class UsersControllerTests
    {
        private readonly FitTrackDbContext _context;
        private readonly UsersController _controller;

        public UsersControllerTests()
        {
            var options = new DbContextOptions<FitTrackDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            _context = new FitTrackDbContext(options);
            _controller = new UsersController(_context);

            // Seed the in-memory database with test data if needed
            SeedTestData();
        }

        private void SeedTestData()
        {
            _context.Users.AddRange(new List<User>
            {
                new() { Id = 1, FirstName = "John", MiddleName = "1", LastName = "Doe", Email = "john@example.com", Password = "password123", PhoneNumber = "1234567890" },
                new() { Id = 2, FirstName = "Jane", MiddleName = "2",LastName = "Doe", Email = "jane@example.com", Password = "password123", PhoneNumber = "0987654321" }
            });

            _context.SaveChanges();
        }

        [Fact]
        public async Task GetUsers_ReturnsListOfUsers()
        {
            // Act
            var result = await _controller.GetUsers();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<User>>>(result);
            var returnValue = Assert.IsType<List<User>>(actionResult.Value);

            Assert.Equal(_context.Users, returnValue);
        }

        [Fact]
        public async Task GetUser_ReturnsUserById()
        {
            var user = _context.Users.First();

            // Act
            var result = await _controller.GetUser(user.Id);

            // Assert
            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var returnValue = Assert.IsType<User>(actionResult.Value);

            Assert.Equal(user, returnValue);
        }

        [Fact]
        public async Task PutUser_UpdatesUser()
        {
            // Arrange
            var user = _context.Users.First();
            var updatedUser = user;
            updatedUser.FirstName = "UpdatedName";

            // Act
            var result = await _controller.PutUser(user.Id, updatedUser);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var userInDb = await _context.Users.FindAsync(user.Id);
            Assert.Equal(updatedUser.FirstName, userInDb.FirstName);
        }

        [Fact]
        public async Task PutUser_ReturnsBadRequest()
        {
            // Arrange
            var updatedUser = new User { 
                Id = 1,
                Email = "",
                Password = "",
                FirstName = "UpdatedName",
                MiddleName = "",
                LastName = "Doe",
                PhoneNumber = "1234567890",
            };

            // Act
            var result = await _controller.PutUser(2, updatedUser); // Passing different ID

            // Assert
            Assert.IsType<BadRequestResult>(result);
        }

        [Fact]
        public async Task PutUser_ReturnsNotFound()
        {
            // Arrange
            var updatedUser = new User { 
                Id = 99,
                Email = "",
                Password = "",
                FirstName = "NonExistentUser",
                MiddleName = "",
                LastName = "Doe",
                PhoneNumber = "1234567890"
            };

            // Act
            var result = await _controller.PutUser(99, updatedUser); // ID does not exist

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task PostUser_CreatesNewUser()
        {
            // Arrange
            var newUser = new User 
            { 
                Id = 5,
                FirstName = "Jane",
                MiddleName = "5",
                LastName = "Doe",
                Email = "jane5@example.com",
                Password = "password123",
                PhoneNumber = "0987654325"
            };

            // Act
            var result = await _controller.PostUser(newUser);

            // Assert

            var actionResult = Assert.IsType<ActionResult<User>>(result);
            var createdAtActionResult = Assert.IsType<CreatedAtActionResult>(actionResult.Result);
            var createdUser = Assert.IsType<User>(createdAtActionResult.Value);

            Assert.Equal(newUser.FirstName, createdUser.FirstName);
            Assert.Equal(newUser.Id, createdUser.Id);

            var userInDb = await _context.Users.FindAsync(newUser.Id);
            Assert.NotNull(userInDb);
            Assert.Equal(newUser.FirstName, userInDb.FirstName);
        }

        [Fact]
        public async Task DeleteUser_RemovesUser()
        {
            var id = _context.Users.First().Id;

            // Act
            var result = await _controller.DeleteUser(id);

            // Assert
            Assert.IsType<NoContentResult>(result);
            var userInDb = await _context.Users.FindAsync(id);
            Assert.Null(userInDb);
        }

        [Fact]
        public async Task DeleteUser_ReturnsNotFound()
        {
            // Act
            var result = await _controller.DeleteUser(99); // ID does not exist

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }

    }
}