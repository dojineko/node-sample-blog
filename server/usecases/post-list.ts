import { injectable, inject } from 'inversify'
import { PostRepository, PostRepositoryResponse } from '../repositories'
import { symbols } from '../symbols'

export interface PostListUsecaseResponse extends Omit<Omit<PostRepositoryResponse, 'createdAt'>, 'updatedAt'> {
  createdAt: string
  updatedAt: string | null
}

@injectable()
export class PostListUsecase {
  private postRepo: PostRepository

  public constructor(@inject(symbols.postRepository) postRepo: PostRepository) {
    this.postRepo = postRepo
  }

  public async execute(): Promise<PostListUsecaseResponse[]> {
    return (await this.postRepo.findAll()).map((v) => ({
      ...v,
      createdAt: v.createdAt.toISOString(),
      updatedAt: v.updatedAt ? v.updatedAt.toISOString() : null,
    }))
  }
}
