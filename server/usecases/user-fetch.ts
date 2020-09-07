import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { SessionRepository, UserRepository } from '../repositories'
import { JwtGateway, SecretGateway } from '../gateways'
import { AuthTokenPayload } from '~/interfaces'

export type UserFetchUsecaseResponse = {
  id: string
  email: string
  createdAt: string
} | null

@injectable()
export class UserFetchUsecase {
  private userRepo: UserRepository
  private sessionRepo: SessionRepository
  private secretGw: SecretGateway
  private jwtGw: JwtGateway

  public constructor(
    @inject(symbols.userRepository) userRepo: UserRepository,
    @inject(symbols.sessionRepository) sessionRepo: SessionRepository,
    @inject(symbols.jwtGateway) jwtGw: JwtGateway,
    @inject(symbols.secretGateway) secretGw: SecretGateway,
  ) {
    this.userRepo = userRepo
    this.sessionRepo = sessionRepo
    this.jwtGw = jwtGw
    this.secretGw = secretGw
  }

  public async execute(token: string): Promise<UserFetchUsecaseResponse | null> {
    if (!token) {
      return null
    }
    const payload = await this.jwtGw.decode<AuthTokenPayload>(token).catch(null)
    if (!payload) {
      return null
    }
    const session = await this.sessionRepo.findById(payload.sessionId).catch(null)
    if (!session) {
      return null
    }
    const user = await this.userRepo.findOne(payload.userId).catch(null)
    if (!user) {
      return null
    }
    return {
      id: user.id,
      email: await this.secretGw.decrypt(user.encryptedEmail),
      createdAt: user.createdAt.toISOString(),
    }
  }
}
