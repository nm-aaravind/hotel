import React from 'react'
import LoaderAnime from "../assets/Loader.svg"
const Loader = () => {
  return (
    <div className='z-10 fixed grid place-items-center h-screen bg-white/70 w-full top-0 left-0 bottom-0'>
        <img src={LoaderAnime} className='bg-transparent absolute'></img>
    </div>
  )
  
}

export default Loader