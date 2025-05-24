<script setup lang="ts">
const productStore = useProductStore()
await productStore.getProducts()
</script>

<template>
  <AtomsSubHeading>Wszystkie produkty</AtomsSubHeading>
  {{ productStore.products }}
</template>
