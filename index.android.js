'use strict';

import React, { Component } from 'react';

import {
  Alert,
  Button,
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  TouchableOpacity,
  Linking,
} from 'react-native';

import {
	StackNavigator
} from 'react-navigation';

import QRCodeScanner from 'react-native-qrcode-scanner';

class Scanner extends Component{
  static navigationOptions = {
    title: 'Scan the QRcode',
  };

  onSuccess(e) {
    Linking.openURL(e.data).catch(err => console.error('An error occured', err));
  }
	render() {
		return(
			<QRCodeScanner
			  title='Scan Code'
			  onRead={(e) => alert('Success and go to' +  e.data)}
			  topContent={(
				<Text style={styles.centerText}>
				  Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
				</Text>
			  )}
			  bottomContent={(
				<TouchableOpacity style={styles.buttonTouchable}>
				  <Text style={styles.buttonText}>OK. Got it!</Text>
				</TouchableOpacity>
			  )}
			/>      
		);
	}
}

class HomeScreen extends Component{
  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
	// 这句话什么意思 why embed with {}
    const { navigate } = this.props.navigation;
    return (
		<Button
		  onPress={() => navigate('Scanner')}
		  title="Press Me"
		  style={styles.buttonPosition}
		/>
    );
  }
}
const simpleApp = StackNavigator({
	Home: {screen: HomeScreen },
	Scanner: {screen: Scanner },
});

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },

  textBold: {
    fontWeight: '500',
    color: '#000',
  },

  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },

  buttonTouchable: {
    padding: 16,
  },
	buttonPosition: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	}
});

AppRegistry.registerComponent('QRcodeScanner', () => simpleApp);


