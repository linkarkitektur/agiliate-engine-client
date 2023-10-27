<template>
  <div>
    <h1 class="text-3xl font-bold leading-tight tracking-tight py-3 font-mono">Input</h1>
    <div v-for="(value, key) in input.variables" class="py-2 font-mono">
      <div v-if="typeof value === 'number'">
        <span>{{ key }}</span>
        <UInput v-model="input.variables[key]" @input="updated" type="number"/>
      </div>
      <div v-else-if="typeof value === 'boolean'" class="flex items-center">
        <UCheckbox v-model="input.variables[key]" @change="updated" class="mr-2" />
        <span>{{ key }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import debounce from 'lodash/debounce'
  const emit = defineEmits(['updatedInput'])
  let input = {
    variables: {
      "specialAreaOffice": 80,
      "specialAreaShared": 0,
      "specialAreaCommon": 100,
      "seatsInAuditorium": 50,
      "numberOfEmployees": 330,
      "concurrencyAttendanceShare": 1.0,
      "peakConcurrencyAttendanceShare": 1.0,
      "overCapacityShare": 0.0,
      "homeOfficeAverageShare": 0.0,
      "shareOfEmployeesInAuditorium": 0.30,
      "touchdownShare": 0.0555,
      "dockinShare": 0.2197,
      "coworkingShare": 0.00,
      "cellOfficeShare": 0.00,
      "landscapeShare": 0.3630,
      "projectroomShare": 0.1891,
      "focusroomShare": 0.1054,
      "quietzoneShare": 0.0672,
      "miniMeetingroomShare": 0.2105,
      "smallMeetingroomShare": 0.3017,
      "mediumMeetingroomShare": 0.3600,
      "largeMeetingroomShare": 0.1277,
      "accessToCoworking": false,
      "accessToCanteen": true,
      "accessToCourseSpace": true,
      "accessToAuditorium": true,
      "accessToCellOffice": true,
      "accessToReception": false,
      "accessToExercise": true,
    }
  }
  const updated = debounce(() => {
    emit("updatedInput", input)
  }, 500)
  emit("updatedInput", input)
</script>
