import { readFileSync, writeFileSync } from 'fs'
import type { Message } from '~/types'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0', 10)

  const body = await readBody(event)
  const newMessage: Message = {
    id: body.id,
    name: body.name,
    text: body.text || 'brak',
  }

  const messages: Message[] = JSON.parse(readFileSync('database/messages.json', 'utf8'))
  messages[id] = newMessage

  const messageIndex = messages.findIndex(message => message.id === id)

  if (messageIndex !== -1) {
    messages[messageIndex] = newMessage
  }
  else {
    messages.push(newMessage)
  }

  const jsonData = JSON.stringify(messages, null, 2)
  writeFileSync('database/messages.json', jsonData, 'utf8')
})
