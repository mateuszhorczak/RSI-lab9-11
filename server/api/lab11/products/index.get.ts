import { readFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async () => {
  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))
  return products
})
