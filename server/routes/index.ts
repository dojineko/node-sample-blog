import { Router } from 'express'
import { authRouter } from './auth'
import { postRouter } from './post'

export const apiRouter = Router()

apiRouter.use('/posts', postRouter)
apiRouter.use('/', authRouter)
