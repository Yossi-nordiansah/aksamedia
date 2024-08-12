import React from 'react';
import bg from '../assets/background.jpg';
import { useRef, useState } from 'react';
import showPasswordIcon from '../assets/showPassword.svg';
import hiddenPasswordIcon from '../assets/hiddenPassword.svg';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const inputRef = useRef(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const contohUsername = 'admin';
    const contohPassword = 'admin120824';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleOnClear = () => {
        inputRef.current.value = ''
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (username === contohUsername && password === contohPassword) {
            alert('Login successful!');
            navigate('/aksamedia/home/');
        } else if (username != contohUsername) {
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
                    <input title='masukkan username anda' type='text' id='username' ref={inputRef} className='border border-blue-500 outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-48 xs:w-72 xxs:w-52 sm:w-80' onChange={(e) => setUsername(e.target.value)} />
                    <br />
                    <label htmlFor="password" className='text-white block mt-3'>Password</label>
                    <div className='bg-transparent flex items-center rounded-md border border-blue-500'>
                        <input title='masukkan password anda' type={showPassword ? "text" : "password"} ref={inputRef} id='password' className='outline-none text-white py-1 px-2 rounded-md bg-transparent ring-0 w-5/6' onChange={(e) => setPassword(e.target.value)} />
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
                        <button title='bersihkan form' onClick={handleOnClear} className='bg-green-500 px-3 rounded-md py-1 text-white font-semibold'>Clear</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login