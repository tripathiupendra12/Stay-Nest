import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import ListingMap from "./ListingMap";

const Show = () => {
  const [listing, setListing] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [errors, setErrors] = useState({});
  const [err, setErr] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 0,
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/listings/${id}`)
      .then((res) => {
        setListing(res.data);
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        setCurrUser(decoded);
      })
      .catch((err) => setErrors(err.message));
  }, [id]);

  const deleteListing = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await axios.delete(`http://localhost:8080/listings/${id}`);
        toast.success(res.data.message);
        navigate("/listings");
      } catch (err) {
        setErrors(err.message);
      }
    } else {
      navigate("/signin");
    }
  };

  const handleChange = (e) => {
    setReviewData({
      ...reviewData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!reviewData.rating) {
      newErrors.rating = "Rating is required";
    }
    if (!reviewData.comment?.trim()) {
      newErrors.comment = "Comment is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/listings/${id}/reviews`,
        reviewData,
      );
      toast.success(res.data.message);
      navigate(0);
    } catch (err) {
      setErr(err.message);
    }
  };

  const deleteReview = async (reviewId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/listings/${id}/reviews/${reviewId}`,
      );
      toast.success(res.data.message);
      navigate(0);
    } catch (err) {
      setErrors(err.message);
    }
  };

  if (err) {
    return <ErrorPage message={err} />;
  }

  return (
    <div>
      <div className="min-h-96 mb-12 px-8 py-6 flex justify-center">
        <div className="lg:min-w-4xl md:min-w-2xl sm:min-w-xl p-4 bg-white border border-gray-200 hover:-translate-y-1 transition duration-300 rounded-lg shadow shadow-black/10 max-w-80">
          <img
            className="rounded-md max-h-72 w-full object-cover"
            src={listing.image?.url}
            alt="officeImage"
          />
          <div>
            <i className="text-gray-900 text-xl font-semibold p-3">
              Owned by {listing.owner?.username}
            </i>
            <h3 className="text-gray-900 text-xl font-semibold ml-2 mt-2">
              {listing.title} 
              <span> ({listing.category})</span>
            </h3>
            <p className="text-zinc-600 text-md mt-2 ml-2 mb-2">
              {listing.description}
            </p>
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-3">
              &#8377; {listing?.price?.toLocaleString("en-IN")}
            </p>
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-3">
              {listing.location}
            </p>
            <p className="text-gray-900 text-xl font-semibold ml-2 mt-3">
              {listing.country}
            </p>
          </div>

          {currUser?.id === listing.owner?._id && (
            <div className="mt-16 flex gap-6">
              <button className="px-4 py-2 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105">
                <Link to={`/listings/${listing._id}/edit`}>
                  Edit this Listing
                </Link>
              </button>
              <button
                className="px-4 py-2 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
                onClick={deleteListing}
              >
                Delete this listing
              </button>
            </div>
          )}
        </div>
      </div>
      {currUser && (
        <div className="min-h-60 flex justify-center mb-2 px-8 py-6">
          <div className="lg:min-w-4xl md:min-w-2xl sm:min-w-xl bg-white border border-gray-200 p-4 rounded-2xl shadow-lg ">
            <h3 className="text-3xl font-medium text-gray-700 py-4">
              Leave a Review :
            </h3>
            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-6">
                <label
                  htmlFor="rating"
                  className="block text-lg font-semibold mb-2"
                >
                  Rating
                </label>
                <div className="flex gap-1 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => {
                    return (
                      <span
                        key={star}
                        className={`cursor-pointer text-4xl text-gray-900 ${
                          star <= rating ? "text-yellow-500" : "text-gray-300"
                        }`}
                        onClick={() => {
                          setRating(star);
                          setReviewData({
                            ...reviewData,
                            rating: star,
                          });
                        }}
                      >
                        ✰
                      </span>
                    );
                  })}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm">{errors.rating}</p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-lg font-semibold mb-2"
                >
                  Comments
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  type="text"
                  className="w-full px-4 py-3 text-lg border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={handleChange}
                  required
                />
                {errors.comment && (
                  <p className="text-red-500 text-sm">{errors.comment}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
      ;
      <div className="mb-12 px-8 py-6 flex justify-center">
        <div className="lg:min-w-4xl md:min-w-2xl sm:min-w-xl bg-white border border-gray-200 p-4 rounded-2xl shadow-lg ">
          <h3 className="text-3xl font-medium text-gray-700 py-4">
            All Review :
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {listing?.reviews?.length > 0 ? (
              listing.reviews.map((review) => {
                return (
                  <div
                    key={review._id}
                    className="bg-white border border-gray-200 p-4 rounded-2xl shadow-md"
                  >
                    <h3 className="text-xl font-medium text-gray-900">
                      {review?.author?.username}
                    </h3>
                    <p className="text-gray-700 text-md font-semibold">
                      {review.comment}
                    </p>
                    <p className="text-yellow-400 text-3xl">
                      {"⭐".repeat(review.rating)}
                      <span className="text-4xl">
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </p>
                    <button
                      className="px-2 py-2 mt-3 rounded-2xl text-gray-200 bg-blue-700 hover:bg-gray-800 cursor-pointer transition-transform duration-300 hover:scale-105"
                      onClick={() => deleteReview(review._id)}
                    >
                      Delete
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-lg font-medium text-gray-800">No review yet</p>
            )}
          </div>
        </div>
      </div>
      <div className="lg:mx-40 md:mx-10 mx-4  bg-white border border-gray-200 p-4 rounded-2xl shadow-lg mb-20 relative z-0">
        <h1 className="text-3xl font-medium text-gray-700 py-4">Where you'll be</h1>
        {listing?.geometry?.coordinates && (
            <ListingMap coordinates={listing.geometry.coordinates} location={listing.location}
            />
        )}
      </div>
    </div>
  );

};

export default Show;
