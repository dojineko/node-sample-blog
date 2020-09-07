export interface HashGateway {
  generate(input: string, salt: string): Promise<string>
}
