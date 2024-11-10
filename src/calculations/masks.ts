import toast from "react-hot-toast";

// masks calculation
type SpecialMaskKeys = "Unique Ones" | "Baba" | "LED";

export const masksCalculation = (
  tierMasks: number[],
  specialMasks: Record<SpecialMaskKeys, number>,
  specialMasksBasePoints: Record<SpecialMaskKeys, number>,
): number => {
  const basePoints = [5, 3, 2, 1];

  let baseTotal = 0;

  let totalMaskCounts = 0;
  let totalMaskBoostPer = 1;

  let tierBoostPer = 0;
  let tierBoostPoints = 0;

  tierMasks.forEach((count, tier) => {
    if (basePoints[tier]) {
      baseTotal += count * basePoints[tier];

      // tier Boost Part
      tierBoostPer =
        count >= 100
          ? 100
          : count >= 75
            ? 80
            : count >= 50
              ? 70
              : count >= 30
                ? 50
                : count >= 20
                  ? 30
                  : count >= 10
                    ? 20
                    : count >= 5
                      ? 10
                      : 0;
      if (tierBoostPer > 0) {
        tierBoostPoints +=
          (count * basePoints[tier] * tierBoostPer) / 100 +
          count * basePoints[tier];
      }

      // total mask Boost part
      totalMaskCounts += count;
      totalMaskBoostPer =
        totalMaskCounts >= 100
          ? 50
          : totalMaskCounts >= 50
            ? 30
            : totalMaskCounts >= 20
              ? 15
              : totalMaskCounts >= 10
                ? 10
                : totalMaskCounts >= 5
                  ? 5
                  : 0;
    }
  });
  const totalMasksBoostPoints = (baseTotal * totalMaskBoostPer) / 100;

  const specialMaskPoints = SpecialMaskCalculation(
    totalMaskCounts,
    specialMasks,
    specialMasksBasePoints,
  );

  const maskTotal: number =
    baseTotal + tierBoostPoints + totalMasksBoostPoints + specialMaskPoints;

  return maskTotal;
};

const SpecialMaskCalculation = (
  totalMaskCounts: number,
  specialMasks: Record<SpecialMaskKeys, number>,
  specialMasksBasePoints: Record<SpecialMaskKeys, number>,
): number => {
  let totalSpecialMaskCounts = 0;

  let baseTotalSpecial = 0;

  Object.entries(specialMasks).forEach(([m, value]) => {
    totalSpecialMaskCounts += value;
  });

  if (totalMaskCounts < totalSpecialMaskCounts) {
    toast.error(
      "Total Masks must be greater than or equal to total Special Masks.",
    );
    return 412;
  }

  let boostedUniquePoints = 0;
  let boostedLEDPoints = 0;
  let boostedBabaPoints = 0;

  Object.entries(specialMasks).forEach(([m, value]) => {
    const baseSpecialMasksPoints =
      value * specialMasksBasePoints[m as SpecialMaskKeys];

    baseTotalSpecial += baseSpecialMasksPoints;

    if (m === "Unique Ones") {
      const specialMaskBoostPer =
        value >= 5
          ? 30
          : value >= 4
            ? 25
            : value >= 3
              ? 20
              : value >= 2
                ? 15
                : 0;

      boostedUniquePoints =
        (baseSpecialMasksPoints * specialMaskBoostPer) / 100;
    }

    if (m === "LED") {
      const specialMaskBoostPer =
        value >= 5
          ? 25
          : value >= 4
            ? 20
            : value >= 3
              ? 15
              : value >= 2
                ? 10
                : 0;

      boostedLEDPoints = (baseSpecialMasksPoints * specialMaskBoostPer) / 100;
    }

    if (m === "Baba") {
      const specialMaskBoostPer =
        value >= 5
          ? 25
          : value >= 4
            ? 20
            : value >= 3
              ? 15
              : value >= 2
                ? 10
                : 0;

      boostedBabaPoints = (baseSpecialMasksPoints * specialMaskBoostPer) / 100;
    }
  });

  return (
    baseTotalSpecial +
    boostedUniquePoints +
    boostedLEDPoints +
    boostedBabaPoints
  );
};
