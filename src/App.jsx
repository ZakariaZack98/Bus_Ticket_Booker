import React, { useState } from 'react'
import Login from './Pages/Login'
import BookingPage from './Pages/BookingPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUp from './Pages/SignUp';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/bookingpage' element={<BookingPage/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
