import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({ page, totalPages, onPageChange }) => {

    let pages = []
    for(let i = 1; i <= totalPages; i++){
        pages.push(i)
    }
  return (
    <div className='flex flex-row font-mukta sm:text-lg md:text-xl gap-2'>
        {pages.map((p) => {
            return <button onClick={() => {
              onPageChange(p)
            }} key={p} className={`${p == page && "bg-gray-300"} rounded-full pt-1 sm:w-8 sm:h-8 md:w-9 md:h-9 text-center`}>{p}</button>
        })}
    </div>
  )
}

export default Pagination