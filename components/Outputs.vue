<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Output</h1>
    <div v-for="(value, key) in result.totals" class="py-2 font-mono flex">
      <div class="flex-1">{{ key }}</div>
      <div>{{ value }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['result'])
</script>
