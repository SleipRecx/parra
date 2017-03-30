'use strict'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Cell } from 'react-native-tableview-simple'
import Icon from 'react-native-vector-icons/MaterialIcons'

class ContestantCell extends Component {
  constructor(props){
    super(props)
    this.lpad = this.lpad.bind(this)
  }

  lpad(s, width, char) {
    return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width)
  }

  render() {
    const score = this.lpad(this.props.contestant.score, 3, ' ')
    const scoreWeek = this.lpad(this.props.contestant.scoreGameWeek, 3, ' ')
    return (
      <Cell
        {...this.props}
        cellContentView={
          <View style={styles.containerView}>
            <Image
              style={{width: 40, height: 40, borderRadius: 20, marginRight: 10}}
              source={{uri: this.props.contestant.image}}
            />
            <Text
              allowFontScaling
              numberOfLines={1}
              style={{ flex: 1, fontSize: 14 }}>
              {this.props.contestant.name}
            </Text>
              <Icon name="star" size={18} color="#666666" style={styles.star}/>
              <Text style={styles.text}>
                {score}
              </Text>
              <Icon name="star-half" size={18} color="#666666" style={styles.star}/>
              <Text style={styles.text}>
                {scoreWeek}
              </Text>
          </View>
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    paddingVertical: 10,
  },
  star: {
    marginRight: 2,
  },
  text : {
    marginRight: 5,
    color: '#666666',
  },
})

export default ContestantCell
