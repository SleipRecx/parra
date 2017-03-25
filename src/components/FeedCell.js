'use strict'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Cell } from 'react-native-tableview-simple'

const FeedCell = (props) => (
  <Cell
    {...props}
    cellContentView={
      <View style={styles.containerView}>
        {props.event.winners.length === 1 &&
          <Text style={styles.time}>
            {props.event.time + '  '}
            <Text style={styles.positive}>
              {props.event.winners[0].split(' ')[0] + ' '}
            </Text>
            <Text style={styles.template}>{props.event.template[1]}</Text>
          </Text>
        }
        {props.event.winners.length === 2 &&
          <Text style={styles.time}>
            {props.event.time + '  '}
            <Text style={styles.positive}>
              {props.event.winners[0].split(' ')[0] + ' '}
            </Text>
            <Text style={styles.template}>{props.event.template[1] + ' '}</Text>
            <Text style={styles.positive}>
              {props.event.winners[1].split(' ')[0] + ' '}
            </Text>
              <Text style={styles.template}>{props.event.template[3] + ' '}</Text>
          </Text>
        }
        {props.event.losers.length === 1 &&
          <Text style={styles.time}>
            {props.event.time + '  '}
            <Text style={styles.negative}>
              {props.event.losers[0].split(' ')[0] + ' '}
            </Text>
            <Text style={styles.template}>{props.event.template[1]}</Text>
          </Text>
        }
        {props.event.losers.length === 2 &&
          <Text style={styles.time}>
            {props.event.time + '  '}
            <Text style={styles.negative}>
              {props.event.losers[0].split(' ')[0] + ' '}
            </Text>
            <Text style={styles.template}>{props.event.template[1] + ' '}</Text>
            <Text style={styles.negative}>
              {props.event.losers[1].split(' ')[0] + ' '}
            </Text>
              <Text style={styles.template}>{props.event.template[3] + ' '}</Text>
          </Text>
        }
        {props.event.winnerPoints > 0 ?
           <Text style={{ color: 'green' }}>{props.event.winnerPoints}</Text> :
           <Text style={{ color: 'red' }}>{props.event.loserPoints}</Text>}
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
