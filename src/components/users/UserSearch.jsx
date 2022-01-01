import { useState, useContext } from "react";
import GithubContext from "../../context/github/GithubContext";
import { searchUsers } from "../../context/github/GithubActions";
import AlertContext from "../../context/alert/AlertContext";

const UserSearch = () => {
	const [text, setText] = useState("");

	const { users, dispatch } = useContext(GithubContext);
	const { setAlert } = useContext(AlertContext);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (text.trim() === "") {
			setAlert("Please enter something!", "error");
		} else {
			dispatch({ type: "SET_LOADING" });
			const users = await searchUsers(text.trim());
			dispatch({ type: "GET_USERS", payload: users });
			setText("");
		}
	};

	return (
		<div className="grid grid-cols-1 xl:grid-cols-1 lg:grid-cols-1 md:grid-cols-1 mb-2">
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					<div className="relative">
						<input type="text" className="w-full pr-40 bg-gray-200 input input-lg text-black" placeholder="Type here..." value={text} onChange={handleChange} />
						<button type="submit" className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg ">
							SEARCH
						</button>
					</div>
				</div>
			</form>

			{users.length > 0 && (
				<div>
					<button className="btn btn-ghost btn-sm mt-4" onClick={() => dispatch({ type: "CLEAR_USERS" })}>
						Clear
					</button>
				</div>
			)}
		</div>
	);
};

export default UserSearch;
