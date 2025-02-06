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
    <div v-for="(value, key) in input.customConstants" class="py-2 font-mono">
      <div>
        <span class="capitalize">{{ formatKey(key) }}</span>
        <UInput v-model="(input.customConstants[key] as number)" @input="updated" type="number" min="0" :max="max(key)" :step="step(key)" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const emit = defineEmits(['updatedInput'])
  const input = {
    variables: {
      "numberOfEmployees": 1000,
      "workstationCapacityShare": 0.75,
      "seatsInCourseSpace": 25,
      "specialAreaOffice": 80,
      "specialAreaShared": 0,
      "specialAreaCommon": 100,
      "seatsInAuditorium": 80,
      "concurrencyAttendanceShare": 1.0,
      "peakConcurrencyAttendanceShare": 1.0,
      "overCapacityShare": 0.0,
      "homeOfficeAverageShare": 0.0,
      "shareOfEmployeesInAuditorium": 0.30,
      "touchdownShare": 0.06,
      "dockinShare": 0.22,
      "coworkingShare": 0.10,
      "cellOfficeShare": 0.05,
      "landscapeShare": 0.35,
      "projectroomShare": 0.19,
      "focusroomShare": 0.11,
      "quietzoneShare": 0.07,
      "miniMeetingroomShare": 0.21,
      "smallMeetingroomShare": 0.30,
      "mediumMeetingroomShare": 0.36,
      "largeMeetingroomShare": 0.13,
      "commonAreaProjectAndMeetingRoomsShare": 0.30,
      "accessToCoworking": false,
      "accessToCanteen": true,
      "accessToCourseSpace": true,
      "accessToAuditorium": true,
      "accessToCellOffice": false,
      "accessToTenantReception": true,
      "accessToCommonAreaReception": true,
      "accessToFitness": true,
      "accessToCommonAreaProjectAndMeetingRooms": true,
      "addPeakMarkupToWorkstationCapacityShare": false,
      "useCompensationFactorForWorkstations": true,
    },
    customConstants: {
      "governmentMinimumSquaremetersPerWorkSpace": 6,
      "walkwayShareWorkspace": 0.29,
      "walkwayShareCoworking": 0.14,
      "walkwayShareCommonArea": 0.12,
      "innerwallsAddonShare": 0.08,
      "usageRatioCommonArea": 0.33,
      "seatingRatioCommonArea": 0.33,
      "communicationAreaShare": 0.10,
      "technicalAreaShare": 0.29
    }
  }
  const updated = useDebounce(async () => {
    await nextTick()
    emit("updatedInput", input)
  }, 500, {
    leading: true,
    trailing: true
  })
  emit("updatedInput", input)
  const max = (name: string): number => {
    return name.includes('Share') ? 1 : Number.POSITIVE_INFINITY
  }
  const step = (name: string): string|number => {
    return name.includes('Share') ? 0.05 : 'any'
  }
  const formatKey = (key: string): string => {
    return key.split(/(?=[A-Z])/).join(' ')
  }
</script>
