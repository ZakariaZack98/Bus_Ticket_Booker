export const coachesData = () => Array.from({ length: 10 }, (_, index) => {
  const randomCoachID = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
  const departureHour = 1 + index; // Increment hour for each coach
  const departureTime = `${departureHour.toString().padStart(2, '0')}:00 ${departureHour < 12 ? 'AM' : 'PM'}`;
  const seatIDs = [
    'A1', 'A2', 'A3', 'A4',
    'B1', 'B2', 'B3', 'B4',
    'C1', 'C2', 'C3', 'C4',
    'D1', 'D2', 'D3', 'D4',
    'E1', 'E2', 'E3', 'E4',
    'F1', 'F2', 'F3', 'F4',
    'G1', 'G2', 'G3', 'G4',
    'H1', 'H2', 'H3', 'H4',
    'I1', 'I2', 'I3', 'I4',
    'J1', 'J2', 'J3', 'J4'
  ];

  return {
    coachID: randomCoachID,
    departureTime: departureTime,
    seats: seatIDs.map(id => {
      return {
        id: id,
        booked: false,
      }
    })
  };
});


