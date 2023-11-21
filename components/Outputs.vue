<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Output</h1>
    <table class="w-full min-w-full font-mono result-table">
      <tr v-for="(value, key) in result.totals">
        <td class="py-2 capitalize">{{ formatKey(key.toString()) }}</td>
        <td class="text-right py-2">
          <span :key="value" class="inline-block glowanim">{{ value.toLocaleString() + ism2(key.toString()) }}</span>
        </td>
      </tr>
    </table>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Room spec</h1>
    <table v-if="result.spaces" class="w-full min-w-full divide-y divide-slate-400 font-mono capitalize">
      <thead>
        <tr class="divide-x divide-slate-400">
          <th scope="col">Space</th>
          <th scope="col">Space</th>
          <th scope="col">Space</th>
          <th scope="col">Area m²</th>
          <th scope="col"># Rooms</th>
          <th scope="col"># Seats</th>
        </tr>
      </thead>
      <template v-for="value in result.spaces">
        <tbody class="divide-y h-72 divide-slate-400">
          <tr class="divide-x divide-slate-400">
            <td :rowspan="rowSpan(value.spaces, 1)" class="-rotate-90 text-center whitespace-nowrap h-10">{{ value.name }}<br>{{ Math.ceil(value.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }} m²</td>
          </tr>
          <template v-for="value2 in value.spaces">
            <tr class="divide-x divide-slate-400">
              <td :rowspan="rowSpan(value2.spaces, 0)">{{ value2.name.split('–')[0] }}</td>
              <template v-if="!value2.spaces || value2.spaces === 0">
                <td colspan="2" class="text-right"><span :key="Math.ceil(value2.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation)" class="inline-block glowanim">{{ Math.ceil(value2.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</span></td>
              </template>
            </tr>
            <template v-for="value3 in value2.spaces">
              <tr class="divide-x divide-slate-400">
                <td>{{ value3.name.split('–')[0] }}</td>
                <td class="text-right pr-1"><span :key="Math.ceil(value3.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation)" class="inline-block glowanim">{{ Math.ceil(value3.result.adjustedAreaInclCompensationWithAdjustmentAndCompensation) }}</span></td>
                <td class="text-right pr-1"><span v-if="value3.result.numberOfRooms !== 0" :key="value3.result.numberOfRooms" class="inline-block glowanim">{{ value3.result.numberOfRooms }}</span></td>
                <td class="text-right"><span v-if="value3.result.numberOfSeats !== 0" :key="value3.result.numberOfSeats" class="inline-block glowanim">{{ value3.result.numberOfSeats }}</span></td>
              </tr>
            </template>
          </template>
        </tbody>
      </template>
    </table>
  </div>
</template>

<script lang="ts" setup>
  defineProps(['result', 'isFetching'])
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
  const formatKey = (key: string): string => {
    return key.split(/(?=[A-Z])/).join(' ')
  }
  const m2s = [
    'adjustedAreaInclCompensationWithAdjustmentAndCompensation',
    'compensationArea',
    'grossArea',
    'netArea',
    'unadjustedArea',
    'utilityFloorSpace',
    'workplaceArea'
  ]
  const ism2 = (key: string): string => {
    if (m2s.includes(key)) {
      return ' m²'
    }
    return ''
  }
</script>

<style>
  .dark .result-table {
    tr:nth-child(even) { background: rgb(var(--color-gray-800)) }
  }
  .result-table {
    tr:nth-child(even) { background: #CCC }
  }
  .glowanim {
    animation: glow 1.2s;
  }
  @keyframes glow {
    60% {
      color: #00ff00
    }
  }
</style>
