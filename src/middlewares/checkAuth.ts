import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { AppDataSource } from '../data-source'
import { User } from "../entity/User"

interface IjwtPayload {
    id: number,
    role: string
}

export async function checkAuth(request: Request, response: Response, nextFunction: NextFunction) {
    const userRepository = AppDataSource.getRepository(User)

    const token = request.headers.authorization

    if (!token) {
        return response.status(401).end();
    }

    try {
        const jwtPayload = verify(token, "19uudasç139sdaopsjdhahso8y12983y") as IjwtPayload

        const { id, role } = jwtPayload

        const user = await userRepository.findOne({
            where: { id }
        })

        if (!user) {
            return response.status(401).end()
        }

        if (role != user.role) {
            return response.status(401).end()
        }

        response.locals.jwtPayload = jwtPayload
    } catch (error) {
        return response.status(401).end()
    }

    return nextFunction()
}
