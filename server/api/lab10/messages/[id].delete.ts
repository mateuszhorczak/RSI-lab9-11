import { readFileSync, writeFileSync } from 'fs'
import type { Message } from '~/types'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0', 10)

  const messages: Message[] = JSON.parse(readFileSync('database/messages.json', 'utf8'))

  const messageIndex = messages.findIndex(message => message.id === id)

  if (messageIndex === -1) {
    return
  }
  messages.splice(messageIndex, 1)

  const jsonData = JSON.stringify(messages, null, 2)
  writeFileSync('database/messages.json', jsonData, 'utf8')
})
