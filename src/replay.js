import Player from 'rrweb-player'
import { HTTPClient } from './utils'

const playerRoot = document.querySelector('.js-player-root')

document.addEventListener('DOMContentLoaded', () => {
  const http = new HTTPClient(`http://localhost:7878`)
  http
    .getFeedbackItems()
    .then(({ data }) => {
      // return http.getSessionData(data[data.length - 1].session_id)
      return http.getSessionData(data[0].session_id)
    }, console.warn)
    .then((events) => {
      setTimeout(() => {
        new Player({
          target: playerRoot,
          props: {
            events,
            width: 0.9 * (document.documentElement.clientWidth || window.innerWidth || 0),
            height: (document.documentElement.clientHeight || window.innerHeight || 0) - 200,
            skipInactive: false,
            autoPlay: false,
          },
        })
      }, 1000)
    })
})
