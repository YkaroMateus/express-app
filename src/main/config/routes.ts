import { Express, Router } from "express";
import userRoutes from "../../infra/http/routes/useRoutes";

export const setupRoutes = (app: Express): void => {
  const router = Router();
  app.use("/api", router);
  router.use(userRoutes);
};
