export const coachesData = () => {
  const staticCoachIDs = [
    1001, 1002, 1003, 1004, 1005,
    1006, 1007, 1008, 1009, 1010
  ]; // Predefined static 4-digit coach IDs

  return Array.from({ length: 10 }, (_, index) => {
    const departureHour = 1 + index;
    const departureTime = `${departureHour.toString().padStart(2, '0')}:00 ${
      departureHour < 12 ? 'PM' : 'AM'
    }`;
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

    // Determine the destination based on the index
    let destination = '';
    if (index % 3 === 0) {
      destination = 'Barishal';
    } else if (index % 3 === 1) {
      destination = 'Sylhet';
    } else if (index % 3 === 2) {
      destination = 'Khulna';
    }

    return {
      coachID: staticCoachIDs[index], // Use static 4-digit coach IDs
      departureTime: departureTime,
      destination: destination, // Add the destination property
      seats: seatIDs.map(id => {
        return {
          id: id,
          booked: false,
        };
      }),
    };
  });
};


