/// https://www.robinwieruch.de/javascript-reducer/

// Reducer is a pure function which takes two argumnets (state and action) and returns a new state
// Action is an object with a type which tells what action needs to be performed on the state
// Action may also contain a payload which contains data to with which state needs to be manipulated

const githubReducer = (state, action) => {
	switch (action.type) {
		case "GET_USERS":
			return {
				...state,
				users: action.payload,
				isLoading: false,
			};

		case "SET_LOADING":
			return {
				...state,
				isLoading: true,
			};

		default:
			return state;
	}
};

export default githubReducer;
