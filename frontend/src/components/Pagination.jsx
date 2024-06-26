import React from 'react'
import { Link } from 'react-router-dom'
const Pagination = ({ page, totalPages, onPageChange }) => {

    let pages = []
    for(let i = 1; i <= totalPages; i++){
        pages.push(i)
    }
  return (
    <div className='flex flex-row font-mukta text-xl gap-2'>
        {pages.map((p) => {
            return <button onClick={() => {
              onPageChange(p)
            }} key={p} className={`${p == page && "bg-gray-300"} rounded-full pt-1 w-9 h-11 text-center`}>{p}</button>
        })}
    </div>
  )
}

export default Pagination