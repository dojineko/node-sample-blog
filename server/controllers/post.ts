import { injectable, inject } from 'inversify'
import { symbols } from '../symbols'
import {
  PostCreateUsecase,
  PostGetUsecase,
  PostListUsecase,
  PostUpdateUsecase,
  PostDeleteUsecase,
  PostCreateUsecaseRequest,
  PostCreateUsecaseResponse,
  PostDeleteUsecaseRequest,
  PostGetUsecaseResponse,
  PostListUsecaseResponse,
  PostUpdateUsecaseRequest,
  PostUpdateUsecaseResponse,
} from '../usecases'

export interface PostControllerCreateRequest extends PostCreateUsecaseRequest {}
export interface PostControllerCreateResponse extends PostCreateUsecaseResponse {}
export interface PostControllerGetResponse extends PostGetUsecaseResponse {}
export interface PostControllerListResponse extends PostListUsecaseResponse {}
export interface PostControllerDeleteRequest extends PostDeleteUsecaseRequest {}
export interface PostControllerUpdateRequest extends PostUpdateUsecaseRequest {}
export interface PostControllerUpdateResponse extends PostUpdateUsecaseResponse {}

@injectable()
export class PostController {
  private postCreateUsecase: PostCreateUsecase
  private postGetUsecase: PostGetUsecase
  private postListUsecase: PostListUsecase
  private postUpdateUsecase: PostUpdateUsecase
  private postDeleteUsecase: PostDeleteUsecase

  public constructor(
    @inject(symbols.postCreateUsecase) postCreateUsecase: PostCreateUsecase,
    @inject(symbols.postGetUsecase) postGetUsecase: PostGetUsecase,
    @inject(symbols.postListUsecase) postListUsecase: PostListUsecase,
    @inject(symbols.postUpdateUsecase) postUpdateUsecase: PostUpdateUsecase,
    @inject(symbols.postDeleteUsecase) postDeleteUsecase: PostDeleteUsecase,
  ) {
    this.postCreateUsecase = postCreateUsecase
    this.postGetUsecase = postGetUsecase
    this.postListUsecase = postListUsecase
    this.postUpdateUsecase = postUpdateUsecase
    this.postDeleteUsecase = postDeleteUsecase
  }

  public async create(arg: PostControllerCreateRequest): Promise<PostControllerCreateResponse> {
    return await this.postCreateUsecase.execute(arg)
  }
  public async get(id: string): Promise<PostControllerGetResponse> {
    return await this.postGetUsecase.execute(id)
  }
  public async list(): Promise<PostControllerListResponse[]> {
    return await this.postListUsecase.execute()
  }
  public async update(arg: PostControllerUpdateRequest): Promise<PostUpdateUsecaseResponse> {
    return await this.postUpdateUsecase.execute(arg)
  }
  public async delete(arg: PostControllerDeleteRequest) {
    await this.postDeleteUsecase.execute(arg)
  }
}
