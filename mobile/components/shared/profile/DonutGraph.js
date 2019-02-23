import React from 'react';
import { View, Text } from 'react-native';
import { ART } from 'react-native';
const { Surface, Group, Shape } = ART;
import * as d3 from 'd3';
import WaterModal from '../modals/NotH2OConsumptionModal';
import { styles, defaults } from '../../../constants/Styles';




export class DonutGraph extends React.Component {


  state={
    loading:true,
    userPurchases: null,
    colors: null,
    sectionAngles: null
  }
  constructor(props){
    super(props);

  }

  // componentDidMount(){


  //     this.setState({
  //       userPurchases,
  //       sectionAngles,
  //       colors,
  //       loading:false
  //     })

  // }
  render() {
    const [width, height] = [this.props.width, this.props.height];
    const smallerLength = width > height ? height : width;
    const userPurchases = [
      { itemName: 'Carbon Monoxide', value: parseInt(this.props.carbon_dioxide || 0)},
      { itemName: 'Water', value: parseInt(this.props.water)},
      { itemName: 'Waste', value: parseInt(this.props.waste)}
    ];
    const total = userPurchases.reduce((sum, item) =>{
        return sum+=item.value
    }, 0)

    const colors = d3
      .scaleLinear()
      .domain([0, parseInt(userPurchases.length/2), userPurchases.length])
      .range(["grey", "lightGrey", "darkGrey"]);
    const path = d3
      .arc()
      .outerRadius(smallerLength / 2 - 10)
      .padAngle(0)
      .innerRadius(smallerLength / 4);

    let waterPercent = Math.floor((parseFloat(this.props.water, 2) / total)*100);
    let wastePercent =Math.floor((parseFloat(this.props.waste, 2) / total)*100);
    let carbonDioxidePercent =Math.floor((parseFloat(this.props.carbon_dioxide, 2) / total)*100);
    if(this.props.water ==0 ){
      waterPercent = 0
    }
    if(this.props.waste == 0){
      wastePercent = 0;
    }
    if(this.props.carbon_dioxide == 0){
      carbonDioxidePercent = 0;
    }

    let showGraph = false;

    const sectionAngles = d3.pie().value(d => d.value)(userPurchases);

    if(waterPercent != 0 || carbonDioxidePercent != 0 || wastePercent != 0){
      showGraph = true
    }
    return (
      <View style={[styles.container, styles.centerAll]}>
      {showGraph && (
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map(section => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke="#999"
                fill={`rgba(${0},${colors(section.index)},${colors(
                  section.index+1
                )*2}, 0.9)`}
                strokeWidth={[defaults.hairline]}
              />
            ))}
          </Group>
        </Surface>
        )}
        {!showGraph && (
          <View style={{flex:1, justifyContent:"center", alignContent:"center", paddingTop:30}}>
            <Text style={{color:"white", fontSize:24, textAlign:"center"}}>You should take some actions</Text>
            <Text style={{color:"white", fontSize:24, textAlign:"center"}}> and earn some points!</Text>
          </View>

        )}
        <View style={{flex:1, flexDirection:'row', alignContent:"space-between", justifyContent:"flex-end", paddingTop: showGraph ? 0 : 20}}>
            <Text style={[styles.graphLabel]}>CO2 {typeof carbonDioxidePercent !== 'NaN' ? carbonDioxidePercent : 0} %</Text>
            <Text style={[styles.graphLabel]}>Water {typeof waterPercent !== 'NaN' ? waterPercent : 0} %</Text>
            <Text style={[styles.graphLabel]}>Waste {typeof wastePercent !== 'NaN' ? wastePercent : 0} %</Text>
        </View>
      </View>
    );
  }
}
