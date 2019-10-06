import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import LinearGradientProps from '../../../constants/LinearGradientProps';
import { styles } from '../../../constants/Styles'
import { _eventHit } from '../../../services/googleAnalytics'

export default class ImpactComponent extends React.Component {
  state = {
    front: true,
  };
  _viewA = () => {
    return (
      <View style={[styles.container] }>
        <View style={ [styles.detailRow] }>
          <Text style={[styles.detailCell, styles.halfCell]}>
            CO2 (lbs)
          </Text>
          <Text style={[styles.detailCell, styles.halfCell, styles.itemPoint, styles.centerText]}>
            {this.props.carbon_dioxide}
          </Text>
        </View>
        <View style={ [styles.detailRow] }>
          <Text style={styles.detailCell}>
            H2O (gal)
          </Text>
          <Text style={[styles.detailCell, styles.itemPoint, styles.centerText]}>
            {this.props.water}
          </Text>
        </View>
        <View style={ [styles.detailRow] }>
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
      <View style={[styles.container]}>
        <View style={[ styles.detailRow] }>
          <Text style={[styles.detailCell, { flexBasis: '30%'}]}>
            CO2 (lbs)
          </Text>
          <Text style={[styles.detailCell, styles.textWhiteBold, { flexBasis: '70%'}]}>
            You’ve offset the equivalent of driving a car for 20 miles.
          </Text>
        </View>

        <View style={[ styles.detailRow, {marginTop: 10}] }>
          <Text style={[styles.detailCell, { flexBasis: '30%'}]}>
            H2O (gal):
          </Text>
          <Text style={[styles.detailCell, styles.textWhiteBold, { flexBasis: '70%'}]}>
            You’ve offset the equivalent of taking 100 showers.
          </Text>
        </View>

        <View style={[ styles.detailRow, {marginTop: 10}] }>
          <Text style={[styles.detailCell, { flexBasis: '30%'}]}>
            Waste (lbs):
          </Text>
          <Text style={[styles.detailCell, styles.textWhiteBold, { flexBasis: '70%'}]}>
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
        style={[styles.linearGradientBoxPadded]}
      >
        <TouchableOpacity
          onPress={() =>
            this.setState({
              front: !this.state.front,
            },
            _eventHit('ImpactComponent', {action: (this.state.front) ? 'back' : 'front'}, res => console.log(res.event, res.params.action))
          )}
        >
          <View style={[styles.componentContainer] }>
            <View style={styles.componentHeader}>
              <Text style={[styles.headerText]}>
                MY IMPACT
              </Text>
            </View>
            <View style={[styles.container]}>
              {this.state.front ? this._viewA() : this._viewB()}
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

