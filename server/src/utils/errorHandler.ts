import { Response } from "express";

export function handleError(res: Response, err: unknown, statusCode: number = 500) {
  const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
  
  return res.status(statusCode).json({ error: errorMessage });
}