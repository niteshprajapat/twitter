import React, { useState } from 'react';
import axios from 'axios';
import { UserPath } from '../routes/Path';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from '../redux/slices/userSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);

    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleToggle = (e) => {
        setIsLogin(!isLogin)
    }

    const handleClear = () => {
        setName('');
        setUsername('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isLogin) {
            // login
            try {
                const response = await axios.post(UserPath.login, {
                    email,
                    password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });
                console.log(response);

                const data = await response.data;
                console.log("DATA --> ", data);

                dispatch(getUser(data?.user));

                if (data.success) {
                    toast.success(data.message);
                    setTimeout(() => {
                        handleClear();
                        navigate('/');
                    }, 1000);
                }
            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }


        } else {
            // register
            try {
                const response = await axios.post(UserPath.register, {
                    name,
                    username,
                    email,
                    password,
                }, {
                    headers: {
                        "Content-Type": 'application/json',
                        withCredentials: true,
                    }

                });

                const data = await response.data;

                if (data.success) {
                    toast.success(data.message);
                    setTimeout(() => {
                        handleClear();
                        setIsLogin(!isLogin);
                    }, 1000);
                }

            } catch (error) {
                console.log(error);
                toast.error(error?.response?.data?.message);
            }
        }
    }


    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <div className='flex items-center justify-evenly w-[80%]'>
                <div>
                    <img className='ml-5' width={"530px"} src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.44546679.1716768000&semt=ais_user" alt="logo" />
                </div>
                <div>
                    <div className='my-5'>
                        <h1 className='font-bold text-6xl'>Happening now.</h1>
                    </div>
                    <h2 className='text-2xl my-4 font-bold'>{isLogin ? 'Login' : 'Register'}</h2>

                    <form onSubmit={handleSubmit} className='flex flex-col w-[50%]'>
                        {!isLogin &&
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder='Name'
                                className='outline-blue-500  border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'
                            />
                        }

                        {
                            !isLogin &&
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                placeholder='Username'
                                className='outline-blue-500 border  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'
                            />
                        }

                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            className='outline-blue-500  border border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'
                        />

                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='outline-blue-500 border  border-gray-800 px-3 py-1 rounded-full my-1 font-semibold'
                        />

                        <button className='px-4 bg-[#1d9bf0] w-full rounded-full py-1 my-4 text-white'>{isLogin ? 'Login' : 'Register Up'}</button>

                        <p>{isLogin ? 'Do not have an account?' : 'Already have an account?'}   <span className='text-[#1d9bf0] cursor-pointer' onClick={handleToggle}>{isLogin ? 'Register' : 'Login'}</span></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login