import React from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Section, TableView } from 'react-native-tableview-simple'
import FeedCell from './FeedCell'
import Store from '../stores/Store'
import * as Actions from '../actions/Actions'


export default class NewsTable extends React.Component {
  constructor(){
    super()
    this.listeners = []
    this.state = {
      news: [],
      refreshing: true,
     }
  }

  componentWillMount() {
  }

  componentWillUnmount(){
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
  }

  render() {

    const control = (
      <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.refresh.bind(this)}
        />
    )

    return (
        <ScrollView refreshControl={control} style={{ backgroundColor: '#EFEFF4' }}>
        <TableView>
        </TableView>
      </ScrollView>
    )
  }
}
