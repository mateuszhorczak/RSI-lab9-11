import { readFileSync, writeFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newProduct: Product = {
    id: body.id,
    name: body.name,
    price: body.price,
  }

  if (!newProduct.id || !newProduct.name) {
    return
  }

  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))
  products.push(newProduct)
  const jsonData = JSON.stringify(products, null, 2)
  writeFileSync('database/products.json', jsonData, 'utf8')
})
