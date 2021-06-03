import { Request, Response, NextFunction } from 'express';
/* Custom Error */
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }
  console.error(err);
  res.sendStatus(400).send({
    message: 'Something went wrong',
  });
};
