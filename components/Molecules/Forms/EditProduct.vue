<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Product } from '~/types'

const productStore = useProductStore()

const schema = z.object({
  id: z.number().int().positive(),
  name: z.string().trim().nonempty(),
  price: z.number().positive(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  id: undefined,
  name: undefined,
  price: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const updatedProduct: Product = {
    id: event.data.id,
    name: event.data.name,
    price: event.data.price,
  }
  await productStore.updateProduct(updatedProduct)
  const router = useRouter()
  await router.push('/lab11')
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Id produktu"
      name="id"
    >
      <UInput
        v-model="state.id"
        type="number"
      />
    </UFormField>

    <UFormField
      label="Nazwa produktu"
      name="name"
    >
      <UInput v-model="state.name" />
    </UFormField>

    <UFormField
      label="Cena produktu"
      name="price"
    >
      <UInput
        v-model="state.price"
        type="number"
      />
    </UFormField>

    <AtomsButtonContained
      icon="i-mdi-pencil"
      label="Edytuj produkt"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
