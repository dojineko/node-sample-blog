export interface SecretGateway {
  encrypt(plaintext: string): Promise<string>
  decrypt(ciphertext: string): Promise<string>
}
