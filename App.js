import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Section, TableView } from 'react-native-tableview-simple'
import FeedTable from './src/components/FeedTable'
import ContestantsTable from './src/components/ContestantsTable'
import NavigationBar from 'react-native-navbar'

export default class App extends React.Component {
  render() {

    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          style={{ paddingTop: 20 }}
          tabBarActiveTextColor="#c4972b"
          tabBarUnderlineStyle={{backgroundColor: '#c4972b', height: 3}}
        >
          <FeedTable tabLabel="Feed" />
          <ContestantsTable tabLabel="Deltagere" />
          <Text tabLabel='Nyheter'>project</Text>
       </ScrollableTabView>
   </View>
    )
  }
}
