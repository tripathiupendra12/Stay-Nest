import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="w-full bg-gray-100 border-t border-gray-300 px-6 md:px-12 py-10">
            <div className="max-w-7xl mx-auto">

                {/* Social Icons */}
                <div className="flex justify-center gap-6 mb-6">
                    <span className="p-3 rounded-full bg-white shadow-sm cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white">
                        <InstagramIcon size={20} />
                    </span>

                    <span className="p-3 rounded-full bg-white shadow-sm cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white">
                        <LinkedinIcon size={20} />
                    </span>

                    <span className="p-3 rounded-full bg-white shadow-sm cursor-pointer transition-all duration-300 hover:bg-blue-700 hover:text-white">
                        <FacebookIcon size={20} />
                    </span>
                </div>

                {/* Company Name */}
                <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Stay Next Private Limited
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                        Making stays simpler and smarter.
                    </p>
                </div>

                {/* Footer Links */}
                <div className="flex justify-center items-center gap-6 text-sm text-gray-700 mb-6">
                    <Link
                        to="/privacy-policy"
                        className="hover:text-blue-700 transition-colors duration-300"
                    >
                        Privacy Policy
                    </Link>

                    <span className="text-gray-400">|</span>

                    <Link
                        to="/terms-and-conditions"
                        className="hover:text-blue-700 transition-colors duration-300"
                    >
                        <p>Terms & Conditions</p>
                    </Link>
                </div>

                {/* Copyright */}
                <div className="border-t border-gray-300 pt-4 text-center">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Stay Next Private Limited.
                        All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;