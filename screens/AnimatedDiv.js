import React from 'react'
import { Animated, StyleSheet, View, Text } from 'react-native';


export default class AnimatedDiv extends React.Component {

	state = {
		opacityAnimationValue: new Animated.Value(1),
		moveAnimationValue: new Animated.ValueXY()
	}

	componentDidMount() {
		
		// So the Animated.View will move and fade out at the same time.
		Animated.parallel([
				Animated.timing(this.state.moveAnimationValue, {
					toValue: 100,
					duration: 5000,
					useNativeDriver: true
				}),
				Animated.timing(this.state.opacityAnimationValue, {
					toValue: 0,
					duration: 5000,
					useNativeDriver: true
				})
		]).start()
	}

	render() {
		console.log(new Date().getMilliseconds())
		return (
			<Animated.View 
				style={{
					opacity: this.state.opacityAnimationValue, 
					transform: this.state.moveAnimationValue.getTranslateTransform(),
					width: 150, 
					height: 150,
					justifyContent: 'center',
					backgroundColor: 'red',
				}} 
			>
				<Text style={[{ color: 'white' }]}>
					Peraaaaaaaaaaaaaaaaaaaaaaaaaaaaa
				</Text>
			</Animated.View>
		)
	}

}