export const goldenTicketCalculation = (goldenTickets: number): number => {
  const GT_base_total = goldenTickets * 200; // Total Base Points

  const boost_per =
    goldenTickets >= 5
      ? 100
      : goldenTickets >= 3
        ? 50
        : goldenTickets >= 2
          ? 20
          : 0;

  const final_GT_points = GT_base_total + (GT_base_total * boost_per) / 100; // Final GT Points with Boost

  return final_GT_points;
};

export const extraBoostGoldenTickets = (
  totalPoints: number,
  goldenTickets: number,
): number => {
  const extra_boost_per =
    goldenTickets >= 5
      ? 25
      : goldenTickets >= 3
        ? 10
        : goldenTickets >= 2
          ? 5
          : 0;

  return (totalPoints * extra_boost_per) / 100; // Final Extra GT Boost Points
};
