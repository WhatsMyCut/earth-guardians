import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles, defaults } from '../../../constants/Styles';
import { _eventHit } from '../../../services/googleAnalytics';
export default class PointsComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={[styles.container, styles.centerAll]}>
        <Text style={[styles.largeWhiteTextBold]}>
          {this.props.points}
        </Text>
      </View>
    );
  };

  _viewB = () => {
    return (
      <View style={[styles.container]}>
        <View style={[styles.detailRow]}>
          <View style={ { flexBasis: '33%' } }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Energy</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Energy'] || 0}</Text>
          </View>
          <View style={ {flexBasis: '33%'} }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Travel</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Travel'] || 0}</Text>
          </View>
          <View style={ {flexBasis: '33%'} }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Waste</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Waste'] || 0}</Text>
          </View>
        </View>
        <View style={[styles.detailRow, {marginTop: 10}]}>
          <View style={ {flexBasis: '33%'} }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Water</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Water'] || 0}</Text>
          </View>
          <View style={ {flexBasis: '33%'} }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Food</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Food'] || 0}</Text>
          </View>
          <View style={ {flexBasis: '33%'} }>
            <Text style={[styles.detailCell, styles.halfCell, styles.centerText]}>Shopping</Text>
            <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerText]}>{this.props.aggregate['Shopping'] || 0}</Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={[styles.linearGradientBoxPadded]}>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              front: !this.state.front,
            },
            _eventHit('PointsComponent', {action: (this.state.front) ? 'back' : 'front'}, res => console.log(res.event, res.params.action))
          )}
        >
          <View style={[styles.componentContainer, styles.centerAll, { }]}>
            <View style={styles.componentHeader}>
              <Text style={[styles.headerText]}>
                MY POINTS
              </Text>
            </View>
            {this.state.front ? this._viewA() : this._viewB()}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

