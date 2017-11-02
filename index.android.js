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
  SectionList,
  FlatList,
  View
} from 'react-native';

import {
	StackNavigator
} from 'react-navigation';

import QRCodeScanner from 'react-native-qrcode-scanner';

//import the self written js
import ShowScanScreen from './src/ShowScanScreen'
import HelloWorld from './src/HelloWorld'
// import AMapLocationUtil from './src/AMapLocationUtil'
// import AMapLocationDemo from './src/AMapLocationDemo'

class Hello extends Component{
	render(){
		return(
			<View>
				<HelloWorld/>
			</View>
		);
	}
}

class ShowScan extends Component{
	render(){
		return(
			<View>
				<ShowScanScreen/>
			</View>
		);
	}
}

// class AMap extends Component{
// 	render(){
// 		return(
// 			<View>
// 				<AMapLocationDemo/>
// 			</View>
// 		);
// 	}
// }

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

class FlatListBasic extends Component{
  render() {
    return (
      <View style={f_styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={f_styles.item}>{item.key}</Text>}
        />
      </View>
    );
  }
}

class SectionListBasic extends Component{
  render() {
    return (
      <View style={s_styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text style={s_styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={s_styles.sectionHeader}>{section.title}</Text>}
        />
      </View>
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
		<View>
			<Button
			  onPress={() => navigate('Scanner')}
			  title="Press Me"
			  style={styles.buttonPosition}
			/>
			<Button
			  onPress={() => navigate('FlatList')}
			  title="To flatlist"
			  style={styles.buttonPosition}
			/>
			<Button
			  onPress={() => navigate('SectionList')}
			  title="To sectionlist"
			  style={styles.buttonPosition}
			/>
			<Button
			  onPress={() => navigate('Hello')}
			  title="To Hello"
			  style={styles.buttonPosition}
			/>
			<Button
			  onPress={() => navigate('ShowScan')}
			  title="To ShowScan"
			  style={styles.buttonPosition}
			/>
			{/*<Button*/}
		{/*onPress={() => {() => navigate('AMap') }}*/}
			  {/*title="To AMap"*/}
			  {/*style={styles.buttonPosition}*/}
			{/*/>*/}
		</View>
    );
  }
}

const simpleApp = StackNavigator({
	Home: {screen: HomeScreen },
	Scanner: {screen: Scanner },
	FlatList: {screen: FlatListBasic},
	SectionList: {screen: SectionListBasic},
	Hello: {screen: Hello},
	ShowScan: {screen: ShowScan},
	// AMap: {screen: AMap},
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

const f_styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

const s_styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})

AppRegistry.registerComponent('QRcodeScanner', () => simpleApp);
