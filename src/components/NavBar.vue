<script setup lang="ts">
import { isDark, toggleDark, history, cleanup } from '~/logics'
</script>

<template>
  <nav class="py-2 px-4 pt-2">
    <h1 class="inline-block mr-2">
      ReX
    </h1>

    <button
      class="mx-2 !outline-none"
      :disabled="!history.canUndo.value"
      @click="history.undo"
    >
      <carbon-undo />
    </button>
    <button
      class="mx-2 !outline-none"
      :disabled="!history.canRedo.value"
      @click="history.redo"
    >
      <carbon-redo />
    </button>
    <button
      class="mx-2 !outline-none"
      @click="cleanup"
    >
      <carbon-clean />
    </button>
    <button class="mx-2 !outline-none" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>
  </nav>
</template>

<style lang="postcss">
[disabled] {
  @apply pointer-events-none opacity-50 cursor-default;
}
</style>
