import { UnsubscribeRepository } from '../../interfaces/unsubscribe'
import { getManager } from 'typeorm'
import { TypeOrmPostEntity } from '../entities/post'
import { TypeOrmSessionEntity } from '../entities/session'
import { TypeOrmUserEntity } from '../entities/user'
import { injectable } from 'inversify'

@injectable()
export class TypeOrmUnsubscribeRepository implements UnsubscribeRepository {
  public async unsubscribe(id: string) {
    await getManager().transaction(async (mgr) => {
      await mgr.delete(TypeOrmSessionEntity, { userId: id })
      await mgr.delete(TypeOrmPostEntity, { userId: id })
      await mgr.delete(TypeOrmUserEntity, { id })
    })
  }
}
