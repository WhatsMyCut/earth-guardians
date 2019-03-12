import React from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'expo';
import PubSub from 'pubsub-js'
import { _eventHit } from '../../../services/googleAnalytics'
import { RetrieveData } from '../../../store/AsyncStore';
import { styles } from '../../../constants/Styles'
export default class ActionDetails extends React.Component {

  constructor(props) {
    super(props)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }
  state = {
    in: false
  };
  openModal() {
    PubSub.publish('showZipCodeModal', true);
  }
  closeModal() {
    PubSub.publish('closeModal');
  }
  _takeInAction = async () => {
    try {
      // TODO update Database

      this.setState(
        prevState => ({
          in: !prevState.in,
        })
      );

      this.props.takeTheAction();
      const page = 'MyActionScreen'
      const item_id = await this.props.data.id;
      const phone = await RetrieveData('phone');
      const inout = (this.state.in) ? 'in' : 'out'
      const params = {
        page, event: 'TakeAction', in: inout, phone, id: item_id
      }
      _eventHit('TakeAction', params, res => console.log(res.event, res.params))
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { data } = this.props;
    if (!data) {
      return <Text>Nothing available</Text>;
    }

    const status_icon_name = this.state.in ? 'circle-slice-8' : 'circle-outline';
    const color = this.state.in ? 'green' : '#aaa';
    const yourverbiage = !this.props.canDelete || this.props.canGoThrough ? "I'm In!":"Can't Take Yet!"

    let item = data.action ? data.action : data;

    return (
      <View style={[styles.container, { justifyContent: 'space-between', flexDirection: 'column'}]}>
        <View style={[styles.contianer, { marginTop: 5, marginBottom: 20 }]}>
          <Text style={[styles.actionCardHeader, styles.centerText]}>
            {this.props.canDelete ? 'METRICS EARNED' : 'METRICS'}
          </Text>
        </View>

        <View style={[styles.container, {}]}>
          <View style={[styles.container, { flexDirection: 'row', alignContent:" flex-start"}]}>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                CO2
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (lbs)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.carbon_dioxide || 0}
              </Text>
            </View>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                Water
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (gal)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.water}
              </Text>
            </View>
            <View style={[styles.container]}>
              <Text style={[styles.actionCardLabel]}>
                Waste
              </Text>
              <Text style={[styles.actionCardTinyLabel]}>
                (lbs)
              </Text>
              <Text style={[styles.actionCardValue]}>
                {item.waste}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.container, { marginVertical: 10}]}>
          <View style={[styles.container]}>
            <Text style={[styles.actionCardSubHeader]}>
              COMMUNITY
            </Text>
          </View>

          {this.props.zipcode && (
            <View style={[styles.contianer]}>
              <Text style={[styles.actionCardValue, {paddingBottom:10}]}>
                {this.props.zipcode}
              </Text>
            </View>
          )}
          {!this.props.zipcode && (
            <TouchableOpacity style={[styles.container]} onPress={()=> {
              if(this.props.visible){
                this.openModal()
              }
            }}>
              <Text style={[styles.actionCardPlaceholderText]}>
                Zip Code
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            if(this.props.visible){
              this._takeInAction()
            }
          }}
          disabled={this.props.canDelete ? !this.props.canGoThrough : false}
          style={{flexDirection:'row', justifyContent:'flex-end', alignContent:"center"}}
        >
          <Text style={[styles.actionCardSubHeader]}>{ yourverbiage }</Text>
          <Icon.MaterialCommunityIcons
            name={status_icon_name}
            style={{ color: color, fontSize: 18 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
