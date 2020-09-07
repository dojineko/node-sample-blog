import crypto from 'crypto'
import { SecretGateway } from '../interfaces/secret'
import { injectable } from 'inversify'

@injectable()
export class CryptoSecretGateway implements SecretGateway {
  private readonly cryptAlgo = 'aes-256-cbc'
  private readonly cryptoPassword = process.env.CRYPTO_PASSWORD || 'cryptoPassword'
  private readonly cryptoSalt = process.env.CRYPTO_SALT || 'cryptoSalt'
  private readonly cryptoKey = crypto.scryptSync(this.cryptoPassword, this.cryptoSalt, 32)
  private readonly cryptoIv = process.env.CRYPTO_IV || '0123456789abcedf'

  public async encrypt(plaintext: string) {
    if (plaintext === '') {
      return ''
    }
    const cipher = crypto.createCipheriv(this.cryptAlgo, this.cryptoKey, this.cryptoIv)
    let ciphertext = cipher.update(plaintext, 'utf8', 'base64')
    ciphertext += cipher.final('base64')
    return ciphertext
  }

  public async decrypt(ciphertext: string) {
    if (ciphertext === '') {
      return ''
    }
    const decipher = crypto.createDecipheriv(this.cryptAlgo, this.cryptoKey, this.cryptoIv)
    let plaintext = decipher.update(ciphertext, 'base64', 'utf8')
    plaintext += decipher.final('utf8')
    return plaintext
  }
}
