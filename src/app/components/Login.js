'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setUserFromLocalStorage } from '@/feature/User/UserSlice';
import { useEffect } from 'react';

export default function LoginComponent() {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch();

  const {email, password} = loginInfo


  const handleChange = (e) =>{
    setLoginInfo({...loginInfo, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform login logic here
    // Replace this with your actual login code
    try {
      const response = await fetch('https://nextjs13-ecommerce.onrender.com/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.ok) {
        const data = await response.json();
        if(data.isAdmin){
          // Save user data in localStorage
          if (typeof window !== "undefined") {
            localStorage.setItem('userData', JSON.stringify(data));
          } else {
            // If neither localStorage nor sessionStorage is supported
            console.log('Web Storage is not supported in this environment.');
          }
          dispatch(setUserFromLocalStorage(data));
          // Clear input fields
          setLoginInfo({email: '', password: ''});
          setIsError(false)
          setMessage('')
          router.push('/');
          
        }else{
          setLoginInfo({email: '', password: ''});
          setIsError(false)
          setMessage('Bạn không có quền truy cập! Hãy liên hệ quản trị viên')
        }
      } else {
        setIsError(true)
      }
  
    } catch (error) {
      console.error('lỗi api: ', error)
    }
  };

  useEffect(() =>{
    if(isError){
      setMessage('Tài khoản hoặc mật khẩu sai')
    }
  }, [isError])
  return (
    <form onSubmit={handleSubmit} className="max-w-[400px] w-full mx-auto">
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 font-medium text-gray-700">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2 font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <span>{message ? message : ''}</span>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-500 rounded-md hover:bg-indigo-600"
      >
        Login
      </button>
    </form>
  )
}
