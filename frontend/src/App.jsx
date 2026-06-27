import Listings from "./Listings";
import Show from "./Show";
import NewListing from "./NewListing";
import Edit from "./Edit";
import Navbar from "./Navbar";
import Footer from "./Footer";
import NotFound from "./NotFound";
import Signup from "./Signup";
import Signin from "./Signin";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsAndConditions from "./TermsAndConditions";
import ChatBotButton from "./ChatBotButton";
import ChatBot from "./ChatBot";

import axios from "axios";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

//Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryNav from "./CategoryNav";
import { useState } from "react";

function App() {

  const token = localStorage.getItem("token");

  if(token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  }

  const[selectedCategory, setSelectedCategory] = useState("All");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter>
    <>
      {/* Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Categories */}
      <div className="sticky top-28 z-40">
        <CategoryNav selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
      </div>
      </>

      <>
      <ChatBotButton setIsOpen={setIsOpen} />

      {isOpen && (
        <ChatBot setIsOpen={setIsOpen} />
      )}
    </>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/listings/listings/category/:category" element={<Listings selectedCategory={selectedCategory}/>}/>
        <Route path="/listings/:id" element={<Show />}/>
        <Route path="/listings/new" element={<NewListing />}/>
        <Route path="/listings/:id/edit" element={<Edit />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <ToastContainer position="top-center" autoClose={3000} />
    <Footer />
    </BrowserRouter>
    
  )
}

export default App
