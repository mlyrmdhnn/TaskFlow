<template>
  <footer id="contact" class="bg-[#2C2C3C] text-neutral-300 py-12 mt-auto">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6 text-center md:text-left">
      <!-- Brand -->
      <div>
        <h2 class="text-2xl font-bold text-white">TaskFlow</h2>
        <p class="mt-4 text-sm text-neutral-400 leading-relaxed">
          Simple & powerful task management app.
          Stay organized, boost productivity, and achieve your goals.
        </p>
      </div>
      <!-- Links -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Quick Links</h3>
        <ul class="space-y-2">
          <li><router-link to="/" class="hover:text-neutral-500 transition">Home</router-link></li>
          <li><router-link to="/features" class="hover:text-neutral-500 transition">Features</router-link></li>
          <li><router-link to="/about" class="hover:text-neutral-500 transition">About</router-link></li>
          <li><router-link to="/contact" class="hover:text-neutral-500 transition">Contact</router-link></li>
          <li><router-link to="/faq" class="hover:text-neutral-500 transition">FAQ</router-link></li>
        </ul>
      </div>
      <!-- Contact -->
      <div>
        <h3 class="text-lg font-semibold text-white mb-4">Get in Touch</h3>
        <p class="text-sm text-neutral-400">Email: taskflowcomp@gmail.com</p>
        <p class="text-sm text-neutral-400 mb-4">Phone: +62 812 3456 7890</p>
        <div class="flex justify-center md:justify-start space-x-4 mt-2">
          <a href="#" class="hover:text-amber-500 transition"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="hover:text-amber-500 transition"><i class="fab fa-twitter"></i></a>
          <a href="#" class="hover:text-amber-500 transition"><i class="fab fa-instagram"></i></a>
          <a href="#" class="hover:text-amber-500 transition"><i class="fab fa-linkedin-in"></i></a>
        </div>
      </div>
    </div>
    <!-- Bottom -->
    <div class="border-t border-neutral-700 mt-10 pt-6 text-center text-neutral-500 text-sm">
      <p>&copy; 2025 TaskFlow. All rights reserved.</p>
    </div>
  </footer>
</template>