import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom"

// Pages
import Home from './pages/home'
import Auth from './pages/auth'
import User from './pages/profile'
import List from './pages/list'
import Listing from './pages/display'

// styles
import "./app.css";
import logo from "./logo.svg";

export default function App() {
  const [count, setCount] = useState(0);
  const [apiInfo, setApiInfo] = useState(null);

  useEffect(() => {
    fetch("/api/v1")
      .then((data) => data.json())
      .then((data) => setApiInfo(data));
  }, []);

  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/user/sign" element={ <Auth /> } />
      <Route path="/user/:userId" element={ <User /> } />
      <Route path="/listings" element={ <List /> } />
      <Route path="/listings/:listingId" element={ <Listing /> } />
    </Routes>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>Hello Vite + React!</p>
    //     <p>
    //       <button type="button" onClick={() => setCount((count) => count + 1)}>
    //         count is: {count}
    //       </button>
    //     </p>
    //     <p>
    //       Edit <code>app.jsx</code> and save to test HMR updates.
    //     </p>
    //     {apiInfo && (
    //       <ul>
    //         {Object.keys(apiInfo).map((key) => (
    //           <li key={key}>
    //             {key.toUpperCase()}: {apiInfo[key]}
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //     <p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //       {" | "}
    //       <a
    //         className="App-link"
    //         href="https://vitejs.dev/guide/features.html"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Vite Docs
    //       </a>
    //     </p>
    //   </header>
    // </div>
  );
}
