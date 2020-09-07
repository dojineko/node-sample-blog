export interface JwtGateway {
  encode(expHour: number, payload?: object): Promise<string>
  decode<T = unknown>(jwt: string): Promise<T>
}
