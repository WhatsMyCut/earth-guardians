import React from 'react';
import { all } from 'rsvp';

import { ActivityIndicator } from 'react-native';
import { LinearGradient, AppLoading } from 'expo';
import { Analytics, PageHit } from 'expo-analytics';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
//import { food_data, primary_food_id } from './dummy/data';

@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    pollInterval: 1000,
    variables: {
      name: 'Food',
    },
  },
})
class FoodStackScreen extends React.Component {
  state = { primary_image: '', primary_video: '', actions: [] };
  // async componentDidMount() {
  //   try {
  //     // get the data
  //     const actions = await food_data();

  //     // set the primary image and video
  //     const primary_image = actions[primary_food_id].image;
  //     const primary_video = actions[primary_food_id].video;

  //     //update the state
  //     this.setState({ actions, primary_image, primary_video });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }
  componentDidMount() {
    // Analytics
    () => {
      try {
        const analytics = new Analytics('UA-131896215-1');
        analytics
          .hit(new PageHit('FoodScreen'))
          .then(() => console.log('success '))
          .catch(e => console.log(e.message));
      } catch (e) {
        console.log(e);
      }
    };
  }

  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
          <ActivityIndicator size={'large'} />
        </LinearGradient>
      );
    }

    const actions = all_categories.sectorActionsByName;
    if (!actions[0].video_id && !actions[0].primary_image) {
      return (
        <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }} />
      );
    }
    return (
      <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
        <GeneralScreen
          data={actions}
          screen={'Food'}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
          openZipCodeModal={this.props.openModal}
          onModalClose={this.props.closeModal}
        />
      </LinearGradient>
    );
  }
}

FoodStackScreen.navigationOptions = {
  headerTitle: HeaderNavBar,
  headerStyle: {
    backgroundColor: LinearGradientProps.food.colors[0],
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default FoodStackScreen;
