import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient, Icon } from 'expo';
import { TouchableRipple, Button } from 'react-native-paper';

export default class ActionDetails extends React.Component {
  state ={

  }

  _takeInAction = () => {
    // TODO update Database

    this.setState(
      prevState => ({
        in: !prevState.in,
      }),
      () => {
        console.log(`The state is ${this.state.in}`);
      }
    );

    this.props.takeTheAction();
  };


  render() {
    const { data } = this.props;
    if(!data){
      return <Text>Nothing available</Text>
    }

    const status_icon_name = this.props.canDelete
      ? 'circle-slice-8'
      : this.state.in ? 'circle-slice-8' : 'circle-outline';
    const color = this.props.canDelete ? 'green' : this.state.in ? 'green' : '#aaa';
    let item = data.action ? data.action : data;
    return (
      <View style={{ flex: 1, margin: 5 }}>
        <View style={{ flex: 1, marginTop: 10, marginBottom: 3 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#666',
            }}
          >
            {this.props.canDelete ? "METRICS EARNED":"METRICS" }
          </Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row', marginLeft:-16, alignContent:"flex-start"}}>
          <View style={{ flex: 1}}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              CO2
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center" }}>
              (lbs)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.carbon_dioxide}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              Water
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center" }}>
              (gal)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.water}

            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', textAlign:"center"  }}>
              Waste
            </Text>
            <Text style={{ fontFamily: 'Proxima Nova', color: '#666', fontSize:8, textAlign:"center"}}>
              (lbs)
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                fontFamily: 'Proxima Nova Bold',
                color: '#666',
                textAlign:"center" 
              }}
            >
              {item.waste}
            </Text>
          </View>
        </View>

      
         <View style={{flex:1}}>
       <View style={{ flex: 1 }}>
          <Text
            style={{ fontFamily: 'Proxima Nova', color: '#666', marginTop: 20 }}
          > COMMUNITY
          </Text>
        </View>
        {this.props.zipcode && (
        <View style={{flex:1}}>
        <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#eee',
            }}
          >
            {this.props.zipcode}
          </Text>
          </View>
        )}
        {!this.props.zipcode && (
        <TouchableOpacity style={{ flex: 1 }} onPress={this.props.openZipCodeModal}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              fontFamily: 'Proxima Nova Bold',
              color: '#eee',
            }}
          >
            Zip Code
          </Text>
          
        </TouchableOpacity> 
          )}
        </View>
      
        {/* <View style={{ flex: 1, marginBottom: 10 }}>
          <Text
            style={{
              fontSize: 10,
              fontFamily: 'Proxima Nova',
              color: '#666',
            }}
          >
            You’ve offset the equivalent of 50 showers.
          </Text>
        </View> */}
        <TouchableOpacity
                  onPress={() => {
                    if(!this.props.canDelete){
                      this._takeInAction()
                    }
                  }}
                  style={{flexDirection:'row', justifyContent:'flex-end', alignContent:"center"}}
                >
                  <Text style={{fontSize: 18,fontWeight: '700', fontFamily: 'Proxima Nova Bold',color:'#000000', paddingRight:10}}>{this.props.canDelete ? "You did this!" : "I'm in!"}</Text>
                  <Icon.MaterialCommunityIcons
                    name={status_icon_name}
                    style={{ color: color, fontSize: 18 }}
                  />
        </TouchableOpacity>
      </View>
    );
  }
}
