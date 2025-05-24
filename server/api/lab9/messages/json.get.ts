import { readFileSync } from 'fs'

export default defineEventHandler(async () => {
  return JSON.parse(readFileSync('database/messages.json', 'utf8'))
})
