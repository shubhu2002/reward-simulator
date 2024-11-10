import { type NextComponentType } from "next";
import { FaArrowRightLong } from "react-icons/fa6";

import { useState } from "react";
import { useModalStore } from "~/store";

const CalculationModal: NextComponentType = () => {
  const { setTotalRewardPoints, setModal } = useModalStore();
  const [tierMasks, setTierMasks] = useState([0, 0, 0, 0]);
  const [goldenTickets, setGoldenTickets] = useState(0);
  const [tierPleiades, setTierPleiades] = useState([0, 0, 0]);

  // masks calculation
  const masksCalculation = (): number => {
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
                ? 50
                : count >= 30
                  ? 50
                  : count >= 20
                    ? 30
                    : count >= 10
                      ? 20
                      : 0;

        tierBoostPoints +=
          (count * basePoints[tier] * tierBoostPer) / 100 +
          count * basePoints[tier];

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

    const maskTotal: number =
      baseTotal + (baseTotal * totalMaskBoostPer) / 100 + tierBoostPoints;
    return maskTotal;
  };

  // pleiades calcualtion
  const pleiadesCalculation = (): number => {
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

        tierBoostPoints +=
          (count * basePoints[tier] * tierBoostPer) / 100 +
          count * basePoints[tier];

        // total mask Boost part
        totalPleiadesCounts += count;
        totalPleiadesBoostPer =
          totalPleiadesCounts >= 10
            ? 50
            : totalPleiadesCounts >= 5
              ? 40
              : totalPleiadesCounts >= 3
                ? 30
                : totalPleiadesCounts >= 20
                  ? 2
                  : 0;
      }
    });

    const pleiadesTotal: number =
      baseTotal + (baseTotal * totalPleiadesBoostPer) / 100 + tierBoostPoints;
    return pleiadesTotal;
  };

  // golden ticket Caculation
  const goldenTicketCalculation = (): number => {
    const GTBaseTotal = goldenTickets * 200;
    const boostValue =
      goldenTickets >= 5
        ? 100
        : goldenTickets >= 3
          ? 50
          : goldenTickets >= 2
            ? 20
            : 0;
    return GTBaseTotal + (GTBaseTotal * boostValue) / 100;
  };

  // extra boost in total points if we have golden tickets
  const extraBoostGoldenTickets = (totalPoints: number): number => {
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

  // final calculation
  const finalCalcualtion = () => {
    const finakMaskPoints = masksCalculation();

    const finalgoldenTicketPoints = goldenTicketCalculation();

    const finalPleiadesPoints = pleiadesCalculation();

    const totalRewardPoints =
      finakMaskPoints + finalPleiadesPoints + finalgoldenTicketPoints;

    const finalRewardPoints =
      totalRewardPoints + extraBoostGoldenTickets(totalRewardPoints);

    setTotalRewardPoints(finalRewardPoints);
    setModal("RESULT");
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      <div className="my-4 mt-2 w-full md:mt-4">
        <div className="mb-4 flex items-center gap-5 text-lg font-extrabold md:text-2xl">
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
          <span className="inline-flex w-full flex-1 justify-center">
            Masks
          </span>
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
        </div>
        <div className="grid w-full grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex md:space-y-0">
          {tierMasks.map((value, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label
                htmlFor={`Tier ${index + 1}`}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                Tier {index + 1}
              </label>
              <div
                key={index}
                className="w-auto rounded-2xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]"
              >
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newMasks = [...tierMasks];
                    newMasks[index] = parseInt(e.target.value) || 0;
                    setTierMasks(newMasks);
                  }}
                  className="w-full bg-transparent px-2 text-center text-2xl outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pleiades */}
      <div className="my-4 w-full">
        <div className="mb-4 flex items-center gap-5 text-lg font-extrabold md:text-2xl">
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
          <span className="inline-flex w-full flex-1 justify-center">
            Pleiades
          </span>
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
        </div>
        <div className="grid grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex">
          {tierPleiades.map((value, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`Tier ${index + 1}`}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                Tier {index + 1}
              </label>
              <div className="w-auto rounded-2xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    const newPleiades = [...tierPleiades];
                    newPleiades[index] = parseInt(e.target.value) || 0;
                    setTierPleiades(newPleiades);
                  }}
                  className="w-full bg-transparent px-2 text-center text-2xl outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Golden Tickets */}
      <div className="my-4 w-full pr-1">
        <div className="mb-6 flex items-center text-lg font-extrabold md:text-2xl">
          <div className="h-[1px] w-full bg-black text-black" />
          <span className="inline-flex w-full justify-center text-center md:w-[80%]">
            Golden Tickets
          </span>
          <div className="h-[1px] w-full bg-black text-black" />
        </div>
        <div className="w-auto rounded-2xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
          <input
            type="text"
            value={goldenTickets}
            onChange={(e) => setGoldenTickets(parseInt(e.target.value) || 0)}
            className="w-full bg-transparent px-2 text-center text-2xl outline-none"
          />
        </div>
      </div>

      {/* calculate button */}
      <div className="my-6 w-full">
        <button className="button-style w-full" onClick={finalCalcualtion}>
          <span className="relative flex w-full items-center justify-center gap-3 text-xl tracking-wide md:text-3xl">
            Calculate <FaArrowRightLong size={24} />
          </span>
        </button>
      </div>
    </div>
  );
};

export default CalculationModal;
