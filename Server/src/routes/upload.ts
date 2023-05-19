import { randomUUID } from 'node:crypto'
import { extname, resolve } from 'node:path'
import { FastifyInstance } from 'fastify'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

const pump = promisify(pipeline)
export async function uploadRoutes(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const file = await request.file({
      limits: {
        fileSize: 5_242_888, // 5mb
      },
    })

    if (!file) {
      return reply.status(400).send()
    }

    const fileMimeTypeRegex = /^(image|video)\/[a-zA]+/
    const isValidFileType = fileMimeTypeRegex.test(file.mimetype)

    if (!isValidFileType) {
      return reply.status(400).send()
    }

    const fileId = randomUUID()
    const extension = extname(file.filename)

    const filename = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(__dirname, '../../uploads/', filename),
    )

    await pump(file.file, writeStream)

    const fullUrl = request.protocol.concat('://').concat(request.hostname)
    const fileUrl = new URL(`/uploads/${filename}`, fullUrl).toString()
    return { fileUrl }
  })
}
