import { SessionRepository } from '../../interfaces/session'
import { TypeOrmSessionEntity } from '../entities/session'
import { getManager, LessThan } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { injectable } from 'inversify'

const convert = (v: TypeOrmSessionEntity) => ({ id: v.id, userId: v.userId, createdAt: v.createdAt })

@injectable()
export class TypeOrmSessionRepository implements SessionRepository {
  public async create(userId: string) {
    const mgr = getManager()
    const result = await mgr.save(TypeOrmSessionEntity, {
      id: uuid(),
      userId,
      createdAt: new Date(),
    })
    return convert(result)
  }

  public async findById(id: string) {
    const mgr = getManager()
    const result = await mgr.findOne(TypeOrmSessionEntity, { id })
    return result ? convert(result) : null
  }

  public async delete(id: string) {
    const mgr = getManager()
    await mgr.delete(TypeOrmSessionEntity, { id })
  }

  public async deleteExpired(userId: string, base: Date, expHour: number) {
    const mgr = getManager()
    const threshold = new Date(base)
    threshold.setHours(base.getHours() - expHour)
    await mgr.delete(TypeOrmSessionEntity, { userId, createdAt: LessThan(threshold) })
  }
}
