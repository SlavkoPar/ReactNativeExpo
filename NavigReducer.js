
export default (prevState, action) => {
	console.log(action)
	switch (action.type) {
		case 'RESTORE_TOKEN':
			console.log({
				...prevState,
				userToken: action.token,
				isLoading: false,
			})
			return {
				...prevState,
				userToken: action.token,
				isLoading: false,
			};
		case 'SIGN_IN':
			return {
				...prevState,
				isSignout: false,
				userToken: action.token,
			};
		case 'SIGN_OUT':
			return {
				...prevState,
				isSignout: true,
				userToken: null,
			};
		}
	}
