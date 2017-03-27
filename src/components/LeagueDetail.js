import React from 'react'
import { StyleSheet, Text, View, ScrollView, Navigator, Button } from 'react-native'
import { Section, TableView } from 'react-native-tableview-simple'
import LeagueDetailCell from './LeagueDetailCell'
import FeedCell from './FeedCell'

export default class App extends React.Component {

  render() {
    const sorted = this.props.data.users.sort((a, b) => b.score - a.score)
    const cells = sorted.map((u, index) => (
      <LeagueDetailCell position={index + 1} key={u._id} user={u} />
    ))

    return (
      <ScrollView style={{ backgroundColor: '#EFEFF4' }}>
        <TableView>
          <Section header="">
                <View style={{ padding: 5, paddingRight: 60, paddingLeft: 60, backgroundColor: 'white', flexDirection:'row', justifyContent: 'space-between' }}>
                      <Button
                        style={{float: 'left'}}
                        onPress={() => {this.props.navigator.pop()}}
                        title="Lukk"
                        />
                        <Button
                          style={{float: 'right'}}
                          onPress={() => {
                            this.props.remove(this.props.data.code)
                            this.props.navigator.pop()
                          }}
                          title="Fjern"
                          color="#FF3B30"
                          />
                </View>
          </Section>
          <Section header={this.props.data.name}>
            {cells}
          </Section>
        </TableView>
      </ScrollView>
    )
  }
}
