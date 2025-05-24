import type { Product } from '~/types'

export const useProductStore = defineStore('productStore', () => {
  const products = ref<Product[]>([])

  const getProductsByName = async (name: string) => {
    try {
      const { data } = await useFetch('/api/lab11/products/name', {
        method: 'GET',
        query: { name: name },
      })

      products.value = data.value || []
    }
    catch (error) {
      console.error(error)
    }
  }

  const getProducts = async () => {
    try {
      const { data } = await useFetch('/api/lab11/products', {
        method: 'GET',
      })
      products.value = data.value || []
    }
    catch (error) {
      console.error(error)
    }
  }

  const addProduct = async (product: Product) => {
    try {
      await $fetch('/api/lab11/products', {
        method: 'POST',
        body: product,
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const deleteProduct = async (id: number) => {
    try {
      await $fetch(`/api/lab11/products/${id}`, {
        method: 'DELETE',
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  const filterProduct = async (name: string, price: number) => {
    try {
      const obj = {
        name: name,
        price: price,
      }
      const { data } = await useFetch('/api/lab11/products/filter', {
        method: 'GET',
        query: obj,
      })

      products.value = data.value || []
    }
    catch (error) {
      console.error(error)
    }
  }

  const updateProduct = async (product: Product) => {
    try {
      await $fetch('/api/lab11/products', {
        method: 'PUT',
        body: product,
      })
    }
    catch (error) {
      console.error(error)
    }
  }

  return {
    products,
    getProductsByName,
    getProducts,
    addProduct,
    deleteProduct,
    filterProduct,
    updateProduct,
  }
})
