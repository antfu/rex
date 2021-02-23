<script setup lang="ts">
import { isDark, toggleDark } from '~/logics'
</script>

<template>
  <nav class="text-xl mt-6">
    <a class="icon-btn mx-2" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </a>
  </nav>
</template>
