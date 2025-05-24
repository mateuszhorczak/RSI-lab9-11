<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const productStore = useProductStore()

const schema = z.object({
  name: z.string().trim().nonempty(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await productStore.getProductsByName(event.data.name)
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

    <AtomsButtonContained
      icon="i-mdi-archive-search"
      label="Wyszukaj"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
