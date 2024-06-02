import React from 'react';
import Avatar from 'react-avatar';

const CreatePost = () => {
    return (
        <div className='flex flex-col gap-2'>
            <div className='flex flex-row justify-between items-center mb-5'>
                <button className=' w-full text-center font-bold cursor-pointer hover:bg-gray-200 py-4  border-gray-800'>For You</button>
                <button className=' w-full text-center font-bold cursor-pointer hover:bg-gray-200 py-4  border-gray-800'>Following</button>
            </div>
            <div>
                <div className='flex flex-row gap-5 p-4'>
                    <div>
                        <Avatar src={"https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg"} size="40" round={true} />
                    </div>
                    <input type="text" placeholder='What is happening?!' className='w-full outline-none border-none' />
                </div>
                <div className='flex justify-end items-center p-4'>
                    <button className='bg-[#1d9cf0] text-white px-4 py-1 rounded-full font-medium text-center'>Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost