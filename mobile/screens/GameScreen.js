import React from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PubSub from 'pubsub-js'
import GameControls from '../components/game-stack/GameControls';
import GameCards from '../components/game-stack';
import NavigationService from '../navigation/navigationService';
import graphql from '../components/hoc/graphql';
import { TAKE_ACTION } from '../components/graphql/mutations/take_action_mutation';
import { GET_USER } from '../components/graphql/queries/get_user';

@graphql(TAKE_ACTION, {
  name: 'take_action',
})
@graphql(GET_USER, {
  name: 'get_user',
})
class GameScreen extends React.Component {
  cardStack;
  state = {
    previousScreen: this.props.previousScreen,
    mounted: false,
  };

  componentDidMount() {
    this.setState({ mounted: true });
  }

  swipeRight = index => {
    const { take_action, get_user } = this.props;
    const games = this.props.navigation.getParam('games', []);
    console.log('swiped right', index);
    if (games[index]) {
      console.log('game did exist');
      let variables = {
        id: get_user.me.id,
        action: games[index].id,
      };

      take_action({ variables }).then(res => {
        console.log('took action', res);
        this._navigateBack();
      });
    }
  };

  swipeLeft = index => {
    console.log('swiped left', index);
  };

  handleRightPress = () => {
    console.log('tried to swipe right');
    if (this.state.mounted) {
      console.log('card stack', this.cardStack);
      this.cardStack.swipeRight();
    }
  };

  handleLeftPress = () => {
    console.log('tried to swipe left');
    if (this.state.mounted) {
      this.cardStack.swipeLeft();
    }
  };

  _navigateBack = () => {
    const screen = this.props.navigation.getParam(
      'previousScreen',
      'MyActions'
    );
    console.log('navigating back');
    PubSub.publish('GameComplete');
    NavigationService.navigate(screen,{previousScreen:screen});
  };

  render() {
    const games = this.props.navigation.getParam('games', []);
    const game_title = this.props.navigation.getParam('game_title', null);
    return (
      <View style={styles.container}>
        {game_title && (
          <TouchableOpacity onPress={this._navigateBack}>
            <Text style={styles.header}>{game_title.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        {!this.props.get_user.loading &&
          <GameCards
            canDelete={this.props.canDelete || null}
            items={games}
            user={this.props.get_user.me}
            navigateBack={this._navigateBack}
            swipeRight={this.swipeRight}
            swipeLeft={this.swipeLeft}
            ref={ref => (this.cardStack = ref)}
          />
        }

        {/* <GameControls
               rightPress={this.handleRightPress}
               leftPress={this.handleLeftPress}
            /> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 24,
  },
  cardContainer: {
    flex: 1,
    width: Dimensions.get('window').width - 48,
    marginBottom: 12,
  },
  header: {
    fontSize: 24,
    paddingVertical: 12,
    fontFamily: 'Proxima Nova Bold',
  },
});

export default GameScreen;
