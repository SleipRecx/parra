'use strict'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Cell } from 'react-native-tableview-simple'

const LeagueCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.containerView}>
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{ flex: 1, fontSize: 16 }}>
          {props.name}
        </Text>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 15,
  }
})

export default LeagueCell
