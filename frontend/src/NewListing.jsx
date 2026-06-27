import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";

const NewListing = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: {
            url: "",
            filename: "",
        },
        price: "",
        location: "",
        country: "",
    });

    const [err, setErr] = useState(null);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {

        if(e.target.name === "image") {
            setFormData({
                ...formData,
                image: e.target.files[0]
                // image: {...formData.image, url: e.target.value}
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
    };

    const validate = () => {
        let newErrors = {};
        if(!formData.title?.trim()) { newErrors.title = "Title is required"; }
        if(!formData.description?.trim()) { newErrors.description = "Description is required"; }
        if(!formData.category?.trim()) { newErrors.category = "Category is required"; }
        if(!formData.image) {
            newErrors.image = "Image is required";
        } else if (formData.image.size > 20 * 1024) {
            newErrors.image = "Image size must be less than 20 KB";
        }
        if(!formData.price) {
            newErrors.price = "Price is required"; 
        } 
        else if(isNaN(formData.price) || formData.price <= 0) {
            newErrors.price = "Price must be a valid number";
        }
        if(!formData.country?.trim()) { newErrors.country = "Country name is required"; }
        if(!formData.location?.trim()) { newErrors.location = "Location is required"; }

        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }


        const token = localStorage.getItem("token");

        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("country", formData.country);
        data.append("location", formData.location);
        data.append("category", formData.category);
        data.append("image", formData.image);

        await axios.post("https://stay-nest-ph9a.onrender.com/listings",
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            }
            ).then((res) => {
                toast.success(res.data.message);
                navigate("/listings");
            }).catch((err) => {
                setErr(err.data.message);
            })
    }

    if(err) {
        return <ErrorPage message={err} />
    }
    return (
        <div className="min-h-screen flex justify-center mb-16 px-8 py-6 ">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
                <h3 className="text-3xl font-medium text-gray-700 py-4">Create a New Listing :</h3>
                    <div className="">
                        <form onSubmit={handleSubmit} noValidate encType="multipart/form-data">
                            <div className="mb-6">
                                <label htmlFor="title" className="block text-lg font-semibold mb-2">Title</label>
                                <input name="title" placeholder="Enter title" type="text" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                {errors.title && (<p className="text-red-500 text-sm">{errors.title}</p>)}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="description" className="block text-lg font-semibold mb-2">Description</label>
                                <textarea name="description" placeholder="Enter descrition" type="text" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                {errors.description && (<p className="text-red-500 text-sm">{errors.description}</p>)}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="category" className="block text-lg font-semibold mb-2">Category</label>
                                <select
                                    size={1}
                                    name="category"
                                    value={formData.category}
                                    className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" selected>Select Category</option>
                                    <option value="Beach">Beach</option>
                                    <option value="Mountain">Mountain</option>
                                    <option value="Camping">Camping</option>
                                    <option value="Hotel">Hotel</option>
                                    <option value="Villas">Villas</option>
                                    <option value="Farmhouse">Farmhouse</option>
                                    <option value="Amazing Pools">Amazing Pools</option>
                                    <option value="Iconic Cities">Iconic Cities</option>
                                    <option value="Castles">Castles</option>
                                    <option value="Farmhouse">Farmhouse</option>
                                    <option value="Boats">Boats</option>
                                    <option value="Arctic">Arctic</option>
                                </select>
                                {errors.category && (<p className="text-red-500 text-sm">{errors.category}</p>)}
                            </div>
                            <div className="mb-6">
                                <label htmlFor="image" className="block text-lg font-semibold mb-2">Upload Listing Image</label>
                                <input name="image" type="file" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                {errors.image && (<p className="text-red-500 text-sm">{errors.image}</p>)}
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="mb-6">
                                    <label htmlFor="price" className="block text-lg font-semibold mb-2">Price</label>
                                    <input name="price" placeholder="Enter price" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                    {errors.price && (<p className="text-red-500 text-sm">{errors.price}</p>)}
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="country" className="block text-lg font-semibold mb-2">Country</label>
                                    <input name="country" placeholder="Enter country" type="text" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                    {errors.country && (<p className="text-red-500 text-sm">{errors.country}</p>)}
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="location" className="block text-lg font-semibold mb-2">Location</label>
                                <input name="location" placeholder="Enter location" type="text" className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500" onChange={handleChange} required/>
                                {errors.location && (<p className="text-red-500 text-sm">{errors.location}</p>)}
                            </div>
                            <button type="submit" className="px-4 py-2 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105">Add</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default NewListing;