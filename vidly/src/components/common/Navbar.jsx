import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <div className='container-fluid'>
          <NavLink className='navbar-brand' to='/'>
            Vidly
          </NavLink>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              <li className='nav-item'>
                <NavLink
                  className='nav-link active'
                  aria-current='page'
                  to='/movies'
                >
                  Movies
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/customers'>
                  Customers
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/rentals'>
                  Rentals
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>
                  Login
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>
                  Register
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
