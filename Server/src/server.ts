import fastify from 'fastify'
import { PrismaClient } from '@prisma/client'

const port = 5000

const app = fastify()
const prisma = new PrismaClient()

app.get('/', async (res, req) => {
  const users = await prisma.user.findMany()
  return users
})

app
  .listen({
    port,
  })
  .then(() => {
    console.log(`Server runing on port: ${port} 👍`)
  })
