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

const SCREEN_WIDTH = Dimensions.get('window').width;
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
      <View
        style={{
          //backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          padding: 20,
        }}
      >
        <View style={[styles.detailedPoints, { marginBottom: 10 }]}>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Energy</Text>
            <Text style={styles.itemPoint}>127</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Travel</Text>
            <Text style={styles.itemPoint}>480</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Waste</Text>
            <Text style={styles.itemPoint}>983</Text>
          </View>
        </View>
        <View style={styles.detailedPoints}>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Water</Text>
            <Text style={styles.itemPoint}>35</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Food</Text>
            <Text style={styles.itemPoint}>731</Text>
          </View>
          <View style={styles.itemView}>
            <Text style={styles.itemName}>Shopping</Text>
            <Text style={styles.itemPoint}>92</Text>
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
        style={{ flex: 1, borderRadius: 5, elevation: 1, marginVertical: 5 }}
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

const styles = StyleSheet.create({
  detailedPoints: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 20,
  },
  itemView: { flex: 1 },
  itemName: { color: '#fff', fontSize: 11 },
  itemPoint: { color: '#fff', fontWeight: '900', fontSize: 20 },
});
