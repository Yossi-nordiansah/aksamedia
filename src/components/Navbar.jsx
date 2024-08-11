import React from 'react';
import logo from '../assets/logo4.png';
import account_icon from '../assets/account-svgrepo-com.svg'

const Navbar = () => {
  return (
    <div className='w-full h-10 bg-blue-950 flex justify-between px-5'>
        <img src={logo} alt="" />
        <img src={account_icon} alt="" />
    </div>
  )
}

export default Navbar