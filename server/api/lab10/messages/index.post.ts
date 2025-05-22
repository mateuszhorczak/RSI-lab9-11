import { readFileSync, writeFileSync } from "fs";
import type { Message } from "~/types";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newMessage: Message = {
    id: body.id,
    name: body.name,
    text: body.text || 'brak',
  }

  if (!newMessage.id || !newMessage.name) {
    return
  }

  const messages: Message[] = JSON.parse(readFileSync('database/messages.json', 'utf8'));
  messages.push(newMessage);
  const jsonData = JSON.stringify(messages, null, 2);
  writeFileSync('database/messages.json', jsonData, 'utf8')
})
