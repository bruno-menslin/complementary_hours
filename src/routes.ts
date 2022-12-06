import { Router } from "express"
import { UserController } from "./controller/UserController"

const router = Router()
const userController = new UserController()

router.get('/users', userController.find)
router.get('/users/:id', userController.findOne)
router.post('/users', userController.create)

export { router }