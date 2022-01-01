import { createContext } from "react";
import { useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_PAT = process.env.REACT_APP_GITHUB_PAT;

export const GithubProvider = ({ children }) => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const fetchUser = async () => {
		const response = await fetch(`${GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${GITHUB_PAT}`,
			},
		});
		const data = await response.json();

		// console.log(data);
		setUsers(data);
		setIsLoading(false);
	};

	return <GithubContext.Provider value={{ users, isLoading, fetchUser }}>{children}</GithubContext.Provider>;
};

export default GithubContext;
