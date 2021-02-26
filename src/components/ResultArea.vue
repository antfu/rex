<script setup lang="ts">
import { useClipboard } from '@vueuse/core'
import { content, fullResult, toggleMode, mode, applyResult, matches, findRaw, takeGroup, linewrap } from '~/logics'

const { copy } = useClipboard()
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="flex flex-col h-full w-1/2">
      <div class="flex p-2">
        <div class="icon relax static py-1">
          <carbon:text-annotation-toggle />
          <div class="label">
            TEXT
          </div>
        </div>

        <div class="flex-auto" />

        <button
          v-if="content"
          class="icon"
          @click="() => content = ''"
        >
          <carbon-delete />
        </button>
        <button
          title="Toogle line wrap"
          class="icon"
          :class="{active: linewrap }"
          @click="linewrap = !linewrap"
        >
          <carbon:text-wrap />
        </button>
        <button class="icon" title="Copy" @click="() => copy(content)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        v-model="content"
        :matches="matches"
        :wrapping="linewrap"
        class="flex-auto py-2 px-4"
        :class="{ source: !!findRaw }"
      />
    </div>
    <div class="bg-trueGray-400 bg-opacity-25 h-full w-1px" />
    <div class="flex flex-col h-full -m-1px w-1/2">
      <div class="flex p-2">
        <button class="icon relax" @click="toggleMode">
          <carbon-transpose v-if="mode=='replace'" />
          <carbon-search v-else />
          <div class="label">
            {{ mode.toUpperCase() }}
          </div>
          <carbon:chevron-down class="text-xs opacity-50 ml-2" />
        </button>

        <div class="flex-auto" />

        <template v-if="mode=='take'">
          <button
            class="icon"
            title="Full Match"
            :class="{active: takeGroup === 0}"
            @click="takeGroup = 0"
          >
            <codicon:symbol-array />
          </button>
          <button
            class="icon"
            title="Group 1"
            :class="{active: takeGroup === 1}"
            @click="takeGroup = 1"
          >
            <carbon-number-1 />
          </button>
          <button
            class="icon"
            title="Group 2"
            :class="{active: takeGroup === 2}"
            @click="takeGroup = 2"
          >
            <carbon-number-2 />
          </button>
          <button
            class="icon"
            title="Group 3"
            :class="{active: takeGroup === 3}"
            @click="takeGroup = 3"
          >
            <carbon-number-3 />
          </button>
        </template>

        <button class="icon" title="Copy" @click="copy(fullResult)">
          <carbon-copy />
        </button>
      </div>
      <Editor
        :model-value="fullResult"
        :readonly="true"
        :wrapping="linewrap"
        class="flex-auto py-2 px-4"
      />
    </div>

    <div
      v-if="fullResult !== content"
      v-motion
      title="Apply result"
      class="bg-white border border-trueGray-400 border-opacity-25 rounded-full cursor-pointer flex h-2em w-2em absolute dark:bg-trueGray-700 hover:shadow"
      style="top: 50%; left: 50%; transform-origin: left top;"
      :initial="{
        scale: 0,
        x: '-50%',
        y: '-50%'
      }"
      :enter="{
        scale: 1
      }"
      @click="applyResult"
    >
      <carbon-chevron-left class="m-auto pt-2px pr-1px hover:text-orange-400" />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.label {
  @apply pl-2 opacity-50 text-sm inline-block;
}
</style>
