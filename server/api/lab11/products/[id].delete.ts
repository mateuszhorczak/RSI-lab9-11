import { readFileSync, writeFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const id = parseInt(getRouterParam(event, 'id') || '0', 10)

  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))

  const productIndex = products.findIndex(item => item.id === id)

  if (productIndex === -1) {
    return
  }
  products.splice(productIndex, 1)

  const jsonData = JSON.stringify(products, null, 2)
  writeFileSync('database/products.json', jsonData, 'utf8')
})
