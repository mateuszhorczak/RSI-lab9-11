import { readFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const name = query.name as string
  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))

  return !name ? [] : products.filter(item => item.name.toLowerCase().includes(name.toLowerCase()))
})
