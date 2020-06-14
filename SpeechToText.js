// App.js
import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AppRegistry,
  TouchableHighlight
} from 'react-native';
import Voice from 'react-native-voice';

import playImage from './play.png'
import pauseImage from './pause.png'



export default class VoiceNative extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
	  active : false,
	  currentImage: './play.png',
	  End: ''
    };
	Voice.onSpeechStart = this.onSpeechStart.bind(this);
    Voice.onSpeechRecognized = this.onSpeechRecognized.bind(this);
    Voice.onSpeechResults = this.onSpeechResults.bind(this);
    Voice.onSpeechEnd = this.onSpeechEnd.bind(this);
  }
  
  
componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }
onSpeechStart(e) {
    this.setState({
      started: '√',
    });
  };
onSpeechRecognized(e) {
    this.setState({
      recognized: '√',
    });
  };
 onSpeechEnd(e) {
    this.setState({
      End: '√',
	  active: false
    });
  };
onSpeechResults(e) {
    this.setState({
      results: e.value[0],
    });
	console.log(e.value[0])
	}
  
  
  
async _startRecognition(e) {
    this.setState({
      recognized: '',
      started: '',
      results: [],
	  active: true,
    });
    try {
      await Voice.start('en-US');
    } catch (e) {
      console.error(e);
    }
  }
 
async  _stopRecognizing(e){
	  this.setState({
	  active: false,
    });
    try {
      await Voice.stop();
    } catch (e) {
      //eslint-disable-next-line
      console.error(e);
    }
  };


render () {
    return (
      <View  style={styles.MainContainer}>
	<TouchableHighlight onPress={
	this.state.active ?  this._stopRecognizing.bind(this) : this._startRecognition.bind(this)}>
	
	<Image style={styles.imageStyle} source={this.state.active ? pauseImage : playImage} />
    </TouchableHighlight>
    <View style={styles.result}><Text> Result : {this.state.results} </Text></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems : 'center',

  },
  imageStyle : {
	width: 100,
    height: 100,
  },
  result:{
    marginTop:200
  }

});