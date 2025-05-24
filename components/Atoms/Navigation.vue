<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Strona Główna',
    icon: 'i-mdi-home',
    to: '/',
  },
  {
    label: 'lab11',
    icon: 'i-mdi-magnify',
    children: [{
      label: 'Produkty',
      icon: 'i-mdi-cart',
      to: '/lab11',
    },
    {
      label: 'Wyszukaj po nazwie',
      icon: 'i-mdi-filter',
      to: '/lab11/filter-by-name',
    },
    {
      label: 'Stwórz',
      icon: 'i-mdi-plus-circle',
      to: '/lab11/new',
    },
    {
      label: 'Edytuj',
      icon: 'i-mdi-pencil',
      to: '/lab11/update',
    },
    {
      label: 'Usuń',
      icon: 'i-mdi-trash',
      to: '/lab11/delete',
    },
    {
      label: 'Filtruj',
      icon: 'i-mdi-filter-cog',
      to: '/lab11/filter',
    }],
  },
])
</script>

<template>
  <div class="flex">
    <UNavigationMenu
      :items="items"
      highlight
      class="mx-auto px-12"
    />
  </div>
</template>
