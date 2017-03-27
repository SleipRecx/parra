'use strict'

import EventEmitter from 'events'
import dispatcher from '../dispatcher'
import apiKey from '../helpers/defaults'

class Store extends EventEmitter {
  constructor(){
    super()
    this.contestants = {}
    this.leagues = []
    this.events = []
    this.wrongCodes = []
  }

  getContestants() {
    return this.contestants.sort((a, b) => b.score - a.score)
  }

  getLeagues() {
    return this.leagues
  }

  getWrongCodes() {
    return this.wrongCodes
  }

  getEvents() {
    this.events.forEach(week => {
      week.sort((a, b) => {
        if (a.time < b.time) {
          return 1
        }
        return -1
      })

    })
    return this.events
  }

  fetchContestants() {
    fetch('https://api.fantasyparadise.no/o/contestants')
    .then(resp => resp.json())
      .then(contestants => {
        this.contestants = contestants
        this.emit('newContestants')
      })
  }

  fetchEvents(){
    fetch('https://api.fantasyparadise.no/o/contestants')
    .then(resp => resp.json())
      .then(contestants => {
        this.contestants = contestants
        this.emit('newContestants')
      }).then(() => {
        const headers = new Headers()
        headers.append('authorization', apiKey)
        const init = { method: 'GET', headers }
        const request = new Request('https://api.fantasyparadise.no/o/events', init)

        fetch(request)
          .then(resp => resp.json())
            .then(events => {
              this.events = this.createEventObjects(events)
              this.events.reverse()
              this.emit('newEvents')
            })
      })
  }

  createEventObjects(events) {
    const weeks = {}
    events.forEach(e => {
      const object = {
        id: e._id,
        template: e.template,
        week: e.gameWeek,
        winnerPoints: e.winnerPoints,
        loserPoints: e.loserPoints,
        day: e.day,
        time: e.time,
        winners: [],
        losers: [],
        section: e.gameWeek + e.day,
      }
      e.pointWinners.forEach(w => {
        object.winners.push(this.contestants.find(c => c._id === w).name)
      })
      e.pointLosers.forEach(w => {
        object.losers.push(this.contestants.find(c => c._id === w).name)
      })
      if(weeks.hasOwnProperty(e.gameWeek + e.day)) {
        weeks[e.gameWeek + e.day].push(object)
      }
      else {
        weeks[e.gameWeek + e.day] = [object]
      }
    })

    return Object.keys(weeks).map(week => {
      return weeks[week]
    })
  }

  fetchLeagues(leagueCodes) {
    this.leagues = []
    if (leagueCodes.length === 0) this.emit('newLeagues')
    const headers = new Headers()
    headers.append('authorization', apiKey)
    const init = { method: 'GET', headers }
    leagueCodes.forEach(code => {
      if(!this.leagues.filter(e => e.code === code).length > 0){
        const request = new Request('https://api.fantasyparadise.no/o/league/' + code, init)
        fetch(request)
        .then(resp => {
          if (resp.status === 200) return resp.json()
          return null
        }).then(league => {
            if (league) {
              this.leagues.push(league)
              this.emit('newLeagues')
            }
            else{
              this.wrongCodes.push(code)
              this.emit('wrongCode')
            }
          })
      }
    })
  }


  handleActions(action){
    switch (action.type) {
      case 'FETCH_CONTESTANTS': {
        this.fetchContestants()
        break
      }
      case 'FETCH_EVENTS': {
        this.fetchEvents()
        break
      }
      case 'FETCH_LEAGUES': {
        this.fetchLeagues(action.idArray)
        break
      }
      default: {
        break
      }
    }
  }

}
const store = new Store()
dispatcher.register(store.handleActions.bind(store))
export default store
