import React from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'

const Feed = () => {
    return (
        <div className='w-[50%]'>
            <CreatePost />
            <div className='flex flex-col gap-2'>
                <Tweet />
                <Tweet />
                <Tweet />
                <Tweet />
            </div>
        </div>
    )
}

export default Feed