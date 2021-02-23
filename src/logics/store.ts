import { ref, computed } from 'vue'
import { useLocalStorage, useRefHistory, useThrottle } from '@vueuse/core'

export const findRaw = useLocalStorage('find', '')
export const flags = useLocalStorage('flags', 'gm')
export const replaceRaw = useLocalStorage('replace', '')
export const content = useLocalStorage('content', '')
export const history = useRefHistory(content, { clone: false })

export const error = ref<Error | null>(null)

export const throttleFind = useThrottle(findRaw, 0)
export const findRegex = computed(() => {
  error.value = null
  try {
    return new RegExp(throttleFind.value, flags.value)
  }
  catch (e) {
    error.value = e
    console.error(e)
    return new RegExp('', 'g')
  }
})

export function replace() {
  content.value = content.value.replace(findRegex.value, replaceRaw.value)
}

export function cleanup() {
  flags.value = 'gm'
  findRaw.value = ''
  replaceRaw.value = ''
}

function take<T>(iterable: IterableIterator<T>, length: number): T[] {
  return Array.from((function* () {
    const iterator = iterable[Symbol.iterator]()
    while (length-- > 0)
      yield iterator.next().value
  })())
}

export const matchResult = computed(() => {
  return take(content.value.matchAll(findRegex.value), 30)
    .filter(i => i)
    .map(i => i[0])
    .join('\n')
})
