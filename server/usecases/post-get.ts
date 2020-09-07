import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import { PostRepository, PostRepositoryResponse } from '../repositories'
import { NotFound, BadRequest } from '../utils/errors'

export interface PostGetUsecaseResponse extends Omit<Omit<PostRepositoryResponse, 'createdAt'>, 'updatedAt'> {
  createdAt: string
  updatedAt: string | null
}

@injectable()
export class PostGetUsecase {
  private postRepo: PostRepository

  public constructor(@inject(symbols.postRepository) postRepo: PostRepository) {
    this.postRepo = postRepo
  }

  public async execute(id: string): Promise<PostGetUsecaseResponse> {
    if (!id) {
      throw new BadRequest()
    }
    const result = await this.postRepo.findById(id)
    if (!result) {
      throw new NotFound()
    }
    return {
      ...result,
      createdAt: result.createdAt.toISOString(),
      updatedAt: result.updatedAt ? result.updatedAt.toISOString() : null,
    }
  }
}
