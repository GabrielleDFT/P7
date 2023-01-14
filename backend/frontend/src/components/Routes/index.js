//----------------------------------------GESTION DES ROUTES DU SITE--------------------------------------------------

//---Imports Frameworks---
import React from 'react'
import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom'
import Home from '../../pages/Home'
import Profil from '../../pages/Profil'
import Trending from '../../pages/Trending'
import Navbar from '../Navbar'
import PageError from "../Routes/PageError";

//---Gestion Routes---
const index = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/404" element={<PageError />} />
      </Routes>
    </Router>
  )
}

export default index
