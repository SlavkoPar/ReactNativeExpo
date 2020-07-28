import * as React from 'react';
import { AsyncStorage, Button, Text, TextInput, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useNavig } from './useNavig'

import TabNavig from './screens/TabNavig'

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}


function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { methods: { signIn } } = useNavig();

  return (
    <View>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign in" onPress={() => signIn({ username, password })} />
    </View>
  );
}

const Stack = createStackNavigator();


// Fetch the token from storage then navigate to our appropriate place
const bootstrapAsync = async (dispatch) => {
	let userToken;

	try {
		userToken = await AsyncStorage.getItem('userToken');
	} catch (e) {
		// Restoring token failed
	}

	// After restoring token, we may need to validate it in production apps

	// This will switch to the App screen or Auth screen and this loading
	// screen will be unmounted and thrown away.
	dispatch({ type: 'RESTORE_TOKEN', token: userToken });
};


export default function Navig({ navigation }) {

	const { state, dispatch } = useNavig();
	
	React.useEffect(() => {
		bootstrapAsync(dispatch)
	}, []);
	
	console.log('NAVIG state:', state)

	return (
			<NavigationContainer>
				<Stack.Navigator>
					{state.isLoading ? (
						// We haven't finished checking for the token yet
						<Stack.Screen name="Splash" component={SplashScreen} />
					) : state.userToken == null ? (
						// No token found, user isn't signed in
						<Stack.Screen
							name="SignIn"
							component={SignInScreen}
							options={{
								title: 'Sign in',
								// When logging out, a pop animation feels intuitive
								animationTypeForReplace: state.isSignout ? 'pop' : 'push',
							}}
						/>
					) : (
						// User is signed in
						// <Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen name="Home" component={TabNavig} />
					)}
				</Stack.Navigator>
			</NavigationContainer>

	);
}
