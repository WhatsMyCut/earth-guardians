import React, { Component } from 'react';
import { Image, Text } from 'react-native';
import shorthash from 'shorthash';
import { FileSystem } from 'expo';




export default class CacheImage extends Component {

    state = {
        source: null,
        loading: true,
    }

    componentDidMount = async () => {
        const { uri } = this.props;
       
        const name = shorthash.unique(uri);
        console.log('name', name);
        const path = `${FileSystem.cacheDirectory}${name}`;
        const image = await FileSystem.getInfoAsync(path);
        if(image.exists){
            console.log('image exists');
            this.setState({
                source: {
                    uri : image.uri,
                    isStatic:true
                },
                loading: false
            })
            return;
        }

        console.log('image did not exist');

        const newImage = await FileSystem.downloadAsync(uri,path);
        this.setState({source: {
            uri: newImage.uri,
            isStatic:true
        }, loading:false})
    }

    render(){
        const { loading } = this.state;
        if(loading){
            return <Text>Loading</Text>
        }
        console.log('this.state.source.uri', this.state.source.uri);

        return (<Image style={{...this.props.style, height:180, width:180}} source={this.state.source} />)
    }
}