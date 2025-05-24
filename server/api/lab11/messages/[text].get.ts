import { readFileSync } from 'fs'
import type { Message } from '~/types'

export default defineEventHandler(async (event) => {
  const text = getRouterParam(event, 'text')
  const messages: Message[] = JSON.parse(readFileSync('database/messages.json', 'utf8'))
  return !text ? {} : messages.filter(item => item.text.toLowerCase().startsWith(text.toLowerCase()))
})
