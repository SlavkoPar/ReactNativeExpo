import React, { createContext, useContext, useReducer, Dispatch } from 'react';
import navigReducer from './NavigReducer'

const initialState = { 
	isLoading: true,
	isSignout: false,
	userToken: null
}

let methods;
let NavigContext;

export const NavigProvider = ({ children }) => {
	const [state, dispatch] = useReducer(navigReducer, initialState)

	methods = React.useMemo(
		() => ({
			signIn: async data => {
				// In a production app, we need to send some data (usually username, password) to server and get a token
				// We will also need to handle errors if sign in failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},

			signOut: () => dispatch({ type: 'SIGN_OUT' }),

			signUp: async data => {
				// In a production app, we need to send user data to server and get a token
				// We will also need to handle errors if sign up failed
				// After getting token, we need to persist the token using `AsyncStorage`
				// In the example, we'll use a dummy token
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},
		}), []
	);


	if (NavigContext === undefined) {
		NavigContext = createContext({ state, dispatch })
	}


  	return (
   	<NavigContext.Provider value={{ state, dispatch }}>
   		{children}
   	</NavigContext.Provider>
  	)
}

export const useNavig = () => {
	const context = useContext(NavigContext);
	if (!context) {
		throw new Error('useNavig must be used within a NavigProvider')
	}
	const { state, dispatch } = context;

	const { signIn, signOut, signUp } = methods;

	return { state, dispatch, signIn, signOut, signUp };
}