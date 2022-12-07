import { Router } from "express"
import { AuthController } from "./controller/AuthController"
import { CertificateController } from "./controller/CertificateController"
import { UserController } from "./controller/UserController"
import { checkAuth } from "./middlewares/checkAuth"
import { checkRole } from "./middlewares/checkRole"

const router = Router()
const authController = new AuthController()
const userController = new UserController()
const certificateController = new CertificateController()

router.post('/login', authController.login)

router.get('/users', userController.find)
router.get('/users/:id', userController.findOne)
router.post('/users', userController.create)

router.post('/certificates', [checkAuth, checkRole(['student'])], certificateController.create)

export { router }