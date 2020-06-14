import React, { Component,useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import SpeechToText from './SpeechToText'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

export default class App extends Component {
  render() {
    return (
	     // <UserInactivity
    //   isActive={active}
    //   timeForInactivity={timer}
    //   onAction={isActive => { setActive(isActive); }}
    //   style={{ flex: 1 }}>
      <SpeechToText />
    //  {/* { active?<AppContainer />:<Login/>} */}
    //   {/* ///Comment this portion below if testing with login
    // // <View>
    // //   <MOApp style={styles.container} />
    // // </View> */}
    //</UserInactivity>
  
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
