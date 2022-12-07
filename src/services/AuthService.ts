import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppDataSource } from '../data-source'
import { User } from "../entity/User"

interface Iauth {
    username: string,
    password: string
}

class AuthService {

    async login({ username, password }: Iauth) {
        const userRepository = AppDataSource.getRepository(User)

        const user = await userRepository.findOne({
            where: { username: username }
        });

        if (!user) {
            throw new Error('incorrect username or password');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('incorrect username or password');
        }

        const token = sign(
            {
                id: user.id,
                role: user.role
            },
            "19uudasç139sdaopsjdhahso8y12983y",
            {
                expiresIn: '1d'
            }
        );

        return {
            token: token
        };
    }
}

export { AuthService };