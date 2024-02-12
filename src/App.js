import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Authors from './features/Authors/Authors'
import Books from './features/Books/Books'
import Categories from './features/Categories/Categories'
import SignUp from './features/Auth/SignUp'
import Signin from './features/Auth/Signin'
import SingleBook from './features/Books/SingleBook'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='signin' element={<Signin />} />
        <Route path='authors' element={<Authors />} />
        <Route path='books' element={<Books />} />
        <Route path='single_book/:id' element={<SingleBook />} />
        <Route path='genre' element={<Categories />} />
      </Routes>
    </div>
  )
}
