import { UserRepository, UserRepositoryCreateRequest } from '../../interfaces/user'
import { getManager } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { TypeOrmUserEntity } from '../entities/user'
import { injectable } from 'inversify'

const convert = (v: TypeOrmUserEntity) => ({
  id: v.id,
  encryptedEmail: v.encryptedEmail,
  passwordHash: v.passwordHash,
  salt: v.salt,
  createdAt: v.createdAt,
  updatedAt: v.updatedAt,
})

@injectable()
export class TypeOrmUserRepository implements UserRepository {
  public async create(arg: UserRepositoryCreateRequest) {
    const mgr = getManager()
    const result = await mgr.save(TypeOrmUserEntity, {
      id: uuid(),
      encryptedEmail: arg.encryptedEmail,
      passwordHash: arg.passwordHash,
      salt: arg.salt,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    return convert(result)
  }

  public async delete(id: string) {
    const mgr = getManager()
    await mgr.delete(TypeOrmUserEntity, { id })
  }

  public async findOne(id: string) {
    const mgr = getManager()
    const result = await mgr.findOne(TypeOrmUserEntity, { id })
    return result ? convert(result) : null
  }

  public async findByEncryptedEmail(encryptedEmail: string) {
    const mgr = getManager()
    const result = await mgr.findOne(TypeOrmUserEntity, { encryptedEmail })
    return result ? convert(result) : null
  }
}
