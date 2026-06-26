import {Link} from "react-router-dom";

const ErrorPage = ({message}) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mt-4">{message}</h2>
                <Link to="/" className="inline-block mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default ErrorPage;