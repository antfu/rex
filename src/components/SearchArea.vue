<script setup lang="ts">
import { findRaw, flags, replaceRaw } from '~/logics'
</script>

<template>
  <div class="flex flex-col pb-2 border-b border-trueGray-400 border-opacity-25">
    <NavBar />
    <div class="flex mx-2">
      <Editor
        v-model="findRaw"
        mode="regex"
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
    <div class="flex mx-2">
      <Editor
        v-model="replaceRaw"
        class="flex-auto input rounded p-2 m-2"
        placeholder="Replace..."
        :inline="true"
      />
    </div>
  </div>
</template>
