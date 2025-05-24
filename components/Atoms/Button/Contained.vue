<script setup lang="ts">
const props = defineProps<{
  label: string
  icon: string
}>()
</script>

<template>
  <UButton
    :label="props.label"
    :icon="props.icon"
    variant="solid"
  />
</template>
