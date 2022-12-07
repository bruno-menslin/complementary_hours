import { hash } from "bcryptjs"
import { AppDataSource } from '../data-source'
import { User } from "../entity/User"
import { instanceToPlain } from "class-transformer"

interface Iuser {
    username: string
    password: string
    role: string
    status: string
}

class UserService {

    async find() {
        const userRepository = AppDataSource.getRepository(User)

        const users = await userRepository.find()

        return instanceToPlain(users)
    }

    async findOne(id: number) {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new Error('user does not exist')
        }

        return instanceToPlain(user)
    }

    async create({ username, password, role }: Iuser) {
        const userRepository = AppDataSource.getRepository(User)

        const userAlreadyExists = await userRepository.findOne({
            where: { username: username }
        })

        if (userAlreadyExists) {
            throw new Error('username already exists')
        }

        const passwordHash = await hash(password, 8)

        const user = userRepository.create({
            username: username,
            password: passwordHash,
            role: role
        })

        await userRepository.save(user)

        return user
    }
}

export { UserService }