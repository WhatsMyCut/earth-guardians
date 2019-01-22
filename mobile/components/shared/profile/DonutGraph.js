import React from 'react';
import { View, Text } from 'react-native';
import { ART } from 'react-native';
const { Surface, Group, Shape } = ART;
import * as d3 from 'd3';
import WaterModal from '../modals/NotH2OConsumptionModal';





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
    const sectionAngles = d3.pie().value(d => d.value)(userPurchases);
    
    const colors = d3
      .scaleLinear()
      .domain([0, userPurchases.length])
      .range([0, 150]);
    const path = d3
      .arc()
      .outerRadius(smallerLength / 2 - 10)
      .padAngle(0.05)
      .innerRadius(smallerLength / 5);

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

    if(waterPercent != 0 || carbonDioxidePercent != 0 || wastePercent != 0){
      showGraph = true
    }
  
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {showGraph && (
        <Surface width={width} height={height}>
          <Group x={width / 2} y={height / 2}>
            {sectionAngles.map(section => (
              <Shape
                key={section.index}
                d={path(section)}
                stroke="#000"
                fill={`rgba(${0},${colors(section.index)},${colors(
                  section.index+1
                )*2}, 0.7)`}
                strokeWidth={1}
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
            <Text style={{color:"white", fontFamily:"Proxima Nova", fontSize:14, paddingRight:10}}>CO2 {typeof carbonDioxidePercent !== 'NaN' ? carbonDioxidePercent : 0} %</Text>
            <Text style={{color:"white", fontFamily:"Proxima Nova", fontSize:14, paddingRight:10}}>Water {typeof waterPercent !== 'NaN' ? waterPercent : 0} %</Text>
            <Text style={{color:"white", fontFamily:"Proxima Nova", fontSize:14, paddingRight:10}}>Waste {typeof wastePercent !== 'NaN' ? wastePercent : 0} %</Text>

        </View>
      </View>
    );
  }
}
