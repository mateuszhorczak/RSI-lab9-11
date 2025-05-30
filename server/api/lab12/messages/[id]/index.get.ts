import { readFileSync } from 'fs'
import type { MessageWithComment } from '~/types'

export default defineEventHandler(async (event) => {
  const baseUrl = getRequestURL(event).origin
  const id = parseInt(getRouterParam(event, 'id') || '0', 10)
  const messages: MessageWithComment[] = JSON.parse(readFileSync('database/messages-with-comments.json', 'utf8'))

  const links = [
    { rel: 'self', href: `${baseUrl}/api/lab12/messages/${id}`, method: 'GET' },
    { rel: 'create', href: `${baseUrl}/api/lab12/messages`, method: 'POST' },
    { rel: 'get-comments', href: `${baseUrl}/api/lab12/messages/${id}/comments`, method: 'GET' },
    { rel: 'create-comment', href: `${baseUrl}/api/lab12/messages/${id}/comments`, method: 'POST' }
  ]

  const result = messages.length < id ? {} : messages.filter(item => item.id === id)[0]

  return {
    data: result,
    links,
    _meta: {
      id
    }
  }
})
