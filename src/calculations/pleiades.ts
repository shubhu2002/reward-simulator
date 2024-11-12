import toast from "react-hot-toast";

export const pleiadesCalculation = (
  tierPleiades: number[],
  specialPleiades: number,
): number => {
  const basePoints = [30, 20, 15];

  let total_base = 0; // Total Base Points

  let total_pleiades_counts = 0;
  let total_pleiades_boost_per = 1;

  let tier_boost_per = 0;
  let total_tier_boost_points = 0; // Total Tier Boost Points

  tierPleiades.forEach((count, tier) => {
    if (basePoints[tier]) {
      // base total part
      total_base += count * basePoints[tier];

      // tier boost part
      tier_boost_per =
        count >= 10
          ? 100
          : count >= 5
            ? 75
            : count >= 3
              ? 50
              : count >= 2
                ? 25
                : 0;

      if (tier_boost_per > 0) {
        total_tier_boost_points +=
          (count * basePoints[tier] * tier_boost_per) / 100 +
          count * basePoints[tier];
      }

      // total pleiades boost part
      total_pleiades_counts += count;
      total_pleiades_boost_per =
        total_pleiades_counts >= 10
          ? 50
          : total_pleiades_counts >= 5
            ? 40
            : total_pleiades_counts >= 3
              ? 30
              : total_pleiades_counts >= 2
                ? 20
                : 0;
    }
  });

  // Total Pleiades Boost Points
  const total_pleiades_boost_points =
    (total_base * total_pleiades_boost_per) / 100;

  // Total Special Pleiades Points
  const total_special_pleiades_points = specialPleiadesCalculation(
    total_pleiades_counts,
    specialPleiades,
  );

  // Final Pleiades points
  const final_pleiades_points: number =
    total_base +
    total_tier_boost_points +
    total_pleiades_boost_points +
    total_special_pleiades_points;

  return final_pleiades_points;
};

const specialPleiadesCalculation = (
  total_pleiades_counts: number,
  specialPleiades: number,
): number => {
  if (total_pleiades_counts < specialPleiades) {
    toast.error(
      "Total Pleiades must be greater than or equal to Unique Ones Pleiades.",
    );
    return 412;
  }

  const base_special_points = specialPleiades * 20; // Total Base Special Points

  const special_boost_per =
    specialPleiades >= 5
      ? 50
      : specialPleiades >= 3
        ? 40
        : specialPleiades >= 2
          ? 30
          : 0;

  if (special_boost_per > 0) {
    return (
      base_special_points + (base_special_points * special_boost_per) / 100 // Total Special Points With Boost
    );
  } else {
    return base_special_points; // Total Special Points Without Boost
  }
};
