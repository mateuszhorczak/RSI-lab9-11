import { readFileSync, writeFileSync } from 'fs'
import type { Product } from '~/types'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const newProduct: Product = {
    id: body.id,
    name: body.name,
    price: body.price,
  }

  const products: Product[] = JSON.parse(readFileSync('database/products.json', 'utf8'))
  products[body.id] = newProduct

  const productIndex = products.findIndex(item => item.id === body.id)

  if (productIndex !== -1) {
    products[productIndex] = newProduct
  }
  else {
    products.push(newProduct)
  }

  const jsonData = JSON.stringify(products, null, 2)
  writeFileSync('database/products.json', jsonData, 'utf8')
})
