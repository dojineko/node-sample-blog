import { injectable, inject } from 'inversify'
import { PostRepository, PostRepositoryResponse } from '../repositories'
import { symbols } from '../symbols'
import { BadRequest } from '../utils/errors'

export interface PostCreateUsecaseRequest {
  userId: string
  title: string
  body: string
  tags?: string[]
}
export interface PostCreateUsecaseResponse extends PostRepositoryResponse {}

@injectable()
export class PostCreateUsecase {
  private postRepo: PostRepository

  public constructor(@inject(symbols.postRepository) postRepo: PostRepository) {
    this.postRepo = postRepo
  }

  public async execute(arg: PostCreateUsecaseRequest) {
    if (!(arg.userId && arg.title && arg.body)) {
      throw new BadRequest()
    }
    return await this.postRepo.create({ userId: arg.userId, title: arg.title, body: arg.body, tags: arg.tags || [] })
  }
}
