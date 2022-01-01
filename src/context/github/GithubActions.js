import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_PAT = process.env.REACT_APP_GITHUB_PAT;

const github = axios.create({
	baseURL: GITHUB_URL,
	headers: {
		Authorization: `token ${GITHUB_PAT}`,
	},
});

// Get search results
export const searchUsers = async (text) => {
	const response = await github.get(`${GITHUB_URL}/search/users?q=${text}`);
	return response.data.items;
};

// Get single user and repos
export const getUserAndRepos = async (login) => {
	const [singleUser, repos] = await Promise.all([github.get(`/users/${login}`), github.get(`/users/${login}/repos`)]);

	return {
		singleUser: singleUser.data,
		repos: repos.data,
	};
};

// to fetch initial users (testing purpose only)
// export const fetchUser = async () => {
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
