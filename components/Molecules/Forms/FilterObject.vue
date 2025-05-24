<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const productStore = useProductStore()

const schema = z.object({
  name: z.string().trim().nonempty(),
  price: z.number().nonnegative(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  price: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await productStore.filterProduct(event.data.name, event.data.price)
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
      icon="i-mdi-archive-search"
      label="Wyszukaj"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
