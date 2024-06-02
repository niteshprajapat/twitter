import React from 'react';
import Avatar from 'react-avatar';
import { IoIosSearch } from "react-icons/io";
import useOtherUsers from '../hooks/useOtherUsers';
import { useSelector } from 'react-redux';


const RightSidebar = () => {
    const { user } = useSelector((store) => store?.user);
    console.log("UUUSSER -> ", user);

    useOtherUsers(user?._id)



    return (
        <div className='w-[20%] flex flex-col gap-4 p-4'>
            <div className='flex gap-2 items-center rounded-full px-2 py-1 bg-gray-200 outline-none border-none'>
                <IoIosSearch size={22} />
                <input type="text" placeholder='search' className='w-[90%] bg-transparent border-none outline-none' />
            </div>
            <div className='mt-10'>
                <h1>Who to follow</h1>
                <div className='flex justify-between items-center mt-5'>
                    <div className='flex gap-1 items-center'>
                        <Avatar src={"https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg"} size="40" round={true} />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Ashraf Khan</h1>
                            <p className='text-[15px]'>@ashrafkhan</p>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-black py-1 px-2 rounded-full text-[15px]'>Follow</button>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <div className='flex gap-1 items-center'>
                        <Avatar src={"https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg"} size="40" round={true} />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Ashraf Khan</h1>
                            <p className='text-[15px]'>@ashrafkhan</p>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-black py-1 px-2 rounded-full text-[15px]'>Follow</button>
                    </div>
                </div>

                <div className='flex justify-between items-center mt-5'>
                    <div className='flex gap-1 items-center'>
                        <Avatar src={"https://staticg.sportskeeda.com/editor/2023/01/9487f-16728933915704-1920.jpg"} size="40" round={true} />
                        <div className='flex flex-col'>
                            <h1 className='font-bold'>Ashraf Khan</h1>
                            <p className='text-[15px]'>@ashrafkhan</p>
                        </div>
                    </div>
                    <div>
                        <button className='text-white bg-black py-1 px-2 rounded-full text-[15px]'>Follow</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default RightSidebar