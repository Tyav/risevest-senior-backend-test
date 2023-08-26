import { User } from "../entities/user.entity";
import { UserService } from "../services/user-service";
import { getMockRepository } from "./mocks/mock-repository";
import { ConflictError } from "../utils/errors/error-handlers";

const mockUserRepository = getMockRepository<User>()
describe('Test for User service', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService(mockUserRepository as any);
  });

  afterEach(() => {
    mockUserRepository.create?.mockClear();

  })

  describe('Create User', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'testuser', email: 'test@example.com' };
      const savedUser = new User();
      savedUser.id = 1;
      savedUser.name = newUser.name;
      savedUser.email = newUser.email;
      mockUserRepository.create?.mockReturnValueOnce(mockUserRepository);
      mockUserRepository.save?.mockResolvedValueOnce(savedUser)
      const createdUser = await userService.createUser(newUser);
  
      expect(createdUser).toEqual(savedUser);
      expect(mockUserRepository.save).toHaveBeenCalled();
    });
    it('should not create user if user already exist', async () => {
      const newUser = { name: 'testuser', email: 'test@example.com' };
      const savedUser = new User();
      savedUser.id = 1;
      savedUser.name = newUser.name;
      savedUser.email = newUser.email;
      
      mockUserRepository.findOne?.mockResolvedValueOnce(savedUser);
      expect(userService.createUser(newUser)).rejects.toEqual(new ConflictError({ message: 'User already exist.'}))
  
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: newUser.email }})
    })
  })
  describe('Retrieve Users', () => {
    it('should return a list of created users', async () => {
      const mockUsers = [
        {name: 'testuser', email: 'test@example.com', id: 1},
        {name: 'testuser2', email: 'test2@example.com', id: 2},
        {name: 'testuser3', email: 'test3@example.com', id: 3},
      ]
      mockUserRepository.find?.mockResolvedValueOnce(mockUsers)
      const users = await userService.getAllUsers();
  
      expect(users).toEqual(mockUsers);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  })
})