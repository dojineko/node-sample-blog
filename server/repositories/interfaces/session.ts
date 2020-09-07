export interface SessionRepositoryResponse {
  id: string
  userId: string
  createdAt: Date
}

export interface SessionRepository {
  create(userId: string): Promise<SessionRepositoryResponse>
  findById(id: string): Promise<SessionRepositoryResponse | null>
  delete(id: string): Promise<void>
  deleteExpired(userId: string, base: Date, expHour: number): Promise<void>
}
