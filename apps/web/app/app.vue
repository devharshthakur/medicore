<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <VueQueryDevtools />
  </UApp>
</template>
