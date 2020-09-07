import { injectable, inject } from 'inversify'
import { SessionRepository, UserRepository } from '../repositories'
import { symbols } from '../symbols'
import { JwtGateway } from '../gateways'
import { AuthTokenPayload } from '~/interfaces'
import { sessionExpiration } from '../config/express'

export interface UserLogoutUsecaseRequest {
  token: string
  cb: () => Promise<void>
}

@injectable()
export class UserLogoutUsecase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository
  private jwtGw: JwtGateway

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository,
    @inject(symbols.sessionRepository) sessionRepo: SessionRepository,
    @inject(symbols.jwtGateway) jwtGw: JwtGateway,
  ) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
    this.jwtGw = jwtGw
  }

  public async execute(arg: UserLogoutUsecaseRequest) {
    if (!arg.token) {
      await arg.cb()
      return
    }

    const payload = await this.jwtGw.decode<AuthTokenPayload>(arg.token).catch(null)
    if (!payload) {
      return
    }
    const session = await this.sessionRepo.findById(payload.sessionId).catch(null)
    if (!session) {
      return
    }
    const user = await this.userRepo.findOne(payload.userId).catch(null)
    if (!user) {
      return
    }
    await this.sessionRepo.delete(session.id)
    await this.sessionRepo.deleteExpired(user.id, new Date(), sessionExpiration)

    await arg.cb()
  }
}
