<template>
  <div class="min-h-full">
    <Header />
    <main>
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="flex w-full gap-5">
          <Inputs @updatedInput="fetchResult" />
          <Outputs :result="result" class="grow" />
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  const result = ref({})
  const fetchResult = async (input: any) => {
    for (let [key, value] of Object.entries(input.variables)) {
      if (typeof value === "string") {
        input.variables[key] = Number(value)
      }
    }
    const r = await $fetch("https://agiliate.nodalit.com/engine/calculate", {
      method: "POST",
      body: input,
      parseResponse: JSON.parse
    })
    result.value = r
  }
</script>
