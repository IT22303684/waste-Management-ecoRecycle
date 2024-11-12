import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../assets/logo/ecoRecycle.svg";

const NavBar = () => {
  return (
    
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <Link class="navbar-brand" to="/">Waste Management System</Link>
            <img src={logo} alt="logo" className="w-40 h-40 object-center" />
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                <Link class="nav-link" to="/">Features</Link>
                <Link class="nav-link" to="/insert">Add Company</Link>
                <Link class="nav-link" to="/itemlist">Item</Link>
            </div>
            </div>
        </div>
    </nav>
  )
}

export default NavBar
