import { RRWebRecorder, HTTPClient } from './utils'

const recordBtn = document.getElementById('js-record')
const stopBtn = document.getElementById('js-stop')
const saveBtn = document.getElementById('js-save')
const AppRecorder = new RRWebRecorder(null, new HTTPClient(`http://localhost:7878`))

recordBtn.addEventListener('click', () => {
  AppRecorder.startRecording()
})
stopBtn.addEventListener('click', () => {
  AppRecorder.stopRecording()
})

saveBtn.addEventListener('click', () => {
  AppRecorder.saveRecording()
})
