import { readFileSync } from 'fs'
import path from 'path'
import type { MessageWithComment } from '~/types'

export default defineEventHandler(async (event) => {
  const idParam = getRouterParam(event, 'id')

  // Validate ID parameter
  if (!idParam && idParam !== '0') {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid message ID'
    })
  }

  const messageId = parseInt(idParam, 10)
  const filePath = path.resolve(process.cwd(), 'database/messages-with-comments.json')

  try {
    // Read and parse data
    const data = readFileSync(filePath, 'utf8')
    const messages: MessageWithComment[] = JSON.parse(data)

    // Find target message
    const targetMessage = messages.find(item => item.id === messageId)

    if (!targetMessage) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Message not found'
      })
    }

    // Return comments with success status
    return {
      status: 'success',
      data: {
        comments: targetMessage.comments || [],
        messageId: targetMessage.id
      }
    }
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Invalid JSON data format'
      })
    }

    // Handle file system errors
    // @ts-expect-error ....
    if (error.code === 'ENOENT') {
      throw createError({
        statusCode: 500,
        statusMessage: 'Data file not found'
      })
    }

    // Propagate other handled errors
    // @ts-expect-error ....
    if (error.statusCode) throw error

    // Catch-all for unknown errors
    throw createError({
      statusCode: 500,
      // @ts-expect-error ....
      statusMessage: `Internal server error: ${error.message}`
    })
  }
})
