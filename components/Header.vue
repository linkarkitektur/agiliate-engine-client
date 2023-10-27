<template>
  <ClientOnly>
    <header :class="{ 'bg-gray-900': colorMode.value === 'dark', 'bg-gray-300': colorMode.value === 'light' }">
      <nav class="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8" aria-label="Global">
        <div class="flex lg:flex-1">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Agiliate</span>
            <Logo class="h-8 w-auto" />
          </a>
        </div>
        <div class="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center">
          <ColorModeButton />
          <div class="flex p-2.5">
            <a href="https://github.com/nodalit">
              <img :src="githublogo" class="h-6" alt="Github logo" />
            </a>
          </div>
        </div>
      </nav>
    </header>  
  </ClientOnly>
</template>

<script setup langt="ts">
  const colorMode = useColorMode()
  const githublogo = computed(() => {
    return colorMode.value === 'dark' ? 'github-mark-white.png' : 'github-mark.png'
  })
</script>
