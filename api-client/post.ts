import ky from 'ky-universal'

export interface CreatePostApiRequest {
  title: string
  body: string
  tags?: string[]
}

export interface CreatePostApiResponse {
  id: string
  userId: string
  title: string
  body: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export const createPost = async (arg: CreatePostApiRequest) => {
  return await ky.post('/api/posts', { json: arg }).json<CreatePostApiResponse>()
}

export interface GetPostApiResponse extends CreatePostApiResponse {}

export const getPost = async (id: string) => {
  return await ky.get(`/api/posts/${id.toLowerCase()}`).json<GetPostApiResponse>()
}

export interface ListPostApiResponse extends CreatePostApiResponse {}

export const listPost = async () => {
  return ky.get('/api/posts').json<ListPostApiResponse[]>()
}

export interface UpdatePostApiRequest extends CreatePostApiRequest {
  id: string
}
export interface UpdatePostApiResponse extends CreatePostApiResponse {}

export const updatePost = async (id: string, arg: UpdatePostApiRequest) => {
  return await ky.put(`/api/posts/${id.toLowerCase()}`, { json: arg }).json<UpdatePostApiResponse>()
}

export const deletePost = async (id: string) => {
  return await ky.delete(`/api/posts/${id.toLowerCase()}`)
}
