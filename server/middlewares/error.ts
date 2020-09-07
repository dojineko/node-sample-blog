import { Request, Response, NextFunction } from 'express'
import * as errors from '../utils/errors'

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
  const sendStatus = (status: number, message?: string) => {
    message ? res.status(status).json({ message }) : res.sendStatus(status)
  }
  const forceLogout = () => {
    res.clearCookie('auth_token')
  }

  switch (err.constructor) {
    case errors.BadRequest:
      return sendStatus(400, err.message)
    case errors.Unauthorized:
      return sendStatus(401, err.message)
    case errors.PaymentRequired:
      return sendStatus(402, err.message)
    case errors.Forbidden:
      forceLogout()
      return sendStatus(403, err.message)
    case errors.NotFound:
      return sendStatus(404, err.message)
    case errors.Conflict:
      return sendStatus(409, err.message)
    case errors.InternalServerError:
      return sendStatus(500, err.message)
    case errors.SignupValidationError:
      const e = err as errors.SignupValidationError
      return res.status(403).json({
        validEmail: e.validEmail,
        enoughLength: e.enoughLength,
        includeNumber: e.includeNumber,
        includeAlphabet: e.includeAlphabet,
        includeSymbol: e.includeSymbol,
        inAscii: e.inAscii,
        notReserved: e.notReserved,
        notSame: e.notSame,
      })
    default:
      return sendStatus(500, err.message)
  }
}
