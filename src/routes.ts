import { Router } from "express"
import { AuthController } from "./controller/AuthController"
import { UserController } from "./controller/UserController"

const router = Router()
const authController = new AuthController()
const userController = new UserController()

router.post('/login', authController.login)

router.get('/users', userController.find)
router.get('/users/:id', userController.findOne)
router.post('/users', userController.create)

export { router }