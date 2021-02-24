<script setup lang="ts">
import { content, fullResult, toggleMode, mode, applyResult, matches } from '~/logics'
import { useClipboard } from '@vueuse/core'

const {copy} = useClipboard()
</script>

<template>
  <div class="relative">
    <div class="w-1/2 h-full flex flex-col">
      <div>
        <div class="label">
          TEXT
        </div>

        <button class="icon mr-4" @click="() => copy(content)">
          <carbon-copy />
        </button>
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

        <button class="icon mr-4" @click="toggleMode">
          <carbon-transpose v-if="mode=='replace'" />
          <carbon-search v-else />
        </button>

         <button class="icon mr-4" @click="() => copy(fullResult)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        :model-value="fullResult"
        :readonly="true"
        class="flex-auto p-4"
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
  @apply py-3 px-4 opacity-50 text-sm inline-block;
}
</style>
