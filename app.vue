<template>
  <div class="min-h-full dark:bg-slate-900 dark:text-slate-400 overflow-hidden">
    <Header />
    <main>
      <div class="mx-auto max-w-screen-2xl sm:px-6 lg:px-8">
        <div class="flex w-full gap-5 h-screen pb-16">
          <Inputs @updatedInput="fetchResult" class="overflow-scroll pl-1 pr-1" />
          <Outputs :result="result" :is-fetching="isFetching" class="overflow-scroll flex-1 pr-3" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  const result = ref({})
  const isFetching = ref(false)
  const fetchResult = async (input: any) => {
    isFetching.value = true
    for (const [key, value] of Object.entries(input.variables)) {
      if (typeof value === "string") {
        input.variables[key] = Number(value)
      }
    }
    const r = await $fetch("https://app.agiliate.ai/engine/calculate", {
    // const r = await $fetch("http://localhost:1337/calculate", {
      method: "POST",
      body: input,
      parseResponse: JSON.parse,
      headers: {
        "Content-Type": "text/plain"
      }
    })
    isFetching.value = false
    result.value = r
  }
</script>

<style>
  body {
    overflow: hidden;
  }
</style>
