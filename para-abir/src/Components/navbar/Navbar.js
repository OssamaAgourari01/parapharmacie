import React from 'react'
import { MdLocalShipping } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiLogIn } from 'react-icons/fi';
import { CiLogout, CiUser } from 'react-icons/ci';
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from 'react-router-dom';
import { FaCartShopping } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

import './nav.css'
const Navbar = (props) => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
  const uniqueTypes = [...new Set(props.produits.map(ele => ele.type))];
  return (
    <>
      <div className='header'>
        <div className='mid_header'>
          <div className='logo'>
            <Link to='/'><img src='abirlogo/logolong.png' alt='logo' /></Link>
          </div>
          <div className='search_box'>
            <input type='text' placeholder='Chercher produit'></input>
            <button><AiOutlineSearch /></button>
          </div>
          <div className='users'>
            <Link to='/cart' className='btn text-success'><FaCartShopping className='lin'/><span className='numberCart'>{props.cart.length}</span></Link>
            <Link to='/favorites' className='btn text-success mx-2'><FaHeart className='lin' /></Link>
          </div>
          {
            isAuthenticated ?
              <div className='user usee'>
                <div className='btn'>
                  <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}><CiLogout /> Logout</button>
                </div>
              </div>
              :
              <div className='user'>
                <div className='btn'>
                  <button onClick={() => loginWithRedirect()}><FiLogIn /> Login</button>
                </div>
              </div>
          }
        </div>
        <div className='last_header'>
          <div className='user_profile'>
            {
              isAuthenticated ?
                <>
                  <div className='icon'>
                    <CiUser />
                  </div>
                  <div className='info'>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                  </div>
                </>
                :
                <>
                  <div className='icon'>
                    <CiUser />
                  </div>
                  <div className='info'>
                    <p>Please Login</p>
                  </div>
                </>
            }
          </div>
          <div className='nav'>
            <ul>
              {uniqueTypes.map(type => (
                <li className='mx-1 row' key={type}>
                  <Link to={`/produit/${type}`} className='link col'><b>{type.toLocaleUpperCase()}</b></Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navbar