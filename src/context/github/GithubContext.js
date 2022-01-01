import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_PAT = process.env.REACT_APP_GITHUB_PAT;

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

	// to fetch initial users (testing purpose only)
	// const fetchUser = async () => {
	// 	setLoading();
	// 	const response = await fetch(`${GITHUB_URL}/users`, {
	// 		headers: {
	// 			Authorization: `token ${GITHUB_PAT}`,
	// 		},
	// 	});
	// 	const data = await response.json();

	// 	// sending action to reducer
	// 	dispatch({
	// 		type: "GET_USERS",
	// 		payload: data,
	// 	});
	// };

	// Get search results
	const searchUsers = async (text) => {
		setLoading();
		const response = await fetch(`${GITHUB_URL}/search/users?q=${text}`, {
			headers: {
				Authorization: `token ${GITHUB_PAT}`,
			},
		});
		const { items } = await response.json();

		// sending action to reducer
		dispatch({
			type: "GET_USERS",
			payload: items,
		});
	};

	// Get single user
	const getSingleUser = async (login) => {
		setLoading();

		const response = await fetch(`${GITHUB_URL}/users/${login}`, {
			headers: {
				Authorization: `token ${GITHUB_PAT}`,
			},
		});

		if (response.status === 404) {
			window.location = "/404";
		} else {
			const data = await response.json();

			// sending action to reducer
			dispatch({
				type: "GET_SINGLE_USER",
				payload: data,
			});
		}
	};

	// Get single user repositories
	const getUserRepos = async (login) => {
		setLoading();
		const response = await fetch(`${GITHUB_URL}/users/${login}/repos?sort=created&per_page=15`, {
			headers: {
				Authorization: `token ${GITHUB_PAT}`,
			},
		});
		const data = await response.json();

		// sending action to reducer
		dispatch({
			type: "GET_REPOS",
			payload: data,
		});
	};

	const clearUsers = () => {
		dispatch({
			type: "CLEAR_USERS",
		});
	};

	const setLoading = () => {
		dispatch({
			type: "SET_LOADING",
		});
	};

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				singleUser: state.singleUser,
				repos: state.repos,
				isLoading: state.isLoading,
				searchUsers,
				clearUsers,
				getSingleUser,
				getUserRepos,
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;
