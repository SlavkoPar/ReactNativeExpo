import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const DOT_SIZE = 40;

export const Pagination = ({ data, scrollX }) => {
	const inputRange = [-width, 0, width];
	
	const translateX = scrollX.interpolate({
	  inputRange,
	  outputRange: [-DOT_SIZE, 0, DOT_SIZE],
	});

	return (
	  <View style={[styles.pagination]}>
		 <Animated.View
			style={[
			  styles.paginationIndicator,
			  {
				 position: 'absolute',
				 // backgroundColor: 'red',
				 transform: [{ translateX }],
			  },
			]}
		 />
		 {data.map((item) => {
			return (
			  <View key={item.key} style={styles.paginationDotContainer}>
				 <View
					style={[styles.paginationDot, { backgroundColor: item.color }]}
				 />
			  </View>
			);
		 })}
	  </View>
	);
 };

 const styles = StyleSheet.create({
	pagination: {
		position: 'absolute',
		right: 20,
		bottom: 10,
		flexDirection: 'row',
		height: DOT_SIZE,
	 },
	 paginationDot: {
		width: DOT_SIZE * 0.3,
		height: DOT_SIZE * 0.3,
		borderRadius: DOT_SIZE * 0.15,
	 },
	 paginationDotContainer: {
		width: DOT_SIZE,
		alignItems: 'center',
		justifyContent: 'center',
	 },
	 paginationIndicator: {
		width: DOT_SIZE,
		height: DOT_SIZE,
		borderRadius: DOT_SIZE / 2,
		borderWidth: 2,
		borderColor: '#ddd',
	 },
 });