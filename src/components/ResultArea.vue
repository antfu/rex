<script setup lang="ts">
import { content, fullResult, toggleMode, mode, applyResult, matches } from '~/logics'
</script>

<template>
  <div class="relative">
    <div class="w-1/2 h-full flex flex-col">
      <div>
        <div class="label">
          TEXT
        </div>
      </div>
      <Editor
        v-model="content"
        :matches="matches"
        class="flex-auto p-4"
      />
    </div>
    <div class="w-1px h-full bg-trueGray-400 bg-opacity-25" />
    <div class="w-1/2 h-full flex flex-col -m-1px">
      <div>
        <div class="label">
          RESULT
        </div>

        <button class="icon" @click="toggleMode">
          <carbon-transpose v-if="mode=='replace'" />
          <carbon-search v-else />
        </button>
      </div>
      <Editor
        :model-value="fullResult"
        :readonly="true"
        class="flex-auto p-4"
      />
    </div>

    <div
      class="absolute w-2em h-2em flex rounded-full border border-trueGray-400 border-opacity-25 bg-white cursor-pointer hover:shadow"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      @click="applyResult"
    >
      <carbon-chevron-left class="m-auto hover:text-orange-400 pt-2px pr-1px" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  @apply py-3 px-4 opacity-50 text-sm inline-block;
}
</style>
