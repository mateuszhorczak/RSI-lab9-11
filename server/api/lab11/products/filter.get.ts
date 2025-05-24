import { readFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const name = query.name as string
  const price = parseFloat(query.price as string)

  if (!name || !price) {
    return
  }

  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))
  return products.filter(item =>
    item.name.toLowerCase().includes(name.toLowerCase())
    && item.price <= price,
  )
})
