import { wrap } from '~/server/utils/wrap'
import { container } from '../inversify.config'
import { AuthController } from '../controllers'
import { symbols } from '../symbols'
import { authTokenCookieName } from '../config/express'

const controller = container.get<AuthController>(symbols.authController)

export const authHandler = wrap(async (req, res, next) => {
  if (!req.context) {
    req.context = { userId: '', sessionId: '' }
  }

  if (
    !/^\/api\/?/.test(req.path) ||
    (req.method.toLowerCase() === 'get' && /^\/api\/(fetch|posts|posts\/[0-9a-z-]+?)$/.test(req.path)) ||
    (req.method.toLowerCase() === 'post' && /^\/api\/(signup|login|logout)$/.test(req.path))
  ) {
    next()
    return
  }

  const token: string = req.cookies[authTokenCookieName] || ''
  if (!token) {
    res.sendStatus(403)
    return
  }

  try {
    await controller.validate(token, async (v) => {
      req.context = {
        userId: v.userId,
        sessionId: v.sessionId,
      }
    })
  } catch {
    res.sendStatus(403)
    return
  }

  next()
})
