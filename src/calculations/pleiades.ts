import toast from "react-hot-toast";

export const pleiadesCalculation = (
  tierPleiades: number[],
  specialPleiades: number,
): number => {
  const basePoints = [30, 20, 15];

  let baseTotal = 0;

  let totalPleiadesCounts = 0;
  let totalPleiadesBoostPer = 1;

  let tierBoostPer = 0;
  let tierBoostPoints = 0;

  tierPleiades.forEach((count, tier) => {
    if (basePoints[tier]) {
      baseTotal += count * basePoints[tier];

      // tier Boost Part
      tierBoostPer =
        count >= 10
          ? 100
          : count >= 5
            ? 75
            : count >= 3
              ? 50
              : count >= 2
                ? 25
                : 0;
      if (tierBoostPer >= 1) {
        tierBoostPoints +=
          (count * basePoints[tier] * tierBoostPer) / 100 +
          count * basePoints[tier];
      }

      // total mask Boost part
      totalPleiadesCounts += count;
      totalPleiadesBoostPer =
        totalPleiadesCounts >= 10
          ? 50
          : totalPleiadesCounts >= 5
            ? 40
            : totalPleiadesCounts >= 3
              ? 30
              : totalPleiadesCounts >= 2
                ? 20
                : 0;
    }
  });

  let specialPleiadesPoints = 0;

  if (totalPleiadesCounts < specialPleiades) {
    toast.error(
      "Total Pleiades must be greater than or equal to Unique Ones Pleiades ",
    );
    return 412;
  }

  const baseSpecialPleiadesPoints = specialPleiades * 20;
  const boostPer =
    specialPleiades >= 5
      ? 50
      : specialPleiades >= 3
        ? 40
        : specialPleiades >= 2
          ? 30
          : 0;

  if (boostPer > 0) {
    specialPleiadesPoints =
      baseSpecialPleiadesPoints + (baseSpecialPleiadesPoints * boostPer) / 100;
  } else {
    specialPleiadesPoints = baseSpecialPleiadesPoints;
  }

  const pleiadesTotal: number =
    baseTotal +
    (baseTotal * totalPleiadesBoostPer) / 100 +
    tierBoostPoints +
    specialPleiadesPoints;
  return pleiadesTotal;
};
