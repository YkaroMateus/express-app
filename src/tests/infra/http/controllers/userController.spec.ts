import { Request, Response } from 'express';
import { UserController } from '../../../../infra/http/controllers/userController';
import { IUserRepository } from '../../../../domain/repositories/userRepositoryInterface';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';

describe('UserController', () => {
  let userRepository: DeepMockProxy<IUserRepository>;
  let userController: UserController;
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    userRepository = mockDeep<IUserRepository>();
    userController = new UserController(userRepository);
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn()
    };
  });

  describe('create', () => {
    it('should create a user', async () => {
      const userData = {
        name: 'John Doe',
        email: 'john@example.com'
      };

      req = {
        body: userData
      };

      const expectedUser = {
        id: '1',
        ...userData,
        createdAt: new Date()
      };

      userRepository.create.mockResolvedValue(expectedUser);

      await userController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

    it('should return 400 when name is missing', async () => {
      req = {
        body: {
          email: 'john@example.com'
        }
      };

      await userController.create(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Name is required'
      });
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const expectedUsers = [
        { id: '1', name: 'John', email: 'john@example.com', createdAt: new Date() }
      ];

      userRepository.findAll.mockResolvedValue(expectedUsers);

      await userController.findAll(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(expectedUsers);
    });
  });
});