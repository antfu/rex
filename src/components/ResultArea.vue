<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { content, fullResult, toggleMode, mode, applyResult, matches, findRaw } from '~/logics'

const { copy } = useClipboard()
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="w-1/2 h-full flex flex-col">
      <div class="flex">
        <div class="icon mr-4">
          <carbon:text-annotation-toggle class="ml-4" />
          <div class="label">
            TEXT
          </div>
        </div>

        <div class="flex-auto" />

        <button
          v-if="content"
          class="icon mr-4"
          @click="() => content = ''"
        >
          <carbon-delete />
        </button>
        <button class="icon mr-4" @click="() => copy(content)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        v-model="content"
        :matches="matches"
        class="flex-auto px-4 py-2"
        :class="{ source: !!findRaw }"
      />
    </div>
    <div class="w-1px h-full bg-trueGray-400 bg-opacity-25" />
    <div class="w-1/2 h-full flex flex-col -m-1px">
      <div class="flex">
        <button class="icon ml-4" @click="toggleMode">
          <carbon-transpose v-if="mode=='replace'" />
          <carbon-search v-else />
          <div class="label">
            {{ mode.toUpperCase() }}
          </div>
        </button>

        <div class="flex-auto" />

        <button class="icon mr-4" @click="() => copy(fullResult)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        :model-value="fullResult"
        :readonly="true"
        class="flex-auto px-4 py-2"
      />
    </div>

    <div
      class="absolute w-2em h-2em flex rounded-full border border-trueGray-400 border-opacity-25 cursor-pointer hover:shadow bg-white dark:bg-trueGray-700"
      style="top: 50%; left: 50%; transform: translate(-50%, -50%);"
      @click="applyResult"
    >
      <carbon-chevron-left class="m-auto hover:text-orange-400 pt-2px pr-1px" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  @apply py-3 pl-2 pr-4 opacity-50 text-sm inline-block;
}
</style>
