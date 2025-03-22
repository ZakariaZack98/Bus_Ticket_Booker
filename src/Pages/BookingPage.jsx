import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { coachesData } from "../../lib/BookingsData";

const BookingPage = () => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(coachesData())));
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility
  const auth = getAuth();
  const destinations = Array.from(
    new Set([...data.map((element) => element.destination)])
  );
  const [destination, setDestination] = useState("Barishal");
  const [selectedCoach, setSelectedCouch] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="bookingPage h-svh bg-center bg-cover bg-no-repeat text-white">
      <div className="blackBG h-full w-full p-10">
        <h1 className="font-bold text-2xl text-center">Select Coach</h1>
        <div className="busSelector flex items-center my-10 gap-x-20">
          <div className="from flex items-center gap-x-3">
            <h4 className="text-xl">To : </h4>
            <select name="from" id="from" className="w-[200px]">
              <option value="dhaka">Dhaka</option>
            </select>
          </div>
          <div className="to flex items-center gap-x-3">
            <h4 className="text-xl">From : </h4>
            <select
              name="to"
              id="to"
              className="w-[200px]"
              onChange={(e) => setDestination(e.target.value)}
            >
              {destinations?.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="selectCoach">
            <select name="coach" id="coach">
              {data
                ?.filter((coach) => coach.destination === destination)
                .map((coach) => (
                  <option key={coach.coachID}>
                    {`Coach No: ${coach.coachID}, ${coach.departureTime}`}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
