import { readFileSync, writeFileSync } from 'fs'
import type { Message, MessageWithComment } from '~/types'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id')!, 10) // Get message ID

  const body = await readBody(event)
  const newComment: Message = {
    id: body.id,
    name: body.name,
    text: body.text,
  }

  // Validate required fields
  if (!newComment.id || !newComment.name || !newComment.text) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  const filePath = 'database/messages-with-comments.json'
  const messages: MessageWithComment[] = JSON.parse(readFileSync(filePath, 'utf8'))

  // Find message by ID (not array index)
  const message = messages.find(m => m.id === id)
  if (!message) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Message not found'
    })
  }

  // Add comment to correct property
  message.comments.push(newComment)

  writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8')

  return {
    status: 'success',
    message: message
  }
})
