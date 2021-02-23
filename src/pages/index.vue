<script setup lang="ts">
import { findRaw, flags, error, content, replaceRaw, replace, matchResult } from '~/logics'
</script>

<template>
  <div>
    <NavBar />
    <div class="flex flex-col">
      <div class="flex mx-2">
        <input
          v-model="findRaw"
          class="flex-auto"
          type="text"
        >
        <input v-model="flags" type="text">
      </div>
      <div class="flex mx-2">
        <input
          v-model="replaceRaw"
          class="flex-auto"
          type="text"
        >
        <button class="m-1 p-2 px-4 gray-border rounded" @click="replace">
          Replace All
        </button>
      </div>
    </div>
    <div
      v-if="error"
      class="fixed top-0 right-0 bg-orange-400 text-orange-500 bg-opacity-10 border border-orange-500 py-1 px-4 rounded-bl -m-1px"
    >
      {{ error }}
    </div>
    <div class="flex">
      <textarea v-model="content" class="w-1/2 h-40em font-mono text-sm" />
      <textarea :value="matchResult" readonly class="w-1/2 h-40em font-mono text-sm" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
input {
  @apply gray-border p-2 m-1 block rounded bg-transparent;
}
textarea {
  @apply bg-transparent outline-none p-4;
}
</style>
