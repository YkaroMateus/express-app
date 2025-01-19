import express from "express";
import userRoutes from "./routes/useRoutes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use("/api", userRoutes);
  }
}

export default new App().app;
