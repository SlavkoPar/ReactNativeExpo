import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
console.log('width:', width)

export const Item = ({ imageUri, heading, description, index, scrollX}) => {
	const inputRange = [
		(index - 1) * width,
		index * width,
		(index + 1) * width
	];

	const inputRangeOpacity = [
	  (index - 0.3) * width,
	  index * width,
	  (index + 0.3) * width,
	];

	const scale = scrollX.interpolate({
	  inputRange,
	  outputRange: [0, 1, 0],
	});

	const translateXHeading = scrollX.interpolate({
	  inputRange,
	  outputRange: [width * 0.1, 0, -width * 0.1],
	});

	const translateXDescription = scrollX.interpolate({
	  inputRange,
	  outputRange: [width * 0.7, 0, -width * 0.7],
	});
	
	const opacity = scrollX.interpolate({
	  inputRange: inputRangeOpacity,
	  outputRange: [0, 1, 0],
	});
 
	return (
	  <View style={styles.itemStyle}>
		 <Animated.Image
			source={imageUri}
			style={[
			  styles.imageStyle,
			  {
				 transform: [{ scale }],
			  },
			]}
		 />
		 <View style={styles.textContainer}>
			<Animated.Text
			  style={[
				 	styles.heading,
				 {
					//opacity,
					transform: [{ translateX: translateXHeading }],
				 },
			  ]}
			>
			  {heading}
			</Animated.Text>
			<Animated.Text
			  style={[
				 styles.description,
				 {
					//opacity,
					transform: [
					  {
						 translateX: translateXDescription,
					  },
					],
				 },
			  ]}
			>
			  {description}
			</Animated.Text>
		 </View>
	  </View>
	);
 };


 const styles = StyleSheet.create({
	itemStyle: {
	  width,
	  height: height-150,
	  alignItems: 'center',
	  justifyContent: 'center',
	  borderWidth: 1,
	  borderColor: 'red'
	},
	imageStyle: {
	  width: width * 0.75,
	  height: width * 0.75,
	  resizeMode: 'contain',
	  flex: 1,
	  borderWidth: 1,
	  borderColor: 'blue'
	},
	textContainer: {
	  alignItems: 'flex-start',
	  alignSelf: 'flex-end',
	  flex: 0.5,
	},
	heading: {
	  color: '#444',
	  textTransform: 'uppercase',
	  fontSize: 24,
	  fontWeight: '800',
	  letterSpacing: 2,
	  marginBottom: 5,
	  borderWidth: 1,
	  borderColor: 'green'
	},
	description: {
	  color: '#ccc',
	  fontWeight: '600',
	  textAlign: 'left',
	  width: width * 0.75,
	  marginRight: 10,
	  fontSize: 16,
	  lineHeight: 16 * 1.5,
	  borderWidth: 1,
	  borderColor: 'navy'
	}
 });