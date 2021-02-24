<script setup lang='ts'>
import { onMounted, ref, watch, defineProps } from 'vue'
import { useVModel } from '@vueuse/core'
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/display/placeholder'
import '../modes/regex'

const props = defineProps<{
  modelValue: string
  mode?: string
  placeholder?: string
  readonly?: boolean
  inline?: boolean
  matches?: RegExpMatchArray[]
}>()
const el = ref<HTMLTextAreaElement | null>()
const text = useVModel(props, 'modelValue')
const mode = useVModel(props, 'mode')
const readonly = useVModel(props, 'readonly')
const inline = useVModel(props, 'inline')
const placeholder = useVModel(props, 'placeholder')
const matches = useVModel(props, 'matches')

onMounted(() => {
  const cm = CodeMirror.fromTextArea(el.value!, {
    mode: mode.value,
    readOnly: readonly.value,
    extraKeys: {
      // @ts-expect-error
      Tab: inline.value ? false : undefined,
    },
  })

  cm.on('change', () => {
    text.value = cm.getValue()
  })

  let decorations: CodeMirror.TextMarker<CodeMirror.MarkerRange>[] = []

  watch(matches, (m = []) => {
    decorations.forEach(i => i.clear())
    decorations = Array.from(m)
      .map((i, idx) => {
        const start = i.index
        if (start == null)
          return null!
        const end = start + i[0].length
        return cm.markText(
          cm.posFromIndex(start),
          cm.posFromIndex(end),
          { className: `match full-${idx % 2 === 0 ? 'even' : 'odd'}` },
        )
      })
      .filter(i => i)
  }, { immediate: true })

  watch(mode, v => cm.setOption('mode', v))
  watch(readonly, v => cm.setOption('readOnly', v))
  watch(text, (v) => {
    if (v !== cm.getValue())
      cm.replaceRange(v, cm.posFromIndex(0), cm.posFromIndex(Infinity))
  }, { immediate: true })
})
</script>

<template>
  <div class="editor relative">
    <textarea ref="el" :placeholder="placeholder" />
  </div>
</template>

<style lang='postcss'>
.editor {
  @apply outline-none font-mono overflow-hidden;
}
.CodeMirror {
  height: 100%;
  background: transparent;
  color: inherit;
}
.CodeMirror pre.CodeMirror-placeholder {
  opacity: 0.5;
}
.CodeMirror-cursor {
  border-color: var(--fg);
}
.CodeMirror-selected {
  background: rgba(125,125,125,0.2);
}
.match.full-even {
  border-bottom: 2px solid #e7d25e;
}
.match.full-odd {
  border-bottom: 2px solid #e79c5e;
}
</style>
