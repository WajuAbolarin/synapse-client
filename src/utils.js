import { record, pack } from 'rrweb'

export class RRWebRecorder {
  constructor(duration, client) {
    this.duration = duration || 30000
    this.timeoutId = null

    this.events = []
    this.stopFn = null
    this.currentSessionId = null

    this.$client = client
  }

  startRecording() {
    // initiate session with Server (use this to show countdown ) **
    console.log(`Starting recording`)

    this.stopFN = record({
      emit: (event) => {
        this.events.push(event)
      },
    })

    this.$client.createSession().then(({ data }) => {
      this.currentSessionId = data.session_id

      this.timeoutId = setTimeout(() => {
        this.stopRecording()
      }, this.duration)
    }, console.error)

    // set save interval here to flush the array and save it
  }

  stopRecording() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    console.log(`Stoping recording`)
    this.stopFN()
  }

  saveRecording() {
    console.log('Saving Recording')
    if (this.events.length === 0) {
      return
    }
    return this.$client.persistSession(this.currentSessionId, this.events)
  }
}

export class HTTPClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl
  }

  createSession() {
    return fetch(`${this.baseUrl}/session/new`, {
      method: 'GET',
    }).then(handleJSON)
  }

  persistSession(session_id, events) {
    return fetch(`${this.baseUrl}/session/${session_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ events }),
    }).then(handleJSON)
  }

  getFeedbackItems() {
    return fetch(`${this.baseUrl}/feedback/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(handleJSON)
  }

  getSessionData(session_id) {
    return fetch(`${this.baseUrl}/session/${session_id}`).then(handleJSON)
  }
}

function handleJSON(response) {
  if (!response.ok) {
    throw new Error('Failed to process request')
  }
  if (response.status === 200) {
    return response.json()
  }
}
