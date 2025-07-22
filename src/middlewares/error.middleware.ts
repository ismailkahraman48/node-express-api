import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'http-errors';

export default function errorHandler(
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(err.status || 500).json({ message: err.message });
}
