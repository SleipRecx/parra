import React from 'react'
import { StyleSheet, Text, View, ScrollView, RefreshControl } from 'react-native'
import { Section, TableView } from 'react-native-tableview-simple'
import ContestantCell from './ContestantCell'
import apiKey from '../helpers/defaults'
import Store from '../stores/Store'
import * as Actions from '../actions/Actions'


export default class ContestantsTable extends React.Component {
  constructor(){
    super()
    this.listeners = []
    this.state = {
      contestants: Store.getContestants(),
      refreshing: false,
    }
    Actions.fetchContestants()
  }

  componentWillMount() {
    this.listen(Store, 'newContestants', () => {
      this.setState({ refreshing: false })
      this.setState({ contestants: Store.getContestants() })
    })
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
    Actions.fetchContestants()
  }

  render() {
    const cells = this.state.contestants.map(c => {
      return (
         <ContestantCell key={c._id} contestant={c} />
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
          <Section header="Topplisten">
            {cells}
       </Section>
        </TableView>
      </ScrollView>
    )
  }
}
