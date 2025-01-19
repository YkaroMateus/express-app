import { Response } from "express";
import { HttpError } from "../errors/httpErrors";

export function errorHandler(error: Error, res: Response) {
  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      error: error.message,
    });
  }

  console.error(error);
  return res.status(500).json({
    error: "Erro interno do servidor",
  });
}
