import { readFileSync } from "fs";
import type { Message } from "~/types";

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0', 10)
  const messages: Message[] = JSON.parse(readFileSync('database/messages.json', 'utf8'));
  return messages.length < id ? {} : messages.filter(item => item.id === id)[0]
})
