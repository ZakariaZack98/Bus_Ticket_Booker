import { getAuth, signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { coachesData } from "../../lib/BookingsData";
import { GiSteeringWheel } from "react-icons/gi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  
  //SETTING UP STATES AND VARIABLES
  const navigate = useNavigate();
  const [data, setData] = useState(JSON.parse(JSON.stringify(coachesData())));
  const auth = getAuth();
  const destinations = Array.from(
    new Set([...data.map((element) => element.destination)])
  );
  const [destination, setDestination] = useState(destinations[0]);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [passengerName, setPassengerName] = useState("");
  const [passengerPhone, setPassengerPhone] = useState("");

  /**
   * TODO: SET THE SELECTED SEAT BASED ON CLICKING ON SEATLAYOUT UI =================
   * @param event.target
   * return null
   */ 
  const handleSeatSelect = (e) => {
    console.log(e.target.innerText, selectedCoach);
    const updatedData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].coachID == selectedCoach) {
        for (let j = 0; j < updatedData[i].seats.length; j++) {
          if (updatedData[i].seats[j].id === e.target.innerText) {
            setSelectedSeat(updatedData[i].seats[j]);
          }
        }
      }
    }
  };


  /**
   * TODO: BOOKING SEAT BASED ON FORM DATA AND UPDATE THE DATA =======================
   * @param event, passangerName, passangerPhone
   * return null
   */ 
  const handleBooking = (e) => {
    e.preventDefault();
    if(!passengerName || !passengerPhone) {
      toast.error('Input field must not be empty');
      return;
    }
    const updatedData = JSON.parse(JSON.stringify(data));
    
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].coachID == selectedCoach) {
        for (let j = 0; j < updatedData[i].seats.length; j++) {
          if (updatedData[i].seats[j].id === selectedSeat.id) {
            updatedData[i].seats[j].booked = true;
            updatedData[i].seats[j].bookingDetails = {
              passengerName: passengerName,
              passengerPhone: passengerPhone,
              bookedAt: new Date().toLocaleString(),
              seller: auth.currentUser.displayName,
            };
          }
        }
      }
    }
    setData(updatedData);
    toast.success(`Seat booking for ${selectedSeat.id} successfull`);
    setSelectedSeat(null);
    setPassengerName('');
    setPassengerPhone('');
  };


  /**
   * TODO: REMOVING THE BOOKED SEAT AND UPDATE THE DATA =============================
   * @param event.target
   * return null
   */ 
  const handleCancel = () => {
    const updatedData = JSON.parse(JSON.stringify(data));
    for (let i = 0; i < updatedData.length; i++) {
      if (updatedData[i].coachID == selectedCoach) {
        for (let j = 0; j < updatedData[i].seats.length; j++) {
          if (updatedData[i].seats[j].id === selectedSeat.id) {
            updatedData[i].seats[j].booked = false;
            updatedData[i].seats[j].bookingDetails = null;
          }
        }
      }
    }
    setData(updatedData);
    toast.warn(`Booking has been removed for ${selectedSeat.id}`);
    setSelectedSeat(null);
  }


  /**
   * TODO: SET THE FIRST AVAILABLE COACH AS DEFAULT WHENEVER THE DESTINATION CHANGE===
   * @param destination
   * return null
   * */ 
  useEffect(() => {
    const filteredCoaches = data.filter(
      (coach) => coach.destination === destination
    );
    if (filteredCoaches.length > 0) {
      setSelectedCoach(filteredCoaches[0].coachID);
    }
  }, [destination]);


  const handleSignOut = () => {
    signOut(auth)
    .then(() => {
      toast.success("Successfully signed out!");
      navigate("/"); // Redirect to the login page
    })
    .catch((error) => {
      toast.error(`Error signing out: ${error.message}`);
    });
  }


  return (
    <div className="bookingPage h-svh bg-center bg-cover bg-no-repeat text-white">
      <div className="blackBG h-full w-full px-10 py-6 relative">
        <div className="absolute bottom-[5%] right-[3%]">
          <button className="bg-red-700 px-6 py-2 rounded-md font-semibold cursor-pointer" onClick={handleSignOut}>Log Out</button>
        </div>
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
                {console.log("before reneder", selectedCoach)}
                {data
                  ?.filter((coach) => coach.coachID == selectedCoach)
                  .map((coach) =>
                    coach.seats.map((item, index) => {
                      return (
                        <div
                          key={item.id}
                          className={`w-[20%] h-[35px] ${
                            (index + 1) % 4 === 3 ? "ml-[20%]" : ""
                          } ${
                            item.booked ? "bg-red-800" : "bg-green-800"
                          } p-3 border-solid border-2 ${
                            selectedSeat && selectedSeat.id == item.id
                              ? "border-amber-400"
                              : "border-white"
                          } rounded-md flex justify-center items-center cursor-pointer`}
                          value={item.id}
                          onClick={(e) => handleSeatSelect(e)}
                        >
                          {item.id}
                        </div>
                      );
                    })
                  )}
              </div>
            </div>
          </div>
          <div className="bookingDetails w-[30%] ms-10">
            {!selectedSeat ? (
              <h1 className="text-2xl font-semibold">No seat selected.</h1>
            ) : (
              <div>
                <h1 className="text-2xl font-semibold">
                  Seat Booking Details:
                </h1>
                <h4
                  className={`${
                    selectedSeat.booked ? "text-red-500" : "text-white"
                  } font-bold`}
                >
                  Current Status: {selectedSeat.booked ? "Booked" : "Empty"}
                </h4>
                {selectedSeat.booked ? (
                  <div className="ticketInfo my-10 flex flex-col gap-y-3">
                    <p className="text-xl font-semibold">
                      Passanger Name:{" "}
                      {selectedSeat.bookingDetails.passengerName}
                    </p>
                    <p>
                      Passanger Contact:{" "}
                      {selectedSeat.bookingDetails.passengerPhone}
                    </p>
                    <p>Booked At: {selectedSeat.bookingDetails.bookedAt}</p>
                    <p className="text-sm font-semibold">
                      Sold by: {selectedSeat.bookingDetails.seller}
                    </p>
                    <button
                      className="px-8 py-2 rounded-md font-semibold bg-blue-800 cursor-pointer mt-10"
                      onClick={(e) => handlePrint(e)}
                    >
                      Print Ticket
                    </button>
                    <button
                      className="px-8 py-2 rounded-md font-semibold bg-red-800 cursor-pointer"
                      onClick={(e) => handleCancel(e)}
                    >
                      Cancel booking
                    </button>
                  </div>
                ) : (
                  <form className="seatBookingForm flex flex-col gap-y-4 mt-10">
                    <div className="flex flex-col">
                      <label htmlFor="passengerName">Passenger Name: </label>
                      <input
                        type="text"
                        id="passengerName"
                        name="passengerName"
                        value={passengerName}
                        className="px-2 text-black rounded-md"
                        onChange={(e) => setPassengerName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label htmlFor="passengerPhone">
                        Passenger Contact:{" "}
                      </label>
                      <input
                        type="text"
                        id="passengerPhone"
                        name="passengerPhone"
                        value={passengerPhone}
                        className="px-2 text-black rounded-md"
                        onChange={(e) => setPassengerPhone(e.target.value)}
                      />
                    </div>
                    <p className="font-bold">
                      Selected Seat: {selectedSeat.id}
                    </p>
                    <button type="submit"
                      className="px-8 py-2 bg-green-800 rounded-md cursor-pointer"
                      onClick={e => handleBooking(e)}
                    >
                      Confirm booking
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
