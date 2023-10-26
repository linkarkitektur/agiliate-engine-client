<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Output</h1>
    <div v-for="(value, key) in result.totals" class="py-2 font-mono flex">
      <div class="flex-1">{{ key }}</div>
      <div>{{ value }}</div>
    </div>
    <table v-if="result.spaces" class="w-full min-w-full divide-y divide-gray-300">
      <thead>
        <tr class="divide-x divide-gray-200">
          <th>Space</th>
          <th>Area</th>
          <th>Space</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 bg-white">
        <template v-for="(value, key) in result.spaces">
          <tr class="divide-x divide-gray-200">
            <td :rowspan="value.spaces ? value.spaces.length + 1 : 1" class="-rotate-90 text-center whitespace-nowrap h-10">{{ value.name }}</td>
            <td :rowspan="value.spaces ? value.spaces.length + 1 : 1">{{ value.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation }}</td>
          </tr>
          <template v-for="(value2, key2) in value.spaces">
            <tr class="divide-x divide-gray-200">
              <td>{{ value2.name }}</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['result'])
</script>
