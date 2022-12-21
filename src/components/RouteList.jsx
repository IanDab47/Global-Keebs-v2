// React
import { Routes, Route } from "react-router-dom"

// Pages
import Home from '../pages/home'
import Auth from '../pages/auth'
import User from '../pages/profile'
import List from '../pages/list'
import Listing from '../pages/display'

export default function RouteList() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/user/sign" element={ <Auth /> } />
        <Route path="/user/:userId" element={ <User /> } />
        <Route path="/listings" element={ <List /> } />
        <Route path="/listings/:pageId" element={ <Listing /> } />
      </Routes>
    </>
  )
}
