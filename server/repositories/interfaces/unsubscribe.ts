export interface UnsubscribeRepository {
  unsubscribe(id: string): Promise<void>
}
