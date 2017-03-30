import React from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Section, TableView } from 'react-native-tableview-simple'
import FeedCell from './FeedCell'
import Store from '../stores/Store'
import * as Actions from '../actions/Actions'


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default class FeedTable extends React.Component {
  constructor(){
    super()
    this.listeners = []
    this.state = {
      events: [],
      refreshing: true,
     }
     Actions.fetchEvents()
     const interval = setInterval(() => {
         Actions.fetchEvents()
     }, 5000)

  }

  componentWillMount() {
    this.listen(Store, 'newEvents', () => {
      this.setState({
        events:  Store.getEvents(),
        refreshing: false,
      })
    })
  }

  componentWillUnmount(){
    clearInterval(this.interval)
    this.listeners.forEach(l => l.remove())
  }

  listen(store, event, fn) {
    store.on(event, fn)
    this.listeners.push({ remove: () =>
      store.removeListener(event, fn)
    })
  }

  refresh() {
    this.setState({ refreshing: true })
    Actions.fetchEvents()
  }

  render() {
    const sections = this.state.events.slice(0, 4).map(week =>{
      const cells = week.map(e => (
        <FeedCell key={e.id} event={e} />
      ))
      const text = week[0].day.capitalize() + ', ' + 'Uke ' + week[0].week
      return (
      <Section key={text} header={text}>
        {cells}
      </Section>
    )
    })

    const control = (
      <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.refresh.bind(this)}
        />
    )

    return (
        <ScrollView refreshControl={control} style={{ backgroundColor: '#EFEFF4' }}>
        <TableView>
          {sections}
        </TableView>
      </ScrollView>
    )
  }
}
