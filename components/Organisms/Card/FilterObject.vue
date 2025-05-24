<script setup lang="ts">
const productStore = useProductStore()
</script>

<template>
  <MoleculesFormsFilterObject />
  {{ productStore.products }}
</template>
