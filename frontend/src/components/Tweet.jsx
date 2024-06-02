import React from 'react';
import Avatar from 'react-avatar';
import { FaRegComment, FaRegBookmark, FaRegHeart } from "react-icons/fa";


const Tweet = () => {
    return (
        <div className='flex flex-row gap-3 p-4 w-full hover:bg-black/40 cursor-pointer'>
            <div className=''>
                <Avatar src={"https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg"} size="40" round={true} />
            </div>
            <div className='flex flex-col gap-5 w-full'>
                <div className='flex flex-col'>
                    <div className='flex gap-1'>
                        <h1 className='text-[17px]'>Pawan Choudhary</h1>
                        <p>@pawan_choudhary</p>
                        <p>. 2h</p>
                    </div>
                    <div className='text-[15px]'>No way 2019 was 5 years back.</div>
                </div>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex gap-1 items-center cursor-pointer hover:fill-green-500 hover:text-green-500'>
                        <FaRegComment size={17} />
                        <p>0</p>
                    </div>

                    <div className='flex gap-1 items-center cursor-pointer hover:fill-red-500 hover:text-red-500'>
                        <FaRegHeart size={17} />
                        <p>0</p>
                    </div>
                    <div className='flex gap-1 items-center cursor-pointer hover:fill-blue-500 hover:text-blue-500'>
                        <FaRegBookmark size={17} />
                        <p>0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tweet