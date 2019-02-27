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
import { styles } from '../../../constants/Styles'

export default class ImpactComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={[styles.componentContainer, {marginBottom: 15}] }>
        <View style={styles.container}>
          <Text style={[styles.componentHeader]}>
            YOUR IMPACT
          </Text>
        </View>
        <View style={ styles.detailRow }>
          <Text style={styles.detailCell}>
            CO2 (lbs)
          </Text>
          <Text style={[styles.detailCell, styles.itemPoint, styles.centerText]}>
            {this.props.carbon_dioxide}
          </Text>
        </View>
        <View style={ styles.detailRow }>
          <Text style={styles.detailCell}>
            H2O (gal)
          </Text>
          <Text style={[styles.detailCell, styles.itemPoint, styles.centerText]}>
            {this.props.water}
          </Text>
        </View>
        <View style={ styles.detailRow }>
          <Text style={styles.detailCell}>
            Waste (lbs)
          </Text>
          <Text style={[styles.detailCell, styles.itemPoint, styles.centerText]}>
            {this.props.waste}
          </Text>
        </View>
      </View>
    );
  };
  _viewB = () => {
    return (
      <View style={[styles.componentContainer, {marginBottom: 15}]}>
        <View style={styles.container}>
          <Text style={[styles.componentHeader, styles.centerAll]}>
            YOUR IMPACT
          </Text>
        </View>
        <View style={[ styles.detailRow] }>
          <Text style={[styles.detailCell, { flexBasis: '25%'}]}>
            CO2 (lbs)
          </Text>
          <Text style={[styles.detailCell, { flexBasis: '75%'}]}>
            You’ve offset the equivalent of driving a car for 20 miles.
          </Text>
        </View>

        <View style={[ styles.detailRow] }>
          <Text style={[styles.detailCell, { flexBasis: '25%'}]}>
            H2O (gal):
          </Text>
          <Text style={[styles.detailCell, { flexBasis: '75%'}]}>
            You’ve offset the equivalent of taking 100 showers.
          </Text>
        </View>

        <View style={[ styles.detailRow] }>
          <Text style={[styles.detailCell, { flexBasis: '25%'}]}>
            Waste (lbs):
          </Text>
          <Text style={[styles.detailCell, { flexBasis: '75%'}]}>
            You’ve offset the equivalent of 2 months of trash.
          </Text>
        </View>
      </View>
    );
  };
  render() {
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

