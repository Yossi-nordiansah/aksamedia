// import React from 'react';
// import bg from '../assets/background.jpg';
// import { useRef, useState } from 'react';
// import showPasswordIcon from '../assets/showPassword.svg';
// import hiddenPasswordIcon from '../assets/hiddenPassword.svg';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {

//     const [showPassword, setShowPassword] = useState(false)
//     const usernameRef = useRef(null);
//     const passwordRef = useRef(null);
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const contohUsername = 'admin'
//     const contohPassword = '123456'

//     const handleClear = () => {
//         usernameRef.current.value = '';
//         passwordRef.current.value = '';
//       };

//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };

//     const handleOnSubmit = (e) => {
//         e.preventDefault();
//         if (username === contohUsername && password === contohPassword) {
//             alert('Login successful!');
//             localStorage.setItem('isAuthenticated', 'true');
//             navigate('/aksamedia/home/', { state: { username: contohUsername } });
//         } else if (username != contohUsername) {
//             alert('Username Salah');
//         } else {
//             alert('Password Salah');
//         }
//     };

//     return (
//         <div className='flex justify-center items-center w-full h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
//             <div className='border-2 pt-2 pb-6 px-4 backdrop-blur-sm bg-blue-950/50 border-blue-400 rounded-lg'>
//                 <h1 className='text-white text-center text-3xl font-bold'>Login</h1>
//                 <form className='mt-4' onSubmit={handleOnSubmit}>
//                     <label htmlFor="username" className='text-white block'>Username</label>
//                     <input required title='masukkan username anda' onInput={(F) => F.target.setCustomValidity("")} onInvalid={(F) => F.target.setCustomValidity("Username wajib di isi")} type='text' id='username' ref={usernameRef} className='border border-blue-500 outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-48 xs:w-72 xxs:w-52 sm:w-80' onChange={(e) => setUsername(e.target.value)} />
//                     <br />
//                     <label htmlFor="password" className='text-white block mt-3'>Password</label>
//                     <div className='bg-transparent flex items-center rounded-md border border-blue-500'>
//                         <input required onInvalid={(F) => F.target.setCustomValidity("Password wajib di isi")} onInput={(F) => F.target.setCustomValidity("")} title='masukkan password anda' type={showPassword ? "text" : "password"} ref={passwordRef} id='password' className='outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-5/6' onChange={(e) => setPassword(e.target.value)} />
//                         <button
//                             type="button"
//                             onClick={togglePasswordVisibility}
//                             className="absolute right-2 flex items-center px-4 text-white">
//                             {showPassword ? (
//                                 <img title='sembunyikan password' src={hiddenPasswordIcon} alt="" />
//                             ) : (
//                                 <img title='tampilkan password' src={showPasswordIcon} alt="" />
//                             )}
//                         </button>
//                     </div>
//                     <div className='flex justify-center gap-7 mt-5'>
//                         <button title='login ke akun anda' type='submit' className='bg-blue-500 px-3 rounded-md py-1 text-white font-semibold'>Login</button>
//                         <button onClick={handleClear} title='bersihkan form' className='bg-green-500 px-3 rounded-md py-1 text-white font-semibold' type='button'>Clear</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }

// export default Login

import React, { useRef, useState, useEffect } from 'react';
import bg from '../assets/background.jpg';
import showPasswordIcon from '../assets/showPassword.svg';
import hiddenPasswordIcon from '../assets/hiddenPassword.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Storing static username and password in localStorage
    useEffect(() => {
        localStorage.setItem('username', 'admin');
        localStorage.setItem('password', '123456');
        localStorage.setItem('Nama Lengkap', 'Yossi Nordiansah');
    }, []);

    const handleClear = () => {
        usernameRef.current.value = '';
        passwordRef.current.value = '';
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        const namaLengkap = localStorage.getItem("Nama Lengkap");

        if (username === storedUsername && password === storedPassword) {
            alert('Login successful!');
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/aksamedia/home/', { state: { nama_lengkap: namaLengkap } });
        } else if (username !== storedUsername) {
            alert('Username Salah');
        } else {
            alert('Password Salah');
        }
    };

    return (
        <div className='flex justify-center items-center w-full h-screen bg-cover' style={{ backgroundImage: `url(${bg})` }}>
            <div className='border-2 pt-2 pb-6 px-4 backdrop-blur-sm bg-blue-950/50 border-blue-400 rounded-lg'>
                <h1 className='text-white text-center text-3xl font-bold'>Login</h1>
                <form className='mt-4' onSubmit={handleOnSubmit}>
                    <label htmlFor="username" className='text-white block'>Username</label>
                    <input required title='masukkan username anda' onInput={(e) => e.target.setCustomValidity("")} onInvalid={(e) => e.target.setCustomValidity("Username wajib di isi")} type='text' id='username' ref={usernameRef} className='border border-blue-500 outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-48 xs:w-72 xxs:w-52 sm:w-80' onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="password" className='text-white block mt-3'>Password</label>
                    <div className='bg-transparent flex items-center rounded-md border border-blue-500'>
                        <input required onInvalid={(e) => e.target.setCustomValidity("Password wajib di isi")} onInput={(e) => e.target.setCustomValidity("")} title='masukkan password anda' type={showPassword ? "text" : "password"} ref={passwordRef} id='password' className='outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-5/6' onChange={(e) => setPassword(e.target.value)} 
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-2 flex items-center px-4 text-white">
                            {showPassword ? (
                                <img title='sembunyikan password' src={hiddenPasswordIcon} alt="" />
                            ) : (
                                <img title='tampilkan password' src={showPasswordIcon} alt="" />
                            )}
                        </button>
                    </div>
                    <div className='flex justify-center gap-7 mt-5'>
                        <button title='login ke akun anda' type='submit' className='bg-blue-500 px-3 rounded-md py-1 text-white font-semibold'>Login</button>
                        <button onClick={handleClear} title='bersihkan form' className='bg-green-500 px-3 rounded-md py-1 text-white font-semibold' type='button'>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;


