import { readFileSync } from 'fs'

export default defineEventHandler(async (event) => {
  return JSON.parse(readFileSync('database/messages.json', 'utf8'));
})
