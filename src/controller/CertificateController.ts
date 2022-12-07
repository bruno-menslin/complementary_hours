import { AppDataSource } from '../data-source'
import { Request, Response } from "express"
import { User } from "../entity/User"
import { hash } from "bcryptjs"
import { UserService } from '../services/UserService'
import { CertificateService } from '../services/CertificateService'

class CertificateController {

  async create(request: Request, response: Response) {

    const certificateService = new CertificateService();

    const { title, hours, image } = request.body

    const user_id = parseInt(response.locals.jwtPayload.id)

    const certificate = await certificateService.create({ user_id, title, hours, image })

    return response.json(certificate)
  }
}

export { CertificateController }