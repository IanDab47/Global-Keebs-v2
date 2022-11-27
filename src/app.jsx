import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"
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
  const [count, setCount] = useState(0);
  const [apiInfo, setApiInfo] = useState(null);

  useEffect(() => {
    fetch("/api/v1")
      .then((data) => data.json())
      .then((data) => setApiInfo(data));
  }, []);

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
