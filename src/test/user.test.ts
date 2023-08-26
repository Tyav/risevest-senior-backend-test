import path from "node:path";
import { User } from "../entities/User";
import { UserService } from "../services/user-service";
import { create, getMockRepository, save } from "./mocks/mock-repository";
import { ConflictError } from "../utils/errors/error-handlers";

const mockUserRepository = getMockRepository<User>()
describe('Test for Users', () => {
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
      const createdUser = await userService.create(newUser);
  
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
      expect(userService.create(newUser)).rejects.toEqual(new ConflictError({ message: 'User already exist.'}))
  
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({ where: { email: newUser.email }})
    })
  })

})