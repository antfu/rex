<script setup lang="ts">
import { error } from '~/logics'
</script>

<template>
  <div
    v-if="error"
    class="fixed top-0 bg-orange-400 text-orange-500 bg-opacity-10 border border-orange-500 py-1 px-4 rounded-b -mt-1px"
    style="left:50%; transform: translateX(-50%);"
  >
    {{ error }}
  </div>
</template>
