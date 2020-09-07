import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { UnsubscribeRepository } from '../repositories'

export interface UserUnsubscribeUsecaseRequest {
  id: string
  cb: () => Promise<void>
}

@injectable()
export class UserUnsubscribeUsecase {
  private unsubscribeRepo: UnsubscribeRepository

  public constructor(@inject(symbols.unsubscribeRepository) unsubscribeRepo: UnsubscribeRepository) {
    this.unsubscribeRepo = unsubscribeRepo
  }

  public async execute(arg: UserUnsubscribeUsecaseRequest) {
    await this.unsubscribeRepo.unsubscribe(arg.id)
    await arg.cb()
  }
}
