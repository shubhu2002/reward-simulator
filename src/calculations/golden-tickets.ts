export const goldenTicketCalculation = (goldenTickets: number): number => {
  const GTBaseTotal = goldenTickets * 200;
  const boostValue =
    goldenTickets >= 5
      ? 100
      : goldenTickets >= 3
        ? 50
        : goldenTickets >= 2
          ? 20
          : 0;

  const goldenTicketsPointsTotal =
    GTBaseTotal + (GTBaseTotal * boostValue) / 100;

  return goldenTicketsPointsTotal;
};

export const extraBoostGoldenTickets = (
  totalPoints: number,
  goldenTickets: number,
): number => {
  const extraBoostPercentage =
    goldenTickets >= 5
      ? 25
      : goldenTickets >= 3
        ? 10
        : goldenTickets >= 2
          ? 5
          : 0;

  return (totalPoints * extraBoostPercentage) / 100;
};
