import { getAuth } from 'firebase/auth'
import React, { useState, useEffect } from 'react'
import { coachesData } from '../../lib/BookingsData';

const BookingPage = () => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(coachesData())));
  const auth = getAuth();


  return (
    <div>
      
    </div>
  )
}

export default BookingPage
