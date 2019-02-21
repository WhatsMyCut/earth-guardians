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
      <View
        style={{
          //backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          height:125,
          padding: 20,

        }}
      >
        <Text style={{ color: '#fff', fontSize: 30, fontWeight: 'bold' }}>
          {this.props.points} Points
        </Text>
      </View>
    );
  };

  _viewB = () => {
    return (
      <View style={[defaults.width, styles.centerAll]} >
        <View style={[styles.reachComponent]}>
          <View style={styles.detailRow}>
            <View style={ { flexBasis: '33%' } }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Energy</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Energy'] || 0}</Text>
            </View>
            <View style={ {flexBasis: '33%'} }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Travel</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Travel'] || 0}</Text>
            </View>
            <View style={ {flexBasis: '33%'} }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Waste</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Waste'] || 0}</Text>
            </View>
          </View>
        </View>
        <View style={styles.reachComponent}>
          <View style={styles.detailRow}>
            <View style={ {flexBasis: '33%'} }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Water</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Water'] || 0}</Text>
            </View>
            <View style={ {flexBasis: '33%'} }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Food</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Food'] || 0}</Text>
            </View>
            <View style={ {flexBasis: '33%'} }>
              <Text style={[styles.detailCell, styles.halfCell, styles.centerAll]}>Shopping</Text>
              <Text style={[styles.itemPoint, styles.detailCell, styles.halfCell, styles.centerAll]}>{this.props.aggregate['Shopping'] || 0}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };
  render() {
    console.log(this.props, 'HEHEHEHEHE');
    return (
      <LinearGradient
        {...LinearGradientProps.profileItem}
        style={{
          flex: 1,
          borderRadius: 5,
          elevation: 1,
          marginVertical: 5,
          shadowColor: "#000",
          shadowRadius: 2,
          shadowOpacity: 0.35,
          shadowOffset: {
            width: 0,
            height: 2
          },
        }}
      >
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

