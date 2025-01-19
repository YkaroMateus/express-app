import { Request, Response } from "express";
import { IUserRepository } from "../../../domain/repositories/userRepositoryInterface";

export class UserController {
  constructor(private readonly userRepository: IUserRepository) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const user = await this.userRepository.create({ name, email });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.userRepository.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await this.userRepository.update(id, { name, email });
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.userRepository.delete(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
