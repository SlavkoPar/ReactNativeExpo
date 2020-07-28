import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Animated from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AnimatedDiv from './AnimatedDiv'
import RotateButton from '../RotateButton'
import Accordion from './Accordion'
import Kamera from './Kamera'
import HeadPhones from './HeadPhones/HeadPhones'

function MyTabBar({ state, descriptors, navigation, position }) {
  return (
    <View style={{ flexDirection: 'row', paddingTop: 20 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        // modify inputRange for custom behavior
        const inputRange = state.routes.map((_, i) => i);
        const opacity = Animated.interpolate(position, {
          inputRange,
          outputRange: inputRange.map(i => (i === index ? 1 : 0.3)),
        });

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
				style={{ flex: 1 }}
				key={index}
          >
            <Animated.Text style={{ opacity }}>{label}</Animated.Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function AnimateDivScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
		<AnimatedDiv />
    </View>
  );
}

function RotateButtonScreen() {
	//    , alignItems: 'center'
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
		{/* <RotateButton />  */}
		<Kamera />
	</View>
  );
}

function AccordionScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
		<Accordion />
    </View>
  );
}

function HeadPhonesScreen() {
	return (
	  <View style={{ flex: 1, justifyContent: 'center' }}>
		 <HeadPhones />
	  </View>
	);
 }

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
   //  <NavigationContainer>
		<Tab.Navigator 
			activeColor="#f0edf6"
			inactiveColor="black"
			barStyle={{ backgroundColor: 'yellowgreen' }}
			tabBar={props => <MyTabBar {...props} />}
			tabBarOptions={{
				activeTintColor: 'tomato',
				inactiveTintColor: 'gray',
			 }}
		>
        <Tab.Screen name="Animate Div" component={AnimateDivScreen} />
        <Tab.Screen name="Rotate Button" component={RotateButtonScreen} />
        <Tab.Screen name="Accordion" component={AccordionScreen} />
        <Tab.Screen name="Head Phones" component={HeadPhonesScreen} />
		  
      </Tab.Navigator>
   //  </NavigationContainer>
  );
}
