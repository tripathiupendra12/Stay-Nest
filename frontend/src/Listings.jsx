import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { toast } from "react-toastify";

const Listings = ({ selectedCategory }) => {
    const [listings, setListings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = "https://stay-nest-ph9a.onrender.com/listings/listings";

        if(selectedCategory !== "All") {
            url = `https://stay-nest-ph9a.onrender.com/listings/listings/category/${selectedCategory}`;
        }
            const res = axios.get(url)
                .then((res) => {
                    setListings(res.data);
                })
                .catch((error) => {
                    const msg = error.response?.data?.message;
                    toast.error(msg);
                    setError(msg);
                });
    }, [selectedCategory]);

    return (

     <div className="max-w-7xl mx-auto px-4 py-2">
            <h3 className="text-2xl font-medium text-gray-700 p-2">All Listings</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {listings.map((item) => (
                            <div class="max-w-sm rounded overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                                <Link key={item._id} to={`/listings/${item._id}`}>
                                    <img class="w-full" src={item.image.url} alt="listing-image" className="h-58 w-full"/>
                                    <div class="px-6 py-4 text-md font-medium text-gray-700">
                                        <p key={item._id}>{item.title}</p>
                                        <p>&#8377; {item?.price?.toLocaleString("en-IN")} / night</p>
                                    </div>
                                </Link>
                            </div>
                    ))}
                </div>
            </div>
    )
}

export default Listings;