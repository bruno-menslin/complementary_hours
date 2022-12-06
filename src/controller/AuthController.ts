import { Request, Response } from "express"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { AppDataSource } from '../data-source'
import { User } from "../entity/User"
import { AuthService } from "../services/AuthService"

class AuthController {

    async login(request: Request, response: Response) {

        const authService = new AuthService()

        const { username, password } = request.body

        const token = await authService.login({ username, password })

        return response.json(token)
    }
}

export { AuthController }