import { JwtGateway } from '../interfaces/jwt'
import jwtSimple from 'jwt-simple'
import { v4 as uuid } from 'uuid'
import { injectable } from 'inversify'

@injectable()
export class JwtSimpleJwtGateway implements JwtGateway {
  private readonly jwtKey = process.env.JWT_KEY || 'dummy'
  private readonly jwtAlgo = 'HS256'

  public async encode(expHour: number, payload?: object) {
    const unixNow = new Date().getTime() / 1000
    return jwtSimple.encode(
      {
        sub: uuid(),
        iat: Math.floor(unixNow),
        exp: Math.floor(unixNow + expHour * 60 * 60),
        ...(payload || {}),
      },
      this.jwtKey,
      this.jwtAlgo,
    )
  }
  public async decode<T = unknown>(jwt: string) {
    return jwtSimple.decode(jwt, this.jwtKey, false, this.jwtAlgo) as T
  }
}
