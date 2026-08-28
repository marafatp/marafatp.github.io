<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

import { onMounted } from 'vue'
import { initCustomScripts } from '@/utils/custom.js' // adjust the path if needed

onMounted(() => {
  initCustomScripts()
})
</script>

<template>
  <Navbar />
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <Footer />
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
