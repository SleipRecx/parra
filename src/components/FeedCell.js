'use strict'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Cell } from 'react-native-tableview-simple'

const FeedCell = (props) => {
  const winners = props.event.winners.map(w => {
    const splited = w.split(' ')
    return splited[0] + ' ' + splited[splited.length - 1][0] + '. '
  })
  const losers = props.event.losers.map(w => {
    const splited = w.split(' ')
    return splited[0] + ' ' + splited[splited.length - 1][0] + '. '
  })
  return (
    <Cell
      {...props}
      cellContentView={
        <View style={styles.containerView}>
          {props.event.winners.length === 1 &&
            <Text style={styles.time}>
              {props.event.time + '  '}
              <Text style={styles.positive}>
                {winners[0]}
              </Text>
              <Text style={styles.template}>{props.event.template[1]}</Text>
            </Text>
          }
          {props.event.winners.length === 2 &&
            <Text style={styles.time}>
              {props.event.time + '  '}
              <Text style={styles.positive}>
                {winners[0]}
              </Text>
              <Text style={styles.template}>{props.event.template[1] + ' '}</Text>
              <Text style={styles.positive}>
                {winners[1]}
              </Text>
                <Text style={styles.template}>{props.event.template[3] + ' '}</Text>
            </Text>
          }
          {props.event.losers.length === 1 &&
            <Text style={styles.time}>
              {props.event.time + '  '}
              <Text style={styles.negative}>
                {losers[0]}
              </Text>
              <Text style={styles.template}>{props.event.template[1]}</Text>
            </Text>
          }
          {props.event.losers.length === 2 &&
            <Text style={styles.time}>
              {props.event.time + '  '}
              <Text style={styles.negative}>
                  {losers[0]}
              </Text>
              <Text style={styles.template}>{props.event.template[1] + ' '}</Text>
              <Text style={styles.negative}>
                {losers[1]}
              </Text>
                <Text style={styles.template}>{props.event.template[3] + ' '}</Text>
            </Text>
          }
          {props.event.winnerPoints > 0 ?
             <Text style={{ color: 'green', paddingLeft: 5 }}>{props.event.winnerPoints}</Text> :
             <Text style={{ color: 'red', paddingLeft: 5 }}>{props.event.loserPoints}</Text>}
        </View>
      }
    />
  )
}

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  },
  time: {
    fontWeight: 'bold',
    color: 'grey',
    flex: 1,
  },
  positive: {
    fontWeight: 'normal',
    color: 'green',
  },
  negative: {
    fontWeight: 'normal',
    color: 'red'
  },
  template: {
    fontWeight: 'normal',
    color: 'black'
  },
})

export default FeedCell
