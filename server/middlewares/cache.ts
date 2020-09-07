import { wrap } from '../utils/wrap'

export const cacheHandler = wrap(async (req, res, next) => {
  if (!/^\/api\/?/.test(req.path)) {
    res.header('Cache-Control', 'no-store')
  }
  next()
})
