import React, { useEffect } from 'react';
import Avatar from 'react-avatar';
import { GoArrowLeft } from "react-icons/go";
import useGetProfile from '../hooks/useGetProfile';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { UserPath } from '../routes/Path';

const Profile = () => {
    const { id } = useParams();
    const { user } = useSelector((store) => store?.user);
    console.log("USER -> ", user);
    useGetProfile(user?._id);


    return (
        <div className='w-[60%] flex flex-col p-4 relative'>
            <div className='flex items-center gap-10'>
                <GoArrowLeft />
                <div className='flex flex-col '>
                    <h1>Nitesh Prajapat</h1>
                    <p>397 posts</p>
                </div>
            </div>

            <img src="https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg" alt="banner" className='h-[40%] object-cover' />
            <div className='absolute top-[35%] left-7 rounded-full  border-white border-[5px]'>
                <Avatar src={"https://i.pinimg.com/736x/0a/e7/a0/0ae7a06c5b49da865813cf2f5b175bf6.jpg"} size="140" round={true} className='object-cover' />
            </div>
            <div className='text-right m-4'>
                <button className='px-4 py-1 border border-gray-400 rounded-full '>Edit Profile</button>
            </div>

            <div className='px-4 py-3'>
                <h1>Nitesh Prajapat</h1>
                <p>@niteshprajapat</p>
                <p className='mt-3'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero, distinctio?</p>

            </div>
        </div>
    )
}

export default Profile