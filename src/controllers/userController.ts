import { Request, Response } from "express";
import userService from "../services/userService";
import { Prisma } from "@prisma/client";

export class UserController {
  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2023") {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body;

      if (!name) {
        return res.status(400).json({ error: "Name is required" });
      }

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      const user = await userService.create(req.body);
      return res.status(201).json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ error: "Email already exists" });
        }
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await userService.update(req.params.id, req.body);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.json(user);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return res.status(400).json({ error: "Email already exists" });
        }
        if (error.code === "P2023") {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = await userService.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(204).send();
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2023") {
          return res.status(400).json({ error: "Invalid ID format" });
        }
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();
