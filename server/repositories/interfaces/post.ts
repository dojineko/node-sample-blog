export interface PostRepositoryCreateRequest {
  userId: string
  title: string
  body: string
  tags?: string[]
}

export interface PostRepositoryUpdateRequest extends Partial<Omit<PostRepositoryCreateRequest, 'userId'>> {
  id: string
}

export interface PostRepositoryResponse {
  id: string
  userId: string
  title: string
  body: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date | null
}

export interface PostRepositoryFindAllRequest {}

export interface PostRepository {
  create(arg: PostRepositoryCreateRequest): Promise<PostRepositoryResponse>
  update(arg: PostRepositoryUpdateRequest): Promise<void>
  findById(id: string): Promise<PostRepositoryResponse>
  findAll(arg?: PostRepositoryFindAllRequest): Promise<PostRepositoryResponse[]>
  delete(id: string): Promise<void>
  deleteByUserId(userId: string): Promise<void>
}
