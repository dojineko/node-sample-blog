import { injectable, inject } from 'inversify'
import { PostRepository, PostRepositoryResponse } from '../repositories'
import { symbols } from '../symbols'
import { BadRequest } from '../utils/errors'

export interface PostUpdateUsecaseRequest {
  id: string
  userId: string
  title: string
  body: string
  tags?: string[]
}
export interface PostUpdateUsecaseResponse extends PostRepositoryResponse {}

@injectable()
export class PostUpdateUsecase {
  private postRepo: PostRepository

  public constructor(@inject(symbols.postRepository) postRepo: PostRepository) {
    this.postRepo = postRepo
  }

  public async execute(arg: PostUpdateUsecaseRequest): Promise<PostUpdateUsecaseResponse> {
    if (!(arg.userId && arg.id)) {
      throw new BadRequest()
    }
    await this.postRepo.update({ id: arg.id, title: arg.title, body: arg.body })
    return this.postRepo.findById(arg.id)
  }
}
