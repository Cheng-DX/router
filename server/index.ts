import Koa from 'koa'
import logger from '../middleware/logger'
import { createRouter } from '../middleware/my-router'

const app = new Koa()
const router = createRouter()

router.get('/get/:number/sub/[name]', async (ctx, next) => {
  const { name, number } = ctx.params
  const r = await new Promise<string>((res) => {
    setTimeout(() => res('hi'), 1000)
  })
  ctx.body = r
}, (ctx, next) => {
  ctx.body = 'Await test'
  next()
})

app
  .use(logger)
  .use(router.routes())

app.listen(3000)

export default app