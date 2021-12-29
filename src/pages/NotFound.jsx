import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="hero">
			<div className="text-center hero-content">
				<div className="max-w-lg">
					<h1 className="text-8xl font-bold mb-10">Oops!</h1>
					<p className="text-3xl mb-10">Error 404 - Page not found!</p>
					<Link to="/" className="btn btn-primary btn-lg">
						<FaHome className="mr-2" />
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
