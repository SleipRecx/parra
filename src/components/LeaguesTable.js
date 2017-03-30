import React from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, Button, AsyncStorage, Alert } from 'react-native'
import { Section, TableView } from 'react-native-tableview-simple'
import LeagueCell from './LeagueCell'
import Store from '../stores/Store'
import * as Actions from '../actions/Actions'


export default class LeaguesTable extends React.Component {
  constructor(){
    super()
    this.addLeaguePressed = this.addLeaguePressed.bind(this)
    this.removeLeagueCode = this.removeLeagueCode.bind(this)
    this.listeners = []
    this.navigate = this.navigate.bind(this)
    this.state = {
      leagueCodes: [],
      leagues: Store.getLeagues(),
      input: '',
     }
     AsyncStorage.getItem('codes').then(e => {
       if (e !== null) {
         const leagueCodes = JSON.parse(e)
         Actions.fetchLeagues(leagueCodes)
         this.setState({ leagueCodes })
       }
     })
  }

  componentWillMount() {
    this.listen(Store, 'newLeagues', () => {
      this.setState({ leagues: Store.getLeagues() })
    })

    this.listen(Store, 'wrongCode', () => {
      const wrongCodes = Store.getWrongCodes()
      const codes = this.state.leagueCodes
      const leagueCodes = codes.filter(c => wrongCodes.indexOf(c) === -1)
      AsyncStorage.setItem('codes', JSON.stringify(leagueCodes))
      this.setState({ leagueCodes })
      Alert.alert(
        'Ops...',
        'Ligakoden var ikke gyldig.',
        [{text: 'Lukk', onPress: () => this.setState({ input: ''})}]
      )
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

  navigate(name, data) {
    this.props.navigator.push({ name, data, remove: this.removeLeagueCode })
  }

  removeLeagueCode(code) {
    const leagueCodes = this.state.leagueCodes.filter(c => c !== code)
    AsyncStorage.setItem('codes', JSON.stringify(leagueCodes))
    this.setState({ leagueCodes })
    Actions.fetchLeagues(leagueCodes)
  }

  addLeaguePressed() {
    const leagueCode = this.state.input
    const leagueCodes = this.state.leagueCodes
    if (leagueCodes.indexOf(leagueCode) === -1) {
      leagueCodes.push(leagueCode)
      this.setState({ input: '', leagueCodes})
      AsyncStorage.setItem('codes', JSON.stringify(leagueCodes));
      Actions.fetchLeagues(leagueCodes)
    }
    else {
      Alert.alert(
        'Ops...',
        'Du har allerede lagt til denne liagen.',
        [{text: 'Lukk', onPress: () => this.setState({ input: ''})}]
      )
    }
  }

  render() {
    const cells = this.state.leagues.map(l => (
        <LeagueCell key={l._id} name={l.name} onPress={() => this.navigate('leagueDetail', l)} />
      )
    )

    return (
        <ScrollView style={{ backgroundColor: '#EFEFF4' }}>
        <TableView>
          <Section header="Legg til en ny liga">
            <View style={{ flexDirection:'row', flexWrap:'wrap' }}>
              <TextInput
              style={{flex: 1, backgroundColor: 'white', paddingLeft: 15}}
              onChangeText={(text) => this.setState({ input: text })}
              placeholder="Ligakode"
              value={this.state.input}
              />
            <View style={{ backgroundColor: 'white', paddingRight: 15 }}>
              <Button
                onPress={this.addLeaguePressed}
                title="Legg til"
                color="#c4972b"
                accessibilityLabel="Learn more about this purple button"
                />
            </View>
            </View>
          </Section>
          <Section header="Dine ligaer">
            {cells}
          </Section>

        </TableView>
      </ScrollView>
    )
  }
}
