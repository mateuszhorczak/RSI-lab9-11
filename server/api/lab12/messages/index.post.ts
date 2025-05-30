import { readFileSync, writeFileSync } from 'fs'
import path from 'path'
import type { MessageWithComment } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Validate required fields
  if (!body.id || !body.name) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields: id and name are mandatory'
    })
  }

  const newMessage: MessageWithComment = {
    id: body.id,
    name: body.name,
    text: body.text || 'brak',
    comments: []
  }

  const filePath = path.resolve(process.cwd(), 'database/messages-with-comments.json')
  const messages: MessageWithComment[] = JSON.parse(readFileSync(filePath, 'utf8'))

  // Check for duplicate ID
  if (messages.some(m => m.id === newMessage.id)) {
    throw createError({
      statusCode: 409,
      statusMessage: 'Message ID already exists'
    })
  }

  messages.push(newMessage)
  writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8')

  // Set headers and return response
  const resourceUrl = `http://${event.node.req.headers.host}/api/lab12/messages/${newMessage.id}`
  setResponseStatus(event, 201, 'Created')
  setHeader(event, 'Location', resourceUrl)

  return {
    status: 'success',
    message: 'Message created successfully',
    data: {
      id: newMessage.id,
      resource_url: resourceUrl
    }
  }
})
