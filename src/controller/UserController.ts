import { AppDataSource } from '../data-source'
import { Request, Response } from "express"
import { User } from "../entity/User"
import { hash } from "bcryptjs"
import { UserService } from '../services/UserService'

class UserController {

    async find(request: Request, response: Response) {

        const userService = new UserService()

        const users = await userService.find()

        return response.json(users)
    }

    async findOne(request: Request, response: Response) {

        const userService = new UserService()

        const user = await userService.findOne(request.params.id)

        return response.json(user)
    }

    async create(request: Request, response: Response) {

        const userService = new UserService();

        const { username, password, role, status } = request.body

        const user = await userService.create({ username, password, role, status })

        return response.json(user)
    }
}

export { UserController }