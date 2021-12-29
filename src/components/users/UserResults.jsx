import { useEffect, useState } from "react";

import Spinner from "../layout/Spinner";

const UserResults = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchUser();
	}, []);

	const fetchUser = async () => {
		const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
			headers: {
				Authorization: `token ${process.env.REACT_APP_GITHUB_PAT}`,
			},
		});
		const data = await response.json();

		console.log(data);
		setUsers(data);
		setIsLoading(false);
	};

	if (!isLoading) {
		return (
			<div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
				{users.map((user) => {
					return <h3>{user.login}</h3>;
				})}
			</div>
		);
	} else {
		return <Spinner />;
	}
};

export default UserResults;