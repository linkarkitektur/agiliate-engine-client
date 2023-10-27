<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Output</h1>
    <div v-for="(value, key) in result.totals" class="py-2 font-mono flex">
      <div class="flex-1">{{ key }}</div>
      <div>{{ value }}</div>
    </div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Room details</h1>
    <table v-if="result.spaces" class="w-full min-w-full divide-y divide-gray-300 font-mono">
      <thead>
        <tr class="divide-x">
          <th scope="col">Space</th>
          <th scope="col">Area m²</th>
          <th scope="col">Space</th>
          <th scope="col">Space</th>
          <th scope="col">Area m²</th>
        </tr>
      </thead>
      <template v-for="value in result.spaces">
        <tbody class="divide-y h-72">
          <tr class="divide-x">
            <td :rowspan="rowSpan(value.spaces, 1)" class="-rotate-90 text-center whitespace-nowrap h-10">{{ value.name }}</td>
            <td :rowspan="rowSpan(value.spaces, 1)" class="text-center">{{ Math.ceil(value.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</td>
          </tr>
          <template v-for="value2 in value.spaces">
            <tr class="divide-x">
              <td :rowspan="rowSpan(value2.spaces, 0)">{{ value2.name }}</td>
              <template v-if="!value2.spaces || value2.spaces === 0">
                <td colspan="2" class="text-right">{{ Math.ceil(value2.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</td>
              </template>
            </tr>
            <template v-for="value3 in value2.spaces">
              <tr class="divide-x">
                <td>{{ value3.name }}</td>
                <td class="text-right">{{ Math.ceil(value3.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</td>
              </tr>
            </template>
          </template>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script lang="ts" setup>
  const props = defineProps(['result'])
  const rowSpan = (spaces: Array<any>, maxLevels: number): number => {
    if (spaces) {
      return spaces.reduce((acc, space) => {
        if (space.spaces && space.spaces.length > 0 && maxLevels > 0) {
          return acc + rowSpan(space.spaces, maxLevels - 1)
        } else {
          return acc + 1
        }
      }, 1)
    } else {
      return 1
    }
  }
</script>
