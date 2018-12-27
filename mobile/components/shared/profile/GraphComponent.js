import React from 'react';
import { View, Text, Image, Dimensions, ART } from 'react-native';
//import { scaleLinear, scaleTime } from 'd3-scale';
//import { line } from 'd3-shape';
//import d3Array from 'd3-array';

/*
const x = scaleLinear()
  .domain([0, 100])
  .range([0, 100]);


const data = [
  { date: new Date(2000, 1, 1), value: 83.24 },
  { date: new Date(2000, 1, 2), value: 85.35 },
  { date: new Date(2000, 1, 3), value: 98.84 },
  { date: new Date(2000, 1, 4), value: 79.92 },
  { date: new Date(2000, 1, 5), value: 83.8 },
  { date: new Date(2000, 1, 6), value: 88.47 },
  { date: new Date(2000, 1, 7), value: 94.47 },
];

const lineGraph = line()
  .x(d => d.date)
  .y(d => d.value);

const d3 = {
  scale,
  shape,
};
*/
/*
// Create our line generator.
const line = d3
  .line()
  // For every x value create the x accessor,
  // which uses our x scale function.
  .x(function(d) {
    return x(d.date);
  })
  // Make our y accessor.
  .y(function(d) {
    return y(d.value);
  });

// Given the data create the d path value!
line(data);
*/
/*
export function createLineGraph({
  // This is the data that we get from the API.
  data,
  width,
  height,
}) {
  // Get last item in the array.
  const lastDatum = data[data.length - 1];

  // Create our x-scale.
  const scaleX = createScaleX(data[0].time, lastDatum.time, width);

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(datum.temperatureMax);
    return all;
  }, []);

  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);

  // Create our y-scale.
  const scaleY = createScaleY(extentY[0], extentY[1], height);

  // Use the d3-shape line generator to create the `d={}` attribute value.
  const lineShape = d3.shape
    .line()
    // For every x and y-point in our line shape we are given an item from our
    // array which we pass through our scale function so we map the domain value
    // to the range value.
    .x(d => scaleX(d.time))
    .y(d => scaleY(d.temperatureMax));

  return {
    // Pass in our array of data to our line generator to produce the `d={}`
    // attribute value that will go into our `<Shape />` component.
    path: lineShape(data),
  };
}

const dAttribute = createLineGraph({
  data, // From API.
  width: 200,
  height: 100,
});
*/
const { Surface, Group, Shape } = ART;
const SCREEN_WIDTH = Dimensions.get('window').width;
export default class GraphComponent extends React.Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#666',
          justifyContent: 'center',
          alignItems: 'center',
          width: SCREEN_WIDTH * 0.9,
          borderRadius: 20,
          height: 150,
          marginVertical: 5,
        }}
      >
        {/* <View style={{ flex: 1 }}>
          <Surface width={200} height={100}>
            <Group x={0} y={0}>
              <Shape d={lineGraph(data)} stroke="#fff" strokeWidth={1} />
            </Group>
          </Surface>
        </View> */}

        <Image
          source={require('./temp/barchart.png')}
          style={{ height: 100, width: 200 }}
        />
      </View>
    );
  }
}
