import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { memoriesRoutes } from './routes/memories'
import { authRoutes } from './routes/auth'

const port = 5000

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'jorge',
})

app.register(memoriesRoutes)
app.register(authRoutes)

app
  .listen({
    port,
    host: '::',
  })
  .then(() => {
    console.log(`Server runing on port: ${port} 👍`)
  })
