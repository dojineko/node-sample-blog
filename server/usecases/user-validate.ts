import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { SessionRepository } from '../repositories'
import { Forbidden } from '../utils/errors'
import { JwtGateway } from '../gateways'
import { AuthTokenPayload } from '~/interfaces'

@injectable()
export class UserValidateUsecase {
  private sessionRepo: SessionRepository
  private jwtGw: JwtGateway

  public constructor(
    @inject(symbols.sessionRepository) sessionRepo: SessionRepository,
    @inject(symbols.jwtGateway) jwtGw: JwtGateway,
  ) {
    this.sessionRepo = sessionRepo
    this.jwtGw = jwtGw
  }

  public async execute(token: string, cb: (v: AuthTokenPayload) => Promise<void>): Promise<void> {
    const payload = await this.jwtGw.decode<AuthTokenPayload>(token)
    const result = await this.sessionRepo.findById(payload.sessionId).catch(null)
    if (!result) {
      throw new Forbidden('session not found')
    }
    if (result.userId !== payload.userId) {
      throw new Forbidden('session invalid')
    }
    await cb(payload)
  }
}
