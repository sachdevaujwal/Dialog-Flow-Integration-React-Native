/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';

import './TextToSpeech';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  StatusBar,
} from 'react-native';

import {GiftedChat} from 'react-native-gifted-chat';

import {Dialogflow_V2} from 'react-native-dialogflow';

import { dialogflowConfig } from './env';

const BOT_USER = {
  _id: 2,
  name: 'Virtual Assistant',
  avatar: 'https://media-exp1.licdn.com/dms/image/C4E0BAQERwqLK35zG0A/company-logo_200_200/0?e=2159024400&v=beta&t=jt9W4ycT0Y4g38R3gfjuGAtAzKrGfsx25YbszmHik0A',
};

class ChatBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: `Hi! I am your virtual assistant from Dell Technologies.\n\nHow may I help you today?`,
          createdAt: new Date(),
          user: BOT_USER,
        }
      ]
    };
  };
  

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));

    let message = messages[0].text;
    Dialogflow_V2.requestQuery(
      message,
      result => this.handleGoogleResponse(result),

      error => console.log (error)
    )
  }

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Hi! I am your virtual assistant from Dell Technologies.\n\nHow may I help you today?`,
          createdAt: new Date(),
          user: BOT_USER,
        }
      ]
    })
  }

  handleGoogleResponse (result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    console.log(text);
    this.sendBotResponse (text);
  }

  sendBotResponse(text) {
    let msg = {
      _id: this.state.messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT_USER
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, [msg])
    }));
    this.props.fortextHandle(text)
  }

  // reverseArray (messages) {
  //   revMessages= this.state.messages.reverse();
  // }

  render() {
    console.log("n chatbot");
    // console.log(this.state)
    return (
      // <View style={styles.giftedchat}>
        
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onPressActionButton = {()=>this.props.fortextHandle(this.state.messages)}
          user={{
            _id: 1
          }}
         />    
            // </View>
    );
  }

}

styles = StyleSheet.create ({
  giftedchat: {
    flex: 1, 
    backgroundColor: '#fff',
  }
});

export default ChatBot;