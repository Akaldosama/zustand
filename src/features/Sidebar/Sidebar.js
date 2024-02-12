import React from 'react'
import { Link } from 'react-router-dom'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div>
        <aside>
            <ul>
                <Link to='/authors' className='links'>Authors</Link>
                <Link to='/books' className='links'>Books</Link>
                <Link to='/categories' className='links'>Genre</Link>
            </ul>
        </aside>
    </div>
  )
}
