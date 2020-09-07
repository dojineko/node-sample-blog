import { injectable, inject } from 'inversify'
import { BadRequest, NotFound, Forbidden } from '../utils/errors'
import { UserRepository, SessionRepository } from '../repositories'
import { HashGateway } from '../gateways/interfaces/hash'
import { SecretGateway } from '../gateways/interfaces/secret'
import { symbols } from '../symbols'
import { JwtGateway } from '../gateways/interfaces/jwt'

export interface UserLoginUsecaseRequest {
  email: string
  password: string
  cb: (token: string) => Promise<void>
}

@injectable()
export class UserLoginUsecase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository
  private jwtGw: JwtGateway
  private hashGw: HashGateway
  private secretGw: SecretGateway

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository,
    @inject(symbols.sessionRepository) sessionRepo: SessionRepository,
    @inject(symbols.jwtGateway) jwtGw: JwtGateway,
    @inject(symbols.hashGateway) hashGw: HashGateway,
    @inject(symbols.secretGateway) secretGw: SecretGateway,
  ) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
    this.jwtGw = jwtGw
    this.hashGw = hashGw
    this.secretGw = secretGw
  }

  public async execute(arg: UserLoginUsecaseRequest) {
    if (!arg.email || !arg.password) {
      throw new BadRequest()
    }

    const encryptedEmail = await this.secretGw.encrypt(arg.email)
    const user = await this.userRepo.findByEncryptedEmail(encryptedEmail)
    if (!user) {
      throw new NotFound('user not found')
    }
    const hash = await this.hashGw.generate(arg.password, user.salt)
    if (user.passwordHash !== hash) {
      throw new Forbidden('user password is wrong')
    }

    const result = await this.sessionRepo.create(user.id)
    const sessionExpiration = 12 // hours
    const token = await this.jwtGw.encode(sessionExpiration, { userId: user.id, sessionId: result.id })
    await this.sessionRepo.deleteExpired(user.id, new Date(), sessionExpiration)

    await arg.cb(token)

    return token
  }
}
