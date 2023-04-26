import { Request, Response, NextFunction } from "express";

interface AuthRequest extends Request {
  user?: { userId: string; name: string };
}

type Controller = (req: AuthRequest, res: Response, next: NextFunction) => void;

type errorHandlerMiddleware = (
  err: Err,
  req: Request,
  res: Response,
  next: NextFunction
) => void;

interface Err {
  statusCode?: number;
  message?: string;
  name?: string;
  code?: number;
  errors?: { [key: string]: { message: string } };
  keyValue?: { [key: string]: string };
  value?: string;
}

type JwtPayload = {
  userId: string;
  name: string;
};

interface Assignee {
  id: string;
  name: string;
  email: string;
}

export { Controller, errorHandlerMiddleware, JwtPayload, Assignee };
