import dispatcher from '../dispatcher'

export function fetchContestants() {
  dispatcher.dispatch({
    type: 'FETCH_CONTESTANTS'
  })
}

export function fetchEvents() {
  dispatcher.dispatch({
    type: 'FETCH_EVENTS'
  })
}
