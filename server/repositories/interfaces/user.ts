export interface UserRepositoryCreateRequest {
  encryptedEmail: string
  passwordHash: string
  salt: string
}

export interface UserRepositoryResponse {
  id: string
  encryptedEmail: string
  passwordHash: string
  salt: string
  createdAt: Date
  updatedAt: Date
}

export interface UserRepository {
  create(arg: UserRepositoryCreateRequest): Promise<UserRepositoryResponse>
  delete(id: string): Promise<void>
  findOne(id: string): Promise<UserRepositoryResponse | null>
  findByEncryptedEmail(encryptedEmail: string): Promise<UserRepositoryResponse | null>
}
