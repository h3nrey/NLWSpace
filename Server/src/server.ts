import fastify from 'fastify'
import cors from '@fastify/cors'
import { memoriesRoutes } from './routes/memories'

const port = 5000

const app = fastify()

app.register(cors, {
  origin: true,
})
app.register(memoriesRoutes)

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server runing on port: ${port} 👍`)
  })
