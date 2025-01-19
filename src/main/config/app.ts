import express from "express";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

import { setupRoutes } from "./routes";
import { errorHandler } from "../../presentation/http/middlewares/errorHandler";
import { swaggerOptions } from "../docs/swagger";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
    ],
    exposedHeaders: ["Access-Control-Allow-Origin"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.use(express.json());

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/swagger/api", swaggerUi.serve);
app.get(
  "/swagger/api",
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { display: none }",
    swaggerOptions: {
      url: "/swagger/api-docs",
      persistAuthorization: true,
    },
  })
);

app.get("/swagger/api-docs", (_, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

setupRoutes(app);
app.use(errorHandler as any);

export default app;
