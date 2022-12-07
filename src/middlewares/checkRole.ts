import { Request, Response, NextFunction } from "express";
import { AppDataSource } from '../data-source'
import { User } from "../entity/User";

interface IjwtPayload {
  id: number,
  role: string
}

export const checkRole = (roles: Array<string>) => {
  return async (request: Request, response: Response, nextFunction: NextFunction) => {

    const userRepository = AppDataSource.getRepository(User)

    const { role } = response.locals.jwtPayload as IjwtPayload

    if (!role) {
      return response.status(401).end()
    }

    if (roles.indexOf(role) > -1) {
      return nextFunction()
    } else {
      return response.status(401).end()
    }
  };
};