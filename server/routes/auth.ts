import { Router, Response } from 'express'
import { wrap } from '../utils/wrap'
import { container } from '../inversify.config'
import { AuthController } from '../controllers'
import { symbols } from '../symbols'
import { authTokenCookieName, sessionExpiration } from '../config/express'

export const authRouter = Router()
const controller = container.get<AuthController>(symbols.authController)

const setToken = async (res: Response, token: string, baseTime = new Date()) => {
  const expires = new Date(baseTime)
  expires.setHours(baseTime.getHours() + sessionExpiration)
  res.cookie(authTokenCookieName, token, {
    httpOnly: true,
    expires,
  })
}

const clearToken = async (res: Response) => {
  res.clearCookie(authTokenCookieName)
}

authRouter.post(
  '/signup',
  wrap(async (req, res) => {
    res.status(201).json(
      await controller.signup({
        email: req.body.email || '',
        password: req.body.password || '',
        cb: async (token: string) => setToken(res, token),
      }),
    )
  }),
)
authRouter.post(
  '/login',
  wrap(async (req, res) => {
    res.status(200).json(
      await controller.login({
        email: req.body.email || '',
        password: req.body.password || '',
        cb: async (token: string) => setToken(res, token),
      }),
    )
  }),
)
authRouter.post(
  '/logout',
  wrap(async (req, res) => {
    const token: string = req.cookies[authTokenCookieName] || ''
    res.status(200).json(
      await controller.logout({
        token,
        cb: async () => clearToken(res),
      }),
    )
  }),
)
authRouter.post(
  '/unsubscribe',
  wrap(async (req, res) => {
    await controller.unsubscribe({ id: req.context.userId, cb: async () => clearToken(res) })
    res.sendStatus(204)
  }),
)
authRouter.get(
  '/fetch',
  wrap(async (req, res) => {
    const token: string = req.cookies[authTokenCookieName] || ''
    res.status(200).json(await controller.fetch(token))
  }),
)
