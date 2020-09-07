import {
  PostRepository,
  PostRepositoryCreateRequest,
  PostRepositoryFindAllRequest,
  PostRepositoryUpdateRequest,
} from '../../interfaces/post'
import { v4 as uuid } from 'uuid'
import { TypeOrmPostEntity } from '../entities/post'
import { getManager } from 'typeorm'
import { NotFound } from '~/server/utils/errors'
import { injectable } from 'inversify'

const convert = (v: TypeOrmPostEntity) => ({
  id: v.id,
  userId: v.userId,
  title: v.title,
  body: v.body,
  tags: v.tags,
  createdAt: v.createdAt,
  updatedAt: v.updatedAt,
})

@injectable()
export class TypeOrmPostRepository implements PostRepository {
  public async create(arg: PostRepositoryCreateRequest) {
    const mgr = getManager()
    const id = uuid()
    await mgr.save(TypeOrmPostEntity, {
      id,
      userId: arg.userId,
      title: arg.title,
      body: arg.body,
      tags: arg.tags,
      createdAt: new Date(),
      updatedAt: null,
    })
    return await this.findById(id)
  }

  public async update(arg: PostRepositoryUpdateRequest) {
    const mgr = getManager()
    const entity = await mgr.findOne(TypeOrmPostEntity, { id: arg.id })
    if (!entity) {
      throw new NotFound()
    }
    await mgr
      .save(TypeOrmPostEntity, {
        id: arg.id,
        userId: entity.userId,
        title: arg.title,
        body: arg.body,
        tags: arg.tags,
        updatedAt: new Date(),
      })
      .catch((e) => {
        console.log(e)
        throw e
      })
  }

  public async delete(id: string) {
    const mgr = getManager()
    await mgr.delete(TypeOrmPostEntity, { id })
  }

  public async deleteByUserId(userId: string) {
    const mgr = getManager()
    await mgr.delete(TypeOrmPostEntity, { userId })
  }

  public async findById(id: string) {
    const mgr = getManager()
    const result = await mgr.findOne(TypeOrmPostEntity, { id })
    if (!result) {
      throw new NotFound('post not found')
    }
    return convert(result)
  }

  public async findAll(_?: PostRepositoryFindAllRequest) {
    const mgr = getManager()
    const result = await mgr.find(TypeOrmPostEntity)
    return result.map((v) => convert(v))
  }
}
