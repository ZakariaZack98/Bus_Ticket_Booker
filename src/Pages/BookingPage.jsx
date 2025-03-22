import { getAuth } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { coachesData } from "../../lib/BookingsData";
import { GiSteeringWheel } from "react-icons/gi";

const BookingPage = () => {
  const [data, setData] = useState(JSON.parse(JSON.stringify(coachesData())));
  const auth = getAuth();
  const destinations = Array.from(
    new Set([...data.map((element) => element.destination)])
  );
  const [destination, setDestination] = useState(destinations[0]);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const handleBooking = e => {
    const updatedData = JSON.parse(JSON.stringify(data));
    for(let i = 0; i < updatedData.length; i++) {
      if(updatedData[i].coachID === selectedCoach) {
        for(let j = 0; j < updatedData[i].seats.length; j++) {
          if(updatedData[i].seats[j].id === e.target.innerText) {
            updatedData[i].seats[j].booked = true;
            updatedData[i].seats[j].bookingDetails = {
              passengerName: 'Mr. X',
              bookedAt: new Date().toLocaleTimeString(),
              seller: auth.currentUser.email
            }
          }
        }
      }
    }
    setData(updatedData);
  }

  useEffect(() => {
    console.log(data);
    const filteredCoaches = data.filter(
      (coach) => coach.destination === destination
    );
    if (filteredCoaches.length > 0) {
      setSelectedCoach(filteredCoaches[0].coachID);
    }
  }, [destination, data]);

  return (
    <div className="bookingPage h-svh bg-center bg-cover bg-no-repeat text-white">
      <div className="blackBG h-full w-full px-10 py-6">
        <div className="flex">
          <div className="busSelector min-w-[35dvw] flex flex-col justify-center items-start my-10 gap-y-10">
            <h1 className="font-bold text-3xl w-[400px]">Select A Coach</h1>
            <div className="from flex flex-col items-start gap-y-3">
              <h4 className="text-xl">From : </h4>
              <select
                name="from"
                id="from"
                className="min-w-[400px] border-solid border-2 border-white"
              >
                <option value="dhaka">Dhaka</option>
              </select>
            </div>
            <div className="to flex flex-col items-start gap-y-3">
              <h4 className="text-xl">To : </h4>
              <select
                name="to"
                id="to"
                className="min-w-[400px] border-solid border-2 border-white"
                onChange={(e) => setDestination(e.target.value)}
              >
                {destinations?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="selectCoach flex flex-col items-start gap-y-3">
              <h4 className="text-xl">Select Bus : </h4>
              <select
                name="coach"
                id="coach"
                className="min-w-[400px] border-solid border-2 border-white"
                onChange={(e) => {
                  console.log("Selected Coach:", e.target.value); // Log the selected value
                  setSelectedCoach(e.target.value); // Update the state
                }}
              >
                {data
                  ?.filter((coach) => coach.destination === destination)
                  .map((coach) => (
                    <option key={coach.coachID} value={coach.coachID}>
                      {`Coach No: ${coach.coachID}, ${coach.departureTime}`}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="seatLayout flex">
            <div className="h-[90dvh] w-[25dvw] border-solid border-2 border-white rounded-2xl">
              <div className="driverSec h-[20%] flex justify-end items-end py-3 px-5 border-solid border-b-2 border-white">
                <span className="text-4xl border-2 border-solid border-white px-4 py-1 rounded-md">
                  <GiSteeringWheel />
                </span>
              </div>
              <div className="passengerSec p-1.5 flex flex-wrap w-full gap-y-2">
                {data
              ?.filter((coach) => coach.coachID === selectedCoach)
              .map((coach) =>
                coach.seats.map((item, index) => {
                  console.log(selectedCoach)
                  return (
                    <div key={item.id} className={`w-[20%] h-[35px] ${(index + 1) % 4 === 3 ? 'ml-[20%]' : ''} ${item.booked ? 'bg-red-800' : 'bg-green-800'} p-3 border-solid border-2 border-white rounded-md flex justify-center items-center cursor-pointer`} value={item.id} onClick={e => handleBooking(e)}>
                      {item.id}
                    </div>
                  )
                })
              )}
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
