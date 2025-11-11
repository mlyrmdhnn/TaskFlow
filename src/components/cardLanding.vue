<template>
  <div class="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition">
    <!-- Icon / Image -->
    <div class="flex justify-center mb-4">
      <component v-if="icon" :is="icon" class="w-16 h-16 text-amber-500" />
      <img v-else-if="image" :src="image" alt="feature illustration" class="w-20 h-20 object-contain" />
    </div>

    <!-- Description -->
    <p class="text-gray-700 text-lg">{{ desc }}</p>
  </div>
</template>

<script setup>
defineProps({
  image: String,
  icon: Object,
  desc: String
})
</script>
