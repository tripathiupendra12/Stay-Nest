import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    axios
      .get(`https://stay-nest-ph9a.onrender.com/listings/${id}/edit`)
      .then((res) => {
        setFormData(res.data);
      })
      .catch((err) => {
        setErr(err.message);
      });
  }, [id]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    if(e.target.name === "image") {
            setNewImage(e.target.files[0]);
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title?.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description?.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = "Price must be a valid number";
    }
    
    if (!formData.country?.trim()) {
      newErrors.country = "Country name is required";
    }
    if (!formData.location?.trim()) {
      newErrors.location = "Location is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (token) {
      const validationErrors = validate();

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      try {
        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("price", formData.price);
        data.append("country", formData.country);
        data.append("location", formData.location);
        if(newImage) {
          data.append("image", newImage);
        }

        const res = await axios.put(
          `https://stay-nest-ph9a.onrender.com/listings/${id}`,
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        toast.success(res.data.message);
        navigate(`/listings/${id}`);
      } catch (err) {
        setErr(err.data.message);
      }
    } else {
      navigate("/signin");
    }
  };

  if (err) {
    return <ErrorPage message={err.data.message} />;
  }

  return (
    <div className="min-h-screen flex justify-center mb-16 px-8 py-6 ">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-4xl">
        <h3 className="text-3xl font-medium text-gray-700 py-4">
          Create a New Listing :
        </h3>
        <div>
          <form
            onSubmit={handleSubmit}
            noValidate
            encType="multipart/form-data"
          >
            <div className="mb-6">
              <label
                htmlFor="title"
                className="block text-lg font-semibold mb-2"
              >
                Title
              </label>
              <input
                name="title"
                value={formData.title}
                type="text"
                className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="description"
                className="block text-lg font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                type="text"
                className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="mb-6">
              <h3 className="block text-lg font-semibold mb-2">Original Image</h3>
              <img src={formData?.image?.url?.replace("/upload", "/upload/w_250,c_fill/")} width={200}/>
            </div>
            <div className="mb-6">
              <label
                htmlFor="image"
                className="block text-lg font-semibold mb-2"
              >
                Upload New Image
              </label>
              <input
                type="file"
                name="image"
                className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
              />
              {errors.image && (<p className="text-red-500 text-sm">{errors.image}</p>)}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-6">
                <label
                  htmlFor="price"
                  className="block text-lg font-semibold mb-2"
                >
                  Price
                </label>
                <input
                  name="price"
                  value={formData.price}
                  type="number"
                  className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
                {errors.price && (
                  <p className="text-red-500 text-sm">{errors.price}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="country"
                  className="block text-lg font-semibold mb-2"
                >
                  Country
                </label>
                <input
                  name="country"
                  value={formData.country}
                  type="text"
                  className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
                {errors.country && (
                  <p className="text-red-500 text-sm">{errors.country}</p>
                )}
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="location"
                className="block text-lg font-semibold mb-2"
              >
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                type="text"
                className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleChange}
                required
              />
              {errors.location && (
                <p className="text-red-500 text-sm">{errors.location}</p>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
            >
              Edit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Edit;
