// Dependencies
import axios from "axios";

// React
import { useState, useEffect } from "react";
import { ClickProvider, useClickUpdate } from "./context/ClickContext";
import logo from "/logo.svg";

// Components
import Navbar from "./components/Navbar";
import RouteList from "./components/RouteList.jsx"

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
    <ClickProvider>
        <Navbar />
        <RouteList />
    </ClickProvider>
  );
}
