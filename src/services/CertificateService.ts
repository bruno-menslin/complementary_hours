import { hash } from "bcryptjs"
import { AppDataSource } from '../data-source'
import { Certificate } from "../entity/Certificate"
import { instanceToPlain } from "class-transformer"
import { UserService } from "./UserService"
import { User } from "../entity/User"

interface Icertificate {
  code?: number
  title: string
  hours: number
  image: string
  valid_hours: number
  situation: string
}

class CertificateService {

  async create(user_id: number, { title, hours, image, valid_hours, situation }: Icertificate) {

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

  async update(user_id: number, { code, title, hours, image, valid_hours, situation }: Icertificate) {

    const certificateRepository = AppDataSource.getRepository(Certificate)
    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOne({
      where: { id: user_id }
    })

    let certificate = await certificateRepository.findOne({
      where: { code },
      relations: { user: true }
    })

    if (!certificate) {
      throw new Error('certificate does not exist')
    }

    if (user.role != 'coordinator') {

      if (user.id != certificate.user.id) {
        throw new Error('unauthorized')
      }

      valid_hours = null
      situation = "to validate"
    }

    certificate = Object.assign(new Certificate(), {
      title,
      hours,
      image,
      user,
      situation,
      valid_hours
    })

    await certificateRepository.save(certificate)

    return certificate
  }
}

export { CertificateService }