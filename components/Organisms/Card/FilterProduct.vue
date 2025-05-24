<script setup lang="ts">
const productStore = useProductStore()
</script>

<template>
  <MoleculesFormsFilterProduct />
  {{ productStore.products }}
</template>
