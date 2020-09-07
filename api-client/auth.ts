import ky from 'ky-universal'

export interface SignupUserApiRequest {
  email: string
  password: string
}

export interface SignupUserApiResponse {
  id: string
  createdAt: string
}

export const signupUser = async (arg: SignupUserApiRequest) => {
  return await ky.post('/api/signup', { json: arg }).json<SignupUserApiResponse>()
}

export interface LoginUserApiRequest {
  email: string
  password: string
}

export interface LoginUserApiResponse {
  id: string
  createdAt: string
}

export const loginUser = async (arg: LoginUserApiRequest) => {
  return await ky.post('/api/login', { json: arg }).json<LoginUserApiResponse>()
}

export const logoutUser = async () => {
  return await ky.post('/api/logout')
}

export const unsubscribeUser = async () => {
  await ky.post('/api/unsubscribe')
}

export type FetchUserApiResponse = {
  id: string
  email: string
  createdAt: string
} | null

export const fetchUser = async () => {
  return await ky.get('/api/fetch').json<FetchUserApiResponse>()
}
