import React from 'react'
import { StyleSheet, Text, View, ScrollView, Navigator, StatusBar } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Section, TableView } from 'react-native-tableview-simple'
import FeedTable from './src/components/FeedTable'
import ContestantsTable from './src/components/ContestantsTable'
import NavigationBar from 'react-native-navbar'
import LeaguesTable from './src/components/LeaguesTable'
import LeagueDetail from './src/components/LeagueDetail'

export default class App extends React.Component {
  constructor(){
    super()
    this.renderScene = this.renderScene.bind(this)
    this.configureScene = this.configureScene.bind(this)
  }

  renderScene(route, navigator) {
    if (route.name === 'league') {
      return  <LeaguesTable navigator={navigator} />
    }
    else if (route.name === 'leagueDetail') {
      return <LeagueDetail navigator={navigator} data={route.data} remove={route.remove} />
    }
  }

  configureScene (route) {
    if (route.sceneConfig) {
      return route.sceneConfig;
    }
    return {
      ...Navigator.SceneConfigs.VerticalDownSwipeJump,
      gestures: {}
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          backgroundColor="white"
          barStyle="dark-content"
        />
        <ScrollableTabView
          scrollWithoutAnimation
          tabBarTextStyle={{fontWeight: 'normal'}}
          style={{ paddingTop: 20 }}
          tabBarActiveTextColor="#c4972b"
          tabBarUnderlineStyle={{backgroundColor: '#c4972b', height: 2}}>
            <FeedTable tabLabel="Oversikt" />
            <ContestantsTable tabLabel="Deltagere" />
            <Navigator
              tabLabel="Ligaer"
              initialRoute={{ name: 'league' }}
              renderScene={this.renderScene}
              configureScene={this.configureScene}
            />
       </ScrollableTabView>
   </View>
    )
  }
}
