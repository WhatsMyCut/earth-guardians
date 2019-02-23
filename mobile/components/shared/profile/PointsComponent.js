import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles, defaults } from '../../../constants/Styles';
export default class PointsComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={[styles.componentContainer, styles.centerAll, { height:132, }]}>
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          {this.props.points} Points
        </Text>
      </View>
    );
  };

  _viewB = () => {
    return (
      <View style={[styles.container, styles.centerAll]} >
        <View style={[styles.componentContainer, { marginTop: 20 }]}>
          <View style={styles.detailRow}>
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
        </View>
        <View style={styles.reachComponent}>
          <View style={styles.detailRow}>
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
      </View>
    );
  };
  render() {
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={[styles.linearGradientBox]}>
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

