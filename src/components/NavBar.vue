<script setup lang="ts">
import { isDark, toggleDark, history, cleanup } from '~/logics'
</script>

<template>
  <nav class="py-1 px-4 pt-2 flex">
    <h1 class="inline-block ml-1 mr-2 font-mono mt-1">
      <b>Re</b>X
    </h1>

    <button
      class="mx-2 icon"
      :disabled="!history.canUndo.value"
      @click="history.undo"
    >
      <carbon-undo />
    </button>
    <button
      class="mx-2 icon"
      :disabled="!history.canRedo.value"
      @click="history.redo"
    >
      <carbon-redo />
    </button>
    <button
      class="mx-2 icon"
      @click="cleanup"
    >
      <carbon-clean />
    </button>
    <div class="flex-auto" />
    <button class="mx-2 icon" @click="toggleDark">
      <carbon-moon v-if="isDark" />
      <carbon-sun v-else />
    </button>
  </nav>
</template>
