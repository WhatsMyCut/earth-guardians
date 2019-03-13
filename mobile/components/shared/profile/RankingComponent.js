import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import { _eventHit } from '../../../services/googleAnalytics';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles, defaults } from '../../../constants/Styles';


export default class RankingComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={[styles.componentContainer, { marginBottom: defaults.margin, height: 275 }]}>
        <View style={[styles.componentHeader]}>
          <Text style={[styles.headerText]}>User</Text>
        </View>
        {this.props.user_rankings &&
          this.props.user_rankings.slice(0,3).map((item, index) =>  {
            let rowStyle = (index == 2) ? styles.noDivider : ''
            return (
              <View key={index} style={[styles.rankRow, rowStyle]}>
                <Text style={[styles.rankNumber]}>{item.rank}</Text>
                <View style={styles.rankDetail}>
                  <Text style={styles.rankName}>
                    {item.name}
                  </Text>
                  <Text style={styles.smallWhiteText}>
                    {item.total_points}
                  </Text>
                </View>
                <Text style={styles.rankState}>{item.state.substring(0,2).toUpperCase()}</Text>
              </View>
            )
          })
        }
      </View>
    );
  };
  _viewB = () => {
    var len = this.props.state_rankings.length;
    return (
      <View style={[styles.componentContainer, { marginBottom: defaults.margin, height:275, justifyContent: 'top'}]}>
        <View style={[styles.componentHeader]}>
          <Text style={styles.headerText}>State</Text>
        </View>
        {this.props.state_rankings &&
          this.props.state_rankings.map((item, index) => {
            let rowStyle = (index == len-1) ? styles.noDivider : '';
            return (
              <View key={index} style={[styles.rankRow, rowStyle]}>
                {/* <Text style={styles.rankNumber}>{item}</Text> */}
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
        style={ styles.linearGradientBoxPadded} >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              front: !this.state.front,
            },
            _eventHit('RankingStackScreen', {action: (this.state.front) ? 'openModal.front' : 'openModal.back'}, res => console.log(res.event, res.params.action)))
          }
        >
          {this.state.front ? this._viewA() : this._viewB()}
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

