import {Link} from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-8xl font-bold text-red-500">404</h1>
                <h2 className="text-xl font-semibold mt-4">Page Not Found</h2>
                <p className="text-gray-600 mt-2">Sorry, the page you are looking for does not exist.</p>
                <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default NotFound;