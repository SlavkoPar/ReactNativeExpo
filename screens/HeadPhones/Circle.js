import React from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const CIRCLE_SIZE = width * 0.6;

export const Circle = ({ data, scrollX }) => {
	return (
	  <View style={[StyleSheet.absoluteFillObject, styles.circleContainer]}>
		 {data.map(({ color }, index) => {
			const inputRange = [
			  (index - 0.55) * width,
			  index * width,
			  (index + 0.55) * width,
			];
			const scale = scrollX.interpolate({
			  inputRange,
			  outputRange: [0, 1, 0],
			  extrapolate: 'clamp',
			});
			const opacity = scrollX.interpolate({
			  inputRange,
			  outputRange: [0, 0.2, 0],
			});
			return (
			  <Animated.View
				 key={index}
				 style={[
					styles.circle,
					{
					  backgroundColor: color,
					  opacity,
					  transform: [{ scale }],
					},
				 ]}
			  />
			);
		 })}
	  </View>
	);
 };

 const styles = StyleSheet.create({
	 
	circleContainer: {
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	circle: {
	  width: CIRCLE_SIZE,
	  height: CIRCLE_SIZE,
	  borderRadius: CIRCLE_SIZE / 2,
	  position: 'absolute',
	  top: '15%',
	},
 });