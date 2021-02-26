<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { content, fullResult, toggleMode, mode, applyResult, matches, findRaw } from '~/logics'

const { copy } = useClipboard()
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="flex flex-col h-full w-1/2">
      <div class="flex">
        <div class="mr-4 icon">
          <carbon:text-annotation-toggle class="ml-4" />
          <div class="label">
            TEXT
          </div>
        </div>

        <div class="flex-auto" />

        <button
          v-if="content"
          class="mr-4 icon"
          @click="() => content = ''"
        >
          <carbon-delete />
        </button>
        <button class="mr-4 icon" @click="() => copy(content)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        v-model="content"
        :matches="matches"
        class="flex-auto py-2 px-4"
        :class="{ source: !!findRaw }"
      />
    </div>
    <div class="bg-trueGray-400 bg-opacity-25 h-full w-1px" />
    <div class="flex flex-col h-full -m-1px w-1/2">
      <div class="flex">
        <button class="ml-4 icon" @click="toggleMode">
          <carbon-transpose v-if="mode=='replace'" />
          <carbon-search v-else />
          <div class="label">
            {{ mode.toUpperCase() }}
          </div>
        </button>

        <div class="flex-auto" />

        <button class="mr-4 icon" @click="() => copy(fullResult)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        :model-value="fullResult"
        :readonly="true"
        class="flex-auto py-2 px-4"
      />
    </div>

    <div
      v-if="fullResult !== content"
      class="bg-white border border-trueGray-400 border-opacity-25 rounded-full cursor-pointer flex h-2em w-2em absolute dark:bg-trueGray-700 hover:shadow"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      @click="applyResult"
    >
      <carbon-chevron-left class="m-auto pt-2px pr-1px hover:text-orange-400" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  @apply py-3 pl-2 pr-4 opacity-50 text-sm inline-block;
}
</style>
