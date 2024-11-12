import toast from "react-hot-toast";
import type { SpecialMaskKeys, TimeTravllerMasksKey } from "~/types";

export const masksCalculation = (
  tierMasks: number[],
  specialMasks: Record<SpecialMaskKeys, number>,
  timeTravellerMasks: Record<TimeTravllerMasksKey, number>,
): number => {
  const basePoints = [5, 3, 2, 1];

  let total_base = 0; // Total Base Points

  let total_masks_counts = 0; // Tota Mask Counts
  let total_masks_boost_per = 1;

  let tier_boost_per = 0;
  let total_tier_boost_points = 0; // Total Tier Boost Points

  tierMasks.forEach((count, tier) => {
    if (basePoints[tier]) {
      // base total part
      total_base += count * basePoints[tier];

      // tier Boost Part
      tier_boost_per =
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
      if (tier_boost_per > 0) {
        total_tier_boost_points +=
          (count * basePoints[tier] * tier_boost_per) / 100 +
          count * basePoints[tier];
      }

      // total mask Boost part
      total_masks_counts += count;
      total_masks_boost_per =
        total_masks_counts >= 100
          ? 50
          : total_masks_counts >= 50
            ? 30
            : total_masks_counts >= 20
              ? 15
              : total_masks_counts >= 10
                ? 10
                : total_masks_counts >= 5
                  ? 5
                  : 0;
    }
  });

  // Total Masks Boost Points
  const total_masks_boost_points = (total_base * total_masks_boost_per) / 100;

  // Total Special Masks Points
  const total_special_masks_points = SpecialMaskCalculation(
    total_masks_counts,
    specialMasks,
  );

  // Total TimeTraveller Traits Points
  const total_time_travellers_points = TimeTravellersCalculation(
    total_masks_counts,
    timeTravellerMasks,
  );

  if (
    total_special_masks_points === 412 ||
    total_time_travellers_points === 412
  ) {
    return 412;
  }

  const maskTotal: number =
    total_base +
    total_tier_boost_points +
    total_masks_boost_points +
    total_special_masks_points +
    total_time_travellers_points;

  return maskTotal;
};

const SpecialMaskCalculation = (
  total_masks_counts: number,
  specialMasks: Record<SpecialMaskKeys, number>,
): number => {
  const BasePoints: Record<SpecialMaskKeys, number> = {
    "Unique Ones": 20,
    Baba: 10,
    LED: 10,
  };

  let total_special_mask_counts = 0; // Total Special Masks Counts

  let total_base_special = 0; // Total Base Special Masks Points

  Object.entries(specialMasks).forEach(([m, value]) => {
    total_special_mask_counts += value;
  });

  if (total_masks_counts < total_special_mask_counts) {
    toast.error(
      "Total Masks must be greater than or equal to total Special Masks.",
    );
    return 412;
  }

  let boosted_Unique_points = 0;
  let boosted_LED_points = 0;
  let boosted_Baba_points = 0;

  Object.entries(specialMasks).forEach(([m, value]) => {
    const base_special_masks_points = value * BasePoints[m as SpecialMaskKeys];

    total_base_special += base_special_masks_points; // Total Special Base Points

    if (m === "Unique Ones") {
      const special_mask_boost_per =
        value >= 5
          ? 30
          : value >= 4
            ? 25
            : value >= 3
              ? 20
              : value >= 2
                ? 15
                : 0;

      boosted_Unique_points =
        (base_special_masks_points * special_mask_boost_per) / 100;
    }

    if (m === "LED") {
      const special_mask_boost_per =
        value >= 5
          ? 25
          : value >= 4
            ? 20
            : value >= 3
              ? 15
              : value >= 2
                ? 10
                : 0;

      boosted_LED_points =
        (base_special_masks_points * special_mask_boost_per) / 100;
    }

    if (m === "Baba") {
      const special_mask_boost_per =
        value >= 5
          ? 25
          : value >= 4
            ? 20
            : value >= 3
              ? 15
              : value >= 2
                ? 10
                : 0;

      boosted_Baba_points =
        (base_special_masks_points * special_mask_boost_per) / 100;
    }
  });

  return (
    total_base_special +
    boosted_Unique_points +
    boosted_LED_points +
    boosted_Baba_points
  );
};

const TimeTravellersCalculation = (
  total_masks_counts: number,
  timeTravellerMasks: Record<TimeTravllerMasksKey, number>,
): number => {
  let total_TimeTraveller_mask_counts = 0;

  Object.entries(timeTravellerMasks).forEach(([m, value]) => {
    total_TimeTraveller_mask_counts += value;
  });

  if (total_masks_counts < total_TimeTraveller_mask_counts) {
    toast.error(
      "Total Masks must be greater than or equal to total TimeTraveller Masks.",
    );
    return 412;
  }

  const total_base_TimeTraveller_points = total_TimeTraveller_mask_counts * 20;

  const boost_per =
    total_TimeTraveller_mask_counts >= 3
      ? 50
      : total_TimeTraveller_mask_counts >= 2
        ? 30
        : 0;

  if (boost_per > 0) {
    return (
      total_base_TimeTraveller_points +
      (total_base_TimeTraveller_points * boost_per) / 100 // Total TimeTraveller Points With Booost
    );
  } else {
    return total_base_TimeTraveller_points; // Total TimeTraveller Points Without Booost
  }
};
