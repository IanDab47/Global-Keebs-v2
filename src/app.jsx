import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
import axios from "axios";
import logo from "/logo.svg";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from './pages/home'
import Auth from './pages/auth'
import User from './pages/profile'
import List from './pages/list'
import Listing from './pages/display'

export default function App() {
  // State
  const [apiInfo, setApiInfo] = useState([]);

  // Hooks
  useEffect(() => {
    axios.get("/api/v1/")
      .then(response => {
        setApiInfo([...response.data])
      }) 
      .catch(console.warn)
  }, []);

  // Output
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/user/sign" element={ <Auth /> } />
        <Route path="/user/:userId" element={ <User /> } />
        <Route path="/listings" element={ <List /> } />
        <Route path="/listings/:listingId" element={ <Listing /> } />
      </Routes>
    </>
  );
}
