export interface ValidationGatewayisSecurePasswordResponse {
  valid: boolean
  enoughLength: boolean
  includeNumber: boolean
  includeAlphabet: boolean
  includeSymbol: boolean
  inAscii: boolean
  notReserved: boolean
}

export interface ValidationGateway {
  isEmail(v: string): boolean
  isSecurePassword(v: string): ValidationGatewayisSecurePasswordResponse
}
