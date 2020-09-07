import { injectable, inject } from 'inversify'
import { PostRepository } from '../repositories'
import { symbols } from '../symbols'
import { Forbidden, BadRequest } from '../utils/errors'

export interface PostDeleteUsecaseRequest {
  id: string
  userId: string
}

@injectable()
export class PostDeleteUsecase {
  private postRepo: PostRepository

  public constructor(@inject(symbols.postRepository) postRepo: PostRepository) {
    this.postRepo = postRepo
  }

  public async execute(arg: PostDeleteUsecaseRequest) {
    if (!(arg.userId && arg.id)) {
      throw new BadRequest()
    }
    const result = await this.postRepo.findById(arg.id)
    if (result.userId !== arg.userId) {
      throw new Forbidden()
    }
    return await this.postRepo.delete(arg.id)
  }
}
