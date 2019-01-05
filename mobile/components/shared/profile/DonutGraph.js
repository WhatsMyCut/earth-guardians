import React from 'react';
import { View, Text } from 'react-native';
import { ART } from 'react-native';
const { Surface, Group, Shape } = ART;
import * as d3 from 'd3';

const userPurchases = [
  { itemName: 'Mountain Dew', price: 3 },
  { itemName: 'Shoes', price: 50 },
  { itemName: 'Kit Kat', price: 1 },
  { itemName: 'Taxi', price: 24 },
  { itemName: 'Watch', price: 100 },
  { itemName: 'Headphones', price: 15 },
  { itemName: 'Wine', price: 16 },
];
const sectionAngles = d3.pie().value(d => d.price)(userPurchases);

const colors = d3
  .scaleLinear()
  .domain([0, userPurchases.length])
  .range([0, 255]);
export class DonutGraph extends React.Component {
  render() {
    const [width, height] = [this.props.width, this.props.height];
    const smallerLength = width > height ? height : width;
    const path = d3
      .arc()
      .outerRadius(smallerLength / 2 - 10)
      .padAngle(0.05)
      .innerRadius(smallerLength / 3);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map(section => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke="#000"
                fill={`rgb(${20},${colors(section.index) / 1.1},${colors(
                  section.index
                )})`}
                strokeWidth={1}
              />
            ))}
          </Group>
        </Surface>
      </View>
    );
  }
}
