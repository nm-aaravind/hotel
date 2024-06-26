import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <div className='relative flex flex-col h-28 bg-gray-200 bottom-0 font-mukta font-light py-7'>
      <div className='flex gap-10 mx-auto'>
      <Link>About Tourvista</Link>
      <Link>Terms & conditions</Link>
      </div>
      <div className='text-md absolute bottom-3 left-1/2 -translate-x-1/2'>
        Copyright Tourvista.com. All rights reserved
      </div>
    </div>
  )
}

export default Footer