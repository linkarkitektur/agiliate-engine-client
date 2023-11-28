<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Input</h1>
    <div v-for="(value, key) in input.variables" class="py-2 font-mono">
      <div v-if="typeof value === 'number'">
        <span class="capitalize">{{ formatKey(key) }}</span>
        <UInput v-model="(input.variables[key] as number)" @input="updated" type="number" min="0" :max="max(key)" :step="step(key)" />
      </div>
      <div v-else-if="typeof value === 'boolean'" class="flex items-center capitalize">
        <UCheckbox v-model="(input.variables[key] as boolean)" @change="updated" class="mr-2" :label="formatKey(key)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import debounce from 'lodash/debounce'

  const emit = defineEmits(['updatedInput'])
  let input = {
    variables: {
      "numberOfEmployees": 330,
      "seatsInAuditorium": 50,
      "concurrencyAttendanceShare": 1.0,
      "peakConcurrencyAttendanceShare": 1.0,
      "overCapacityShare": 0.0,
      "homeOfficeAverageShare": 0.0,
      "shareOfEmployeesInAuditorium": 0.30,
      "touchdownShare": 0.05,
      "dockinShare": 0.21,
      "coworkingShare": 0.00,
      "cellOfficeShare": 0.00,
      "landscapeShare": 0.36,
      "projectroomShare": 0.20,
      "focusroomShare": 0.11,
      "quietzoneShare": 0.07,
      "miniMeetingroomShare": 0.21,
      "smallMeetingroomShare": 0.30,
      "mediumMeetingroomShare": 0.36,
      "largeMeetingroomShare": 0.13,
      "specialAreaOffice": 80,
      "specialAreaShared": 0,
      "specialAreaCommon": 100,
      "accessToCoworking": false,
      "accessToCanteen": true,
      "accessToCourseSpace": true,
      "accessToAuditorium": true,
      "accessToCellOffice": true,
      "accessToReception": false,
      "accessToExercise": true,
    }
  }
  const updated = debounce(async () => {
    await nextTick()
    emit("updatedInput", input)
  }, 500, {
    leading: true,
    trailing: true
  })
  emit("updatedInput", input)
  const max = (name: string): number => {
    return name.includes('Share') ? 1 : Infinity
  }
  const step = (name: string): string|number => {
    return name.includes('Share') ? 0.05 : 'any'
  }
  const formatKey = (key: string): string => {
    return key.split(/(?=[A-Z])/).join(' ')
  }
</script>
