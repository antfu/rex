<script setup lang="ts">
import { useMotions } from '@vueuse/motion'
import { findRaw, flags, replaceRaw, mode } from '~/logics'

const motions = useMotions()
</script>

<template>
  <div class="flex flex-col pb-2 border-b border-trueGray-400 border-opacity-25">
    <NavBar />
    <div class="flex mx-2">
      <Editor
        v-model="findRaw"
        class="flex-auto input rounded p-2 m-2"
        placeholder="Find..."
        :inline="true"
      />
      <input
        v-model="flags"
        class="input !py-0 !px-4 !m-2 font-mono w-20 rounded"
        placeholder="flags"
        type="text"
      >
    </div>
    <transition
      :css="false"
      @leave="(el, done) => motions.replaceBox.leave(done)"
    >
      <div
        v-show="mode === 'replace'"
        v-motion="'replaceBox'"
        class="flex mx-2"
        style="min-height: 60px;box-sizing: border-box;"
        :initial="{
          x: 50,
          opacity: 0,
          marginBottom: -60
        }"
        :enter="{
          x: 0,
          opacity: 1,
          marginBottom: 0
        }"
        :visible="{
          x: 0,
          opacity: 1,
          marginBottom: 0
        }"
        :leave="{
          x: -100,
          opacity: 0,
          dur: 200,
          marginBottom: -60
        }"
      >
        <Editor
          v-model="replaceRaw"
          class="flex-auto input rounded p-2 m-2"
          placeholder="Replace..."
          :inline="true"
        />
      </div>
    </transition>
  </div>
</template>
