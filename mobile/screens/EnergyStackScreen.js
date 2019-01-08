import React from 'react';
import { all } from 'rsvp';
import { ActivityIndicator } from 'react-native'
import { LinearGradient, AppLoading } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';
import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';

import { energy_data, primary_energy_id } from './dummy/data';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    pollInterval: 300,
    variables: {
      name: 'Energy',
    },
  },
})
class EnergyStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };

  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.energy} style={{ flex: 1 }}>
          <ActivityIndicator size={"large"} />
        </LinearGradient>
      );
    }
    //console.log('props again', all_categories.actionCategories);
    const actions = all_categories.sectorActionsByName;
    if (!actions[0].video_id && !actions[0].primary_image) {
      return <LinearGradient {...LinearGradientProps.energy} style={{ flex: 1 }}>
      
    </LinearGradient>;
    }

    return ( 
      <LinearGradient {...LinearGradientProps.energy} style={{ flex: 1 }}>
        <GeneralScreen
          data={actions}
          screen={'Energy'}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
        />
      </LinearGradient>
    );
  }
}

EnergyStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.energy.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default EnergyStackScreen;
