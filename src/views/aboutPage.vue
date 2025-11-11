<script setup>
import NavBar from '@/components/navBar.vue';
import footerComp from '@/components/footerComp.vue';
</script>

<template>
  <div class="bg-neutral-100 min-h-screen flex flex-col font-sans">
    <!-- NAVBAR -->
    <NavBar />

    <!-- HERO ABOUT -->
    <section
      class="flex flex-col items-center justify-center text-center px-6 md:px-20 py-24 bg-gradient-to-br from-neutral-50 to-gray-100">
      <h1 class="text-5xl font-extrabold text-gray-800 leading-tight">
        About <span class="text-amber-500">TaskFlow</span>
      </h1>
      <p class="mt-6 text-gray-600 text-lg leading-relaxed max-w-3xl">
        TaskFlow was created with one mission: to help individuals and teams stay
        organized, collaborate effectively, and achieve their goals with ease.
        We believe productivity tools should be simple yet powerful.
      </p>
    </section>

    <!-- OUR STORY -->
    <section class="px-6 md:px-20 py-20 bg-white">
      <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <img src="/img/img2.jpg" alt="TaskFlow Team" class="rounded-2xl shadow-xl w-full object-cover" />
        <div>
          <h2 class="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
          <p class="text-gray-600 leading-relaxed mb-4">
            TaskFlow started as a small project, designed
            to simplify task management for students and freelancers. Over time,
            it grew into a collaborative platform for teams of all sizes.
          </p>
          <p class="text-gray-600 leading-relaxed">
            With a strong focus on usability and performance, we continue to
            develop features that make managing work easier and smarter.
          </p>
        </div>
      </div>
    </section>

    <!-- VISION & MISSION -->
    <section class="px-6 md:px-20 py-20 bg-neutral-50">
      <div class="max-w-4xl mx-auto text-center">
        <h2 class="text-3xl font-bold text-gray-800">Our Vision & Mission</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
          <div class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-amber-500 mb-3">Vision</h3>
            <p class="text-gray-600 leading-relaxed">
              To empower people and organizations worldwide to achieve more
              through simple, intuitive, and effective task management.
            </p>
          </div>
          <div class="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <h3 class="text-xl font-semibold text-amber-500 mb-3">Mission</h3>
            <p class="text-gray-600 leading-relaxed">
              Deliver a lightweight, secure, and user-friendly platform that
              adapts to your workflow and scales with your needs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- OUR TEAM -->
    <section class="px-6 md:px-20 py-20 bg-white w-full">
      <div class="flex justify-center items-center">
        <div class="max-w-5xl mx-auto text-center">
          <h2 class="text-3xl font-bold text-gray-800">Meet Our Team</h2>
          <p class="text-gray-600 mt-4 mb-10">
            A passionate group of developers, designers, and innovators working together.
          </p>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div class="bg-neutral-50 rounded-xl shadow-md p-6">
              <img
                src="https://png.pngtree.com/png-vector/20241225/ourlarge/pngtree-professional-male-avatar-in-suit-png-image_14855076.png"
                alt="Team Member" class="w-24 h-24 mx-auto rounded-full mb-4 object-cover shadow-lg" />
              <h3 class="text-lg font-semibold text-gray-800">Mulya</h3>
              <p class="text-sm text-gray-500">Web Dev</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footerComp />
  </div>
</template>
