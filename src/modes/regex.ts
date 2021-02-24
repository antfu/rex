import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'

CodeMirror.defineSimpleMode('regex', {
  start: [
    { regex: /\(.*\)/, token: 'atom' },
    { regex: /\[.*\]/, token: 'string' },
    { regex: /\\\\/, token: 'builtin' },
    { regex: /\\\w/, token: 'keyword' },
    { regex: /[+\-?]/, token: 'operator' },
  ],
})
