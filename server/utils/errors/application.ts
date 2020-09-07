import { BaseError } from './base'

export class ApplicationError extends BaseError {
  public name = 'ApplicationError'
}

export class SignupValidationError extends ApplicationError {
  public name = 'SignupValidationError'
  public validEmail = false
  public enoughLength = false
  public includeNumber = false
  public includeAlphabet = false
  public includeSymbol = false
  public inAscii = false
  public notReserved = false
  public notSame = false

  public constructor(arg: Omit<Omit<SignupValidationError, 'name'>, 'message'>) {
    super()
    if (arg) {
      this.validEmail = arg.validEmail
      this.enoughLength = arg.enoughLength
      this.includeNumber = arg.includeNumber
      this.includeAlphabet = arg.includeAlphabet
      this.includeSymbol = arg.includeSymbol
      this.inAscii = arg.inAscii
      this.notReserved = arg.notReserved
      this.notSame = arg.notSame
    }
  }
}
