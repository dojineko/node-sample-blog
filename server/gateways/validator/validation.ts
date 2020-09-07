import { ValidationGateway } from '../interfaces/validation'
import validator from 'validator'
import reservedUsername from 'reserved-usernames'
import { injectable } from 'inversify'

@injectable()
export class ValidatorValidationGateway implements ValidationGateway {
  public isEmail(v: string) {
    return validator.isEmail(v)
  }
  public isSecurePassword(v: string) {
    const enoughLength = v.length >= 12
    const includeNumber = /[0-9]/.test(v)
    const includeAlphabet = /[a-z]/.test(v)
    const includeSymbol = /[\x20-\x2f\x3a-\x40\x5b-\x60\x7b-\x7e]/.test(v)
    const inAscii = /^[\x20-\x7e]+$/.test(v)
    const notReserved = !reservedUsername.includes(v)
    const valid = enoughLength && includeNumber && includeAlphabet && includeSymbol && inAscii && notReserved

    return {
      valid,
      enoughLength,
      includeNumber,
      includeAlphabet,
      includeSymbol,
      inAscii,
      notReserved,
    }
  }
}
