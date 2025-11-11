<script setup>
import axios from "axios"
import { ref, onMounted, watch, computed } from "vue"
import { useState } from "@/stores/state"

const state = useState()
const chartContainer = ref(null)
const chart = ref(null)

const done = ref(0)
const pending = ref(0)

const taskTotal = computed(() => done.value + pending.value)

watch(() => state.selectedId, (newVal) => {
  if (newVal) {
    axios.get(`/task/${newVal}/room`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then(res => {

      console.log(res.data.done.length)
      done.value = res.data.done.length
      pending.value = res.data.pending.length

      updateChart()
    })
  }
}, { immediate: true })

onMounted(() => {
  chart.value = window.Highcharts.chart(chartContainer.value, {
    chart: { type: "pie", backgroundColor: "transparent" },
    title: null,
    series: [
      {
        name: "Tasks",
        colorByPoint: true,
        data: [
          { name: "Done", y: 0 },
          { name: "Pending", y: 0 },
        ],
      },
    ],
  })
})

function updateChart() {
  if (!chart.value) return

  chart.value.series[0].setData([
    { name: "Done", y: done.value },
    { name: "Pending", y: pending.value },
  ])
}

</script>

<template>
  <div ref="chartContainer" class="w-full h-[300px]"></div>
  <hr class="border-neutral-200">
  <div class="p-2 flex justify-between">
    <span>Total Task</span>
    <span class="text-blue-500 font-semibold text-2xl">{{ taskTotal }}</span>
  </div>
  <hr class="border-neutral-200">
  <div class="p-2 flex justify-between">
    <span>Pending</span>
    <span class="text-red-500 font-semibold text-2xl">{{ pending }}</span>
  </div>
  <hr class="border-neutral-200">
  <div class="p-2 flex justify-between">
    <span>Completed</span>
    <span class="text-green-500 font-semibold text-2xl">{{ done }}</span>
  </div>
  <hr class="border-neutral-200">
</template>
