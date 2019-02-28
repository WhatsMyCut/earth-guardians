import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles'


export default class RankingComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={styles.componentContainer}>
        <Text style={styles.headerText}>User</Text>
        {this.props.user_rankings &&
          this.props.user_rankings.map((item, index) => {
            <View key={index} style={styles.rankRow}>
              <Text style={[styles.rankNumber]}>{index}</Text>
              <View style={styles.rankDetail}>
                <Text style={styles.rankName}>
                  {item.name}
                </Text>
                <Text style={styles.smallWhiteText}>
                  {item.total_points}
                </Text>
              </View>
              <Text style={styles.rankState}>{item.state}</Text>
            </View>
          })
        }
      </View>
    );
  };
  _viewB = () => {
    return (
      <View style={styles.rankContainer}>
        <Text style={styles.headerText}>State</Text>
        {this.props.state_rankings &&
          this.props.state_rankings.map((item, index) => {
            return (
              <View key={index} style={styles.rankRow}>
                <Text style={styles.rankNumber}>{index+1}</Text>
                <View style={styles.rankDetail}>
                  <Text style={styles.rankName}>
                    {item.state}
                  </Text>
                  <Text style={styles.smallWhiteText}>
                    {item.points}
                  </Text>
                </View>
              </View>
            )
          })
        }
      </View>
    );
  };
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={ styles.linearGradientBox} >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              front: !this.state.front,
            })
          }
        >
          {this.state.front ? this._viewA() : this._viewB()}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

