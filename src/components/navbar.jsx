import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo4.png';
import account_icon from '../assets/account-svgrepo-com.svg';
import setting_icon from '../assets/setting-icon.svg';
import logout_icon from '../assets/logout-icon.svg';
import { useState } from 'react';
import DarkMode from './DarkMode';

const Navbar = () => {
  const navigate = useNavigate();
  const [showFormNama, setShowFormNama] = useState(false);
  const [nama, setNama] = useState("");
  const [editNama, setEditNama] = useState("");
  const [toggleDropdownMenu, setToggleDropdownMenu] = useState(false);

  useEffect(() => {
    const storedNama = localStorage.getItem("Nama Lengkap");
    if (storedNama) {
      setNama(storedNama);
      setEditNama(storedNama);
    }
  }, []);

  const handleToggleDropdownMenu = () => {
    setToggleDropdownMenu(!toggleDropdownMenu);
  };

  const handleUbahNama = () => {
      setShowFormNama(!showFormNama);
  } 

  const handleLogout = () => {
    const userConfirmed = confirm("Apakah Anda yakin Keluar?");
    if (userConfirmed) {
      localStorage.removeItem('isAuthenticated');
      navigate('/aksamedia/');
    } else {
      setToggleDropdownMenu(!toggleDropdownMenu);
    }
  };

  const handleEditNama = (e) => {
    e.preventDefault(); 
    localStorage.setItem('Nama Lengkap', editNama);
    setNama(editNama);
    setShowFormNama(false); 
  };

  return (
    <div className='w-full h-14 bg-blue-700 dark:bg-blue-950 flex items-center justify-between px-2 sm:px-5'>
      <img src={logo} alt="" className='h-6 sm:h-12' />
      <DarkMode/>
      <div className='flex items-center cursor-pointer' onClick={handleToggleDropdownMenu}>
        <p className='text-white text-[10px] xs:text-base xs:mr-3'>{nama}</p>
        <img src={account_icon} alt="" className='hidden xs:block h-12' />
        {toggleDropdownMenu && (
          <div className="absolute right-0 mt-36 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
            <ul className="py-1">
              <li>
                <button onClick={handleUbahNama} className="flex gap-2 items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                  <img  src={setting_icon} alt="" className='w-5' />
                  Ubah Nama
                </button>
              </li>
              <li>
                <button onClick={handleLogout} className="flex gap-2 items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left">
                  <img src={logout_icon} alt="" className='w-5' />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {showFormNama && (
        <form className="absolute left-1/2 top-40 -translate-x-1/2 px-5 pb-4 rounded-xl bg-gray-200" onSubmit={handleEditNama}>
          <h1 className="text-center font-bold text-2xl py-2">Ubah Nama Lengkap</h1>
          <input type="text" id="editNama" value={editNama} onChange={(e) => setEditNama(e.target.value)} className="border border-gray-300 py-1 px-2 rounded w-48 xs:w-72 xxs:w-52 sm:w-80 mb-2" placeholder="Nama..."/>
          <div className="flex justify-center gap-6">
            <button type="submit" className="bg-yellow-300 text-white py-1 px-2 rounded mt-2 block font-semibold">
              Ubah
            </button>
            <button type="button" onClick={() => setShowFormNama(false)} className="bg-red-400 text-white py-1 px-2 rounded mt-2 block font-semibold">
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Navbar;
