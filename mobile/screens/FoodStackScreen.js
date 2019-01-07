import React from 'react';
import { all } from 'rsvp';
import { LinearGradient, AppLoading } from 'expo';

import { ALL_ACTION_CATEGORIES } from '../components/graphql/queries/all_action_categories_query';
import graphql from '../components/hoc/graphql';
import HeaderNavBar from '../components/shared/navBar/HeaderNavBar';

import LinearGradientProps from '../constants/LinearGradientProps';
import GeneralScreen from './GeneralScreen';
import { food_data, primary_food_id } from './dummy/data';


@graphql(ALL_ACTION_CATEGORIES, {
  name: 'all_categories',
  options: {
    fetchPolicy: 'network-only',
    variables: {
      name: 'Travel',
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
  render() {
    const { all_categories } = this.props;
    if (all_categories.loading) {
      return (
        <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
          <AppLoading />
        </LinearGradient>
      );
    }

    const actions = all_categories.sectorActionsByName;
    if (!actions[0].video_id && !actions[0].primary_image) {
      return <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
      
    </LinearGradient>;
    }
    return (
      <LinearGradient {...LinearGradientProps.food} style={{ flex: 1 }}>
        <GeneralScreen
          data={actions}
          primary_image={actions[0].primary_image}
          primary_video={actions[0].video_id}
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
