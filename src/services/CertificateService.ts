import { hash } from "bcryptjs"
import { AppDataSource } from '../data-source'
import { Certificate } from "../entity/Certificate"
import { instanceToPlain } from "class-transformer"
import { UserService } from "./UserService"
import { User } from "../entity/User"

interface Icertificate {
  user_id: number
  title: string
  hours: string
  image: string
}

class CertificateService {

  async create({ user_id, title, hours, image }: Icertificate) {
    const certificateRepository = AppDataSource.getRepository(Certificate)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { id: user_id }
    })

    const certificate = Object.assign(new Certificate(), {
      title,
      hours,
      image,
      user,
      situation: "to validate"
    })

    await certificateRepository.save(certificate)

    user.status = "to validate"

    await userRepository.save(user)

    return certificate
  }
}

export { CertificateService }