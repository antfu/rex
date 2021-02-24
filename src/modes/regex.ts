import CodeMirror from 'codemirror'
import 'codemirror/addon/mode/simple'

CodeMirror.defineSimpleMode('regex', {
  start: [
    { regex: /\\\w/, token: 'keyword' },
  ],
})
