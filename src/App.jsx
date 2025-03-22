import React, { useState } from 'react'
import Login from './Pages/Login'
import BookingPage from './Pages/BookingPage';
import { getAuth } from 'firebase/auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login/>}/>
        <Route path='/bookingpage' element={<BookingPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
