import { readFileSync } from 'fs'
import { create } from 'xmlbuilder2'
import type { Message } from '~/types'

function arrayToXML(messages: Message[]) {
  const root = create({ version: '1.0', encoding: 'UTF-8' })
    .ele('items')

  messages.forEach((item) => {
    root.ele('item')
      .ele('id').txt(item.id.toString()).up()
      .ele('name').txt(item.name).up()
      .ele('text').txt(item.text).up()
  })

  return root.end({ prettyPrint: true })
}

export default defineEventHandler(async (event) => {
  const messages = JSON.parse(readFileSync('database/messages.json', 'utf8'))

  const xml = arrayToXML(messages)

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
