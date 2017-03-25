'use strict'
import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Cell } from 'react-native-tableview-simple'

const ContestantCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.containerView}>
        <Image
          style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
          source={{uri: props.contestant.image}}
        />
        <Text
          allowFontScaling
          numberOfLines={1}
          style={{ flex: 1, fontSize: 16 }}>
          {props.contestant.name}
        </Text>
        <Text>{props.contestant.score}</Text>
      </View>
    }
  />
)

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  }
})

export default ContestantCell
