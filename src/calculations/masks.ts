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

  let totalSpecialMaskCounts = 0;
  let totalSpecialMasksPoints = 0;
  let specialMaskBoostPer = 0;
  Object.entries(specialMasks).forEach(([m, value]) => {
    totalSpecialMaskCounts += value;
  });

  Object.entries(specialMasks).forEach(([m, value]) => {
    if (totalMaskCounts >= totalSpecialMaskCounts) {
      totalSpecialMasksPoints +=
        value * specialMasksBasePoints[m as SpecialMaskKeys];

      if (m === "Unique Ones") {
        specialMaskBoostPer =
          value >= 5
            ? 30
            : value >= 4
              ? 25
              : value >= 3
                ? 20
                : value >= 2
                  ? 15
                  : 0;
        const boosted =
          value * specialMasksBasePoints[m as SpecialMaskKeys] +
          (value *
            specialMasksBasePoints[m as SpecialMaskKeys] *
            specialMaskBoostPer) /
            100;
        // console.log(boosted, "boosted");
      }
    } else {
      console.log("greater");
    }
  });
  // console.log(totalSpecialMasksPoints);

  const maskTotal: number =
    baseTotal + (baseTotal * totalMaskBoostPer) / 100 + tierBoostPoints;

  return maskTotal;
};
