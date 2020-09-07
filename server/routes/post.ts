import { Router } from 'express'
import { wrap } from '../utils/wrap'
import { container } from '../inversify.config'
import { symbols } from '../symbols'
import { PostController } from '../controllers'

export const postRouter = Router()
const controller = container.get<PostController>(symbols.postController)

postRouter.get(
  '/',
  wrap(async (_, res) => {
    res.status(200).json(await controller.list())
  }),
)
postRouter.post(
  '/',
  wrap(async (req, res) => {
    res.status(201).json(
      await controller.create({
        userId: req.context.userId,
        title: req.body.title || '',
        body: req.body.body || '',
        tags: req.body.tags || [],
      }),
    )
  }),
)
postRouter.get(
  '/:id',
  wrap(async (req, res) => {
    const id = req.params.id || ''
    res.status(200).json(await controller.get(id))
  }),
)
postRouter.put(
  '/:id',
  wrap(async (req, res) => {
    res.status(200).json(
      await controller.update({
        id: req.params.id || '',
        userId: req.context.userId,
        title: req.body.title || '',
        body: req.body.body || '',
        tags: req.body.tags || [],
      }),
    )
  }),
)
postRouter.delete(
  '/:id',
  wrap(async (req, res) => {
    await controller.delete({ userId: req.context.userId, id: req.params.id || '' })
    res.sendStatus(204)
  }),
)
