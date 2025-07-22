import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';

export default function notFound(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  next(createError.NotFound(`Route ${req.originalUrl} bulunamadı`));
}
