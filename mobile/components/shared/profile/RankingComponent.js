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
        <View style={styles.rankRow}>
          <Text style={[styles.rankNumber, {color: 'gold'}]}>1</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Dawn Smith
            </Text>
            <Text style={styles.smallWhiteText}>
              7,406
            </Text>
          </View>
          <Text style={styles.rankState}>WA</Text>
        </View>
        <View style={styles.rankRow}>
          <Text style={[styles.rankNumber, {color: 'silver'}]}>2</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Andrew Hunt
            </Text>
            <Text style={styles.smallWhiteText}>
              2,492
            </Text>
          </View>
          <Text style={styles.rankState}>CO</Text>
        </View>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={[styles.rankNumber, {color: '#7c600b'}]}>3</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Jeffrey Tso
            </Text>
            <Text style={styles.smallWhiteText}>
              901
            </Text>
          </View>
          <Text style={styles.rankState}>AL</Text>
        </View>
      </View>
    );
  };
  _viewB = () => {
    return (
      <View style={styles.rankContainer}>
        <Text style={styles.headerText}>State</Text>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>1</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Vermont
            </Text>
            <Text style={styles.smallWhiteText}>
              920,647
            </Text>
          </View>
        </View>
        <View style={styles.rankRow}>
          <Text style={styles.rankNumber}>2</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Oregon
            </Text>
            <Text style={styles.smallWhiteText}>
              204,719
            </Text>
          </View>
        </View>
        <View style={[styles.rankRow, styles.noDivider]}>
          <Text style={styles.rankNumber}>3</Text>
          <View style={styles.rankDetail}>
            <Text style={styles.rankName}>
              Massachusetts
            </Text>
            <Text style={styles.smallWhiteText}>
              95,730
            </Text>
          </View>
        </View>
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

