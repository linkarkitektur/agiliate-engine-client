<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Output</h1>
    <table class="w-full min-w-full font-mono result-table">
      <tr v-for="(value, key) in result.totals">
        <td class="py-2">{{ key }}</td>
        <td class="text-right py-2">
          <span :key="value" class="inline-block glowanim">{{ value }}</span>
        </td>
      </tr>
    </table>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Room details</h1>
    <table v-if="result.spaces" class="w-full min-w-full divide-y divide-gray-300 font-mono capitalize">
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
            <td :rowspan="rowSpan(value.spaces, 1)" class="text-center"><span :key="value" class="inline-block glowanim">{{ Math.ceil(value.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</span></td>
          </tr>
          <template v-for="value2 in value.spaces">
            <tr class="divide-x">
              <td :rowspan="rowSpan(value2.spaces, 0)">{{ value2.name.split('–')[0] }}</td>
              <template v-if="!value2.spaces || value2.spaces === 0">
                <td colspan="2" class="text-right"><span :key="value" class="inline-block glowanim">{{ Math.ceil(value2.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</span></td>
              </template>
            </tr>
            <template v-for="value3 in value2.spaces">
              <tr class="divide-x">
                <td>{{ value3.name.split('–')[0] }}</td>
                <td class="text-right"><span :key="value" class="inline-block glowanim">{{ Math.ceil(value3.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</span></td>
              </tr>
            </template>
          </template>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script lang="ts" setup>
  defineProps(['result'])
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

<style>
  .dark .result-table {
    tr:nth-child(even) { background: rgb(var(--color-gray-900)) }
  }
  .result-table {
    tr:nth-child(even) { background: #CCC }
  }
  .glowanim {
    animation: glow 1.2s;
  }
  @keyframes glow {
    0%, 100% {
      text-shadow: none;
    }
    60% {
      text-shadow: 0 0 1px #38a169, 0 0 5px #38a169, 0 0 10px #38a169, 0 0 15px #38a169;
    }
  }
</style>
