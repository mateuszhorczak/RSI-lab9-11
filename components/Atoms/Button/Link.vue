<script setup lang="ts">
defineProps({
  name: String,
})
</script>

<template>
  <UButton
    color="primary"
    variant="link"
    :label="name"
    class="cursor-pointer"
  />
</template>
