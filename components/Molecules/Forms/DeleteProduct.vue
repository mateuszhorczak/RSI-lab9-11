<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const productStore = useProductStore()

const schema = z.object({
  id: z.number().nonnegative(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  id: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await productStore.deleteProduct(event.data.id)
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

    <AtomsButtonContained
      icon="i-mdi-delete"
      label="Usuń"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
