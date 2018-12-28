import React from 'react';
import { Ionicons } from 'expo';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  Button,
  ART,
} from 'react-native';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const { Surface, Group, Shape, ClippingRectangle } = ART;

const d3 = {
  scale,
  shape,
};
const data = [
  { date: new Date(2000, 1, 1), value: 13.24 },
  { date: new Date(2000, 1, 2), value: 15.35 },
  { date: new Date(2000, 1, 3), value: 28.84 },
  { date: new Date(2000, 1, 4), value: 9.92 },
  { date: new Date(2000, 1, 5), value: 13.8 },
  { date: new Date(2000, 1, 6), value: 18.47 },
  { date: new Date(2000, 1, 7), value: 24.47 },
];

const createScaleX = (dArr, rArr) => {
  d3.scale
    .scaleTime()
    .domain(dArr)
    .range(rArr);
};

const createScaleY = (dArr, rArr) => {
  d3.scale
    .scaleLinear()
    .domain(dArr)
    .range(rArr);
};
const [width, height] = [300, 300];
export function createLineGraph({
  // This is the data that we get from the API.
  data,
  width,
  height,
}) {
  // Get last item in the array.
  const lastDatum = data[data.length - 1];

  // Create our x-scale.
  const scaleX = createScaleX(
    [data[0].date * 1000, lastDatum.date8 * 1000],
    [0, width]
  );

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(datum.temperatureMax);
    return all;
  }, []);

  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);

  // Create our y-scale.
  const scaleY = createScaleY([extentY[0], extentY[1]], [0, height]);

  // Use the d3-shape line generator to create the `d={}` attribute value.
  const lineShape = d3.shape
    .line()
    // For every x and y-point in our line shape we are given an item from our
    // array which we pass through our scale function so we map the domain value
    // to the range value.
    .x(d => scaleX(d.date))
    .y(d => scaleY(d.temperatureMax));

  return {
    // Pass in our array of data to our line generator to produce the `d={}`
    // attribute value that will go into our `<Shape />` component.
    path: lineShape(data),
  };
}

class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          borderWidth: 3,
          position: 'absolute',
          bottom: 6,
          left: 6,
          right: 6,
          top: 6,
        }}
      >
        <Surface width={300} height={300} style={{}}>
          <Group x={100} y={100}>
            <Shape d={() => lineGraph(data)} stroke="#000" strokeWidth={1} />
          </Group>
        </Surface>
      </View>
    );
  }
}
TestScreen.navigationOptions = {
  headerTitle: (
    <Text
      style={{
        color: '#ffffff',
        fontSize: 28,
        fontFamily: 'Proxima Nova Bold',
      }}
    >
      MY IMPACT
    </Text>
  ),
  headerStyle: {
    backgroundColor: '#333',
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
    },
  },
};

export default TestScreen;
