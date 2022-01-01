import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		singleUser: {},
		repos: [],
		isLoading: false,
	};

	// userReducer will take two argumnets, the reducer which we want to use and the initial state
	// array destructuring works like in useState hook
	// dispatch is used to send an action to the reducer
	const [state, dispatch] = useReducer(githubReducer, initialState);

	return (
		<GithubContext.Provider
			value={{
				...state,
				dispatch,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
