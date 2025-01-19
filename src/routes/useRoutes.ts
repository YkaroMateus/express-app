// @ts-nocheck
import { Router, Request, Response } from "express";
import userController from "../controllers/userController";

const userRoutes = Router();

userRoutes.get("/users", (req: Request, res: Response) =>
  userController.getAll(req, res)
);
userRoutes.get("/users/:id", (req: Request, res: Response) =>
  userController.getById(req, res)
);
userRoutes.post("/users", (req: Request, res: Response) =>
  userController.create(req, res)
);
userRoutes.put("/users/:id", (req: Request, res: Response) =>
  userController.update(req, res)
);
userRoutes.delete("/users/:id", (req: Request, res: Response) =>
  userController.delete(req, res)
);

export default userRoutes;
