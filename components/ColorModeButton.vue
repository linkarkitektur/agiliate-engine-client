<template>
  <ClientOnly>
    <UButton
      :icon="isDark ? 'i-heroicons-moon-solid' : 'i-heroicons-sun-solid'"
      color="gray"
      variant="ghost"
      aria-label="Theme"
      @click="isDark = !isDark"
      size="xl"
    />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup>
  const colorMode = useColorMode()
  const isDark = computed({
    get () {
      return colorMode.value === 'dark'
    },
    set () {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    }
  })
</script>
