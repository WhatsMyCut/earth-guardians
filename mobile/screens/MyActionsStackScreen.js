import React from 'react';
import {
  SafeAreaView,
  Image,
  Platform,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';
export default class MyActionsStackScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <FlatList
            data={[
              { key: 'Devin1' },
              { key: 'Jackson11' },
              { key: 'James111' },
              { key: 'Joel1111' },
              { key: 'John111111' },
              { key: 'Jillian1111' },
              { key: 'Jimmy111111' },
              { key: 'Julie1111' },
              { key: 'Devin2' },
              { key: 'Jackson2' },
              { key: 'James2' },
              { key: 'Joel2' },
              { key: 'John2' },
              { key: 'Jillian2' },
              { key: 'Jimmy2' },
              { key: 'Julie2' },
              { key: 'Devin3' },
              { key: 'Jackson3' },
              { key: 'James3' },
              { key: 'Joel3' },
              { key: 'John3' },
              { key: 'Jillian3' },
              { key: 'Jimmy3' },
              { key: 'Julie3' },
              { key: 'Devin4' },
              { key: 'Jackson4' },
              { key: 'James4' },
              { key: 'Joel4' },
              { key: 'John4' },
              { key: 'Jillian4' },
              { key: 'Jimmy4' },
              { key: 'Julie4' },
              { key: 'Devin5' },
              { key: 'Jackson5' },
              { key: 'James5' },
              { key: 'Joel5' },
              { key: 'John5' },
              { key: 'Jillian5' },
              { key: 'Jimmy5' },
              { key: 'Julie5' },
              { key: 'Devin' },
              { key: 'Jackson' },
              { key: 'James' },
              { key: 'Joel' },
              { key: 'John' },
              { key: 'Jillian' },
              { key: 'Jimmy' },
              { key: 'Julie' },
            ]}
            renderItem={({ item }) => (
              <Card>
                <CardImage
                  source={{ uri: 'http://placehold.it/480x270' }}
                  title="Above all i am here"
                />
                <CardTitle
                  title="This is a title"
                  subtitle="This is subtitle"
                />

                <CardContent style={styles.item} text={item.key} />
                <CardAction separator={true} inColumn={false}>
                  <CardButton onPress={() => {}} title="Push" color="blue" />
                  <CardButton onPress={() => {}} title="Later" color="blue" />
                </CardAction>
              </Card>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    borderWidth: 1,
    ///borderColor: 'red',
  },
});
