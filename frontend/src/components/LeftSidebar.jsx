import React from 'react';
import { FiHome } from "react-icons/fi";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const LeftSidebar = () => {
    const { user } = useSelector((store) => store?.user);


    return (
        <div className='flex flex-col justify-between w-[20%]' >
            <div>
                <div>
                    <div className='w-[30px] h-[30px] ml-4'>
                        <img
                            className='w-full h-full'
                            src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?size=338&ext=jpg&ga=GA1.1.2082370165.1716595200&semt=ais_user" alt="logo"

                        />
                    </div>
                </div>

                <div>
                    <Link to={'/'} className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>Home</span>
                    </Link>
                    <button className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>Explore</span>
                    </button>
                    <button className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>Notifications</span>
                    </button>
                    <button className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>Message</span>
                    </button>
                    <Link to={`/profile/${user?._id}`} className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>Profile</span>
                    </Link>
                    <button className=' flex gap-6 items-center py-2 px-6 my-2 hover:bg-gray-200 font-semibold text-[20px] rounded-full '>
                        <FiHome size={22} />
                        <span>More</span>
                    </button>
                    <button className=' text-white py-2 px-1 my-2 bg-[#1d9cf0] hover:bg-[#1d9cf0] font-semibold text-[20px] w-[220px] rounded-full text-center'>
                        Post
                    </button>
                </div>
            </div>
            <div></div>
        </div>
    )
}

export default LeftSidebar;