import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
} from 'react-native';

import data from './data';
import { Item } from './Item'
import { Circle } from './Circle'
import { Ticker } from './Ticker'
import { Pagination } from './Pagination'

import logo from './assets/ue_black_logo.png'

const { width, height } = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;


/*
	https://github.com/catalinmiron/react-native-headphones-carousel
*/


 export default function App() {
	const scrollX = React.useRef(new Animated.Value(0)).current;

	return (
	  <View style={styles.container}>
		 {/* <StatusBar style='auto' hidden /> */}
		 <Circle data={data} scrollX={scrollX} />
		 <Animated.FlatList
			keyExtractor={(item) => item.key}
			data={data}
			renderItem={({ item, index }) => (
			  <Item {...item} index={index} scrollX={scrollX} />
			)}
			pagingEnabled
			showsHorizontalScrollIndicator={true}
			horizontal
			onScroll={Animated.event(
			  [{ nativeEvent: { contentOffset: { x: scrollX } } }],
			  { useNativeDriver: true }
			)}
			scrollEventThrottle={16}
		 />
		 <Image
			style={styles.logo}
			source={logo}  // require('./assets/ue_black_logo.png'
		 />
		 <Pagination data={data} scrollX={scrollX} />
		 <Ticker data={data} scrollX={scrollX} />
	  </View>
	);
 }
 
 const styles = StyleSheet.create({
	container: {
	  flex: 1,
	},
	logo: {
	  opacity: 0.9,
	  height: LOGO_HEIGHT,
	  width: LOGO_WIDTH,
	  resizeMode: 'contain',
	  position: 'absolute',
	  left: 10,
	  bottom: 10,
	  transform: [
		 { translateX: -LOGO_WIDTH / 2 },
		 { translateY: -LOGO_HEIGHT / 2 },
		 { rotateZ: '-90deg' },
		 { translateX: LOGO_WIDTH / 2 },
		 { translateY: LOGO_HEIGHT / 2 },
	  ],
	},
	
	
 
 });