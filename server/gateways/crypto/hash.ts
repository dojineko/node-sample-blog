import crypto from 'crypto'
import { HashGateway } from '../interfaces/hash'
import { injectable } from 'inversify'

@injectable()
export class CryptoHashGateway implements HashGateway {
  private readonly stretch = process.env.HASH_STRETCH ? parseInt(process.env.HASH_STRETCH, 10) : 5000
  public async generate(data: string, salt: string) {
    let result = crypto
      .createHash('sha512')
      .update(data + salt)
      .digest('hex')
    for (let i = 0; i < this.stretch; i++) {
      result = crypto.createHash('sha512').update(result).digest('hex')
    }
    return result
  }
}
