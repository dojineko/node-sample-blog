import { injectable, inject } from 'inversify'
import { BadRequest, Conflict, SignupValidationError } from '../utils/errors'
import { UserRepository, SessionRepository } from '../repositories'
import { HashGateway } from '../gateways/interfaces/hash'
import { symbols } from '../symbols'
import { v4 as uuid } from 'uuid'
import { SecretGateway } from '../gateways/interfaces/secret'
import { ValidationGateway } from '../gateways/interfaces/validation'
import { JwtGateway } from '../gateways'
import { sessionExpiration } from '../config/express'

export interface UserSignupUsecaseRequest {
  email: string
  password: string
  cb: (token: string) => Promise<void>
}

export interface UserSignupUsecaseResponse {
  id: string
  email: string
  createdAt: Date
}

@injectable()
export class UserSignupUsecase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository
  private hashGw: HashGateway
  private jwtGw: JwtGateway
  private secretGw: SecretGateway
  private validationGw: ValidationGateway

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository,
    @inject(symbols.sessionRepository) sessionRepo: SessionRepository,
    @inject(symbols.hashGateway) hashGw: HashGateway,
    @inject(symbols.jwtGateway) jwtGw: JwtGateway,
    @inject(symbols.secretGateway) secretGw: SecretGateway,
    @inject(symbols.validationGateway) validationGw: ValidationGateway,
  ) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
    this.hashGw = hashGw
    this.jwtGw = jwtGw
    this.secretGw = secretGw
    this.validationGw = validationGw
  }

  public async execute(arg: UserSignupUsecaseRequest): Promise<UserSignupUsecaseResponse> {
    if (!arg.email || !arg.password) {
      throw new BadRequest()
    }

    const validEmail = this.validationGw.isEmail(arg.email)
    const validPassword = this.validationGw.isSecurePassword(arg.password)
    const notSame = arg.email !== arg.password
    if (!validEmail || !validPassword.valid || !notSame) {
      throw new SignupValidationError({
        validEmail,
        enoughLength: validPassword.enoughLength,
        includeNumber: validPassword.includeNumber,
        includeAlphabet: validPassword.includeAlphabet,
        includeSymbol: validPassword.includeSymbol,
        inAscii: validPassword.inAscii,
        notReserved: validPassword.notReserved,
        notSame,
      })
    }

    const encryptedEmail = await this.secretGw.encrypt(arg.email)
    const user = await this.userRepo.findByEncryptedEmail(encryptedEmail)
    if (user) {
      throw new Conflict('user already exist')
    }

    const salt = uuid()
    const result = await this.userRepo.create({
      encryptedEmail,
      salt,
      passwordHash: await this.hashGw.generate(arg.password, salt),
    })

    const sess = await this.sessionRepo.create(result.id)
    const token = await this.jwtGw.encode(sessionExpiration, { userId: sess.userId, sessionId: sess.id })
    await arg.cb(token)

    return {
      id: result.id,
      email: arg.email,
      createdAt: result.createdAt,
    }
  }
}
