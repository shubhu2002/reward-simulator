import React, { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";

import { useModalStore } from "~/store";
import type { SpecialMaskKeys, TimeTravllerMasksKey } from "~/types";

import {
  extraBoostGoldenTickets,
  goldenTicketCalculation,
} from "../calculations/golden-tickets";
import { pleiadesCalculation } from "../calculations/pleiades";
import { masksCalculation } from "../calculations/masks";
import toast from "react-hot-toast";

const CalculationModal = () => {
  const { setTotalRewardPoints, setModal } = useModalStore();

  const [tierMasks, setTierMasks] = useState([0, 0, 0, 0]);
  const [specialMasks, setSpecialMasks] = useState<
    Record<SpecialMaskKeys, number>
  >({
    "Unique Ones": 0,
    Baba: 0,
    LED: 0,
  });
  const [timeTravellerMasks, setTimeTravllerMasks] = useState<
    Record<TimeTravllerMasksKey, number>
  >({
    Alpha: 0,
    Beta: 0,
    Theta: 0,
    Delta: 0,
    Epsilon: 0,
    Gamma: 0,
  });

  const [tierPleiades, setTierPleiades] = useState([0, 0, 0]);
  const [specialPleiades, setSpecialPleiades] = useState<number>(0);

  const [goldenTickets, setGoldenTickets] = useState(0);

  // final calculation
  const finalCalcualtion = () => {
    const finalMaskPoints = masksCalculation(
      tierMasks,
      specialMasks,
      timeTravellerMasks,
    );

    const finalPleiadesPoints = pleiadesCalculation(
      tierPleiades,
      specialPleiades,
    );

    if (finalMaskPoints === 412 || finalPleiadesPoints === 412) {
      return;
    }

    const finalgoldenTicketPoints = goldenTicketCalculation(goldenTickets);

    const totalRewardPoints =
      finalMaskPoints + finalPleiadesPoints + finalgoldenTicketPoints;

    const finalRewardPoints =
      totalRewardPoints +
      extraBoostGoldenTickets(totalRewardPoints, goldenTickets);

    setTotalRewardPoints(finalRewardPoints);
    if (!finalRewardPoints) {
      toast.error("No Inputs Found !");
      return;
    }
    setModal("RESULT");
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 overflow-y-scroll [&::-webkit-scrollbar]:hidden">
      {/* Masks */}
      <div className="my-4 mt-2 w-full md:mt-4">
        <div className="mb-4 flex items-center gap-5 text-lg font-extrabold md:text-2xl">
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
          <span className="inline-flex w-full flex-1 justify-center">
            Masks
          </span>
          <div className="flex-2 h-[1px] w-full bg-black text-black" />
        </div>

        {/*tier masks*/}

        <div className="my-6 grid w-full grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex md:space-y-0">
          {tierMasks.map((value, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <label
                htmlFor={`Tier ${index + 1}`}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                Tier {index + 1}
              </label>
              <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
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

        {/* special masks */}
        <div className="my-6 grid w-full grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex md:space-y-0">
          {Object.entries(specialMasks).map(([m, value]) => (
            <div className="flex flex-col gap-2" key={m}>
              <label
                htmlFor={m}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                {m}
              </label>
              <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setSpecialMasks({
                      ...specialMasks,
                      [m as SpecialMaskKeys]: parseInt(e.target.value) || 0,
                    });
                  }}
                  className="w-full bg-transparent px-2 text-center text-2xl outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* time traveller maks */}
        <div className="my-6 grid w-full grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex md:space-y-0">
          {Object.entries(timeTravellerMasks).map(([m, value]) => (
            <div className="flex flex-col gap-2" key={m}>
              <label
                htmlFor={m}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                {m}
              </label>
              <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
                <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                    setTimeTravllerMasks({
                      ...timeTravellerMasks,
                      [m as TimeTravllerMasksKey]:
                        parseInt(e.target.value) || 0,
                    });
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

        {/* tier pleiades */}
        <div className="grid grid-cols-2 items-center justify-between gap-3 space-y-2 pr-1 md:flex">
          {tierPleiades.map((value, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label
                htmlFor={`Tier ${index + 1}`}
                className="px-2 text-center text-lg font-bold tracking-wide text-black"
              >
                Tier {index + 1}
              </label>
              <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
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

        {/* special pleiades  */}
        <div className="my-5 flex flex-col gap-2">
          <label
            htmlFor="Unique Ones"
            className="px-2 text-center text-lg font-bold tracking-wide text-black"
          >
            Unique Ones
          </label>
          <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
            <input
              type="text"
              value={specialPleiades}
              onChange={(e) => {
                setSpecialPleiades(parseInt(e.target.value) || 0);
              }}
              className="w-full bg-transparent px-2 text-center text-2xl outline-none"
            />
          </div>
        </div>
      </div>

      {/* Golden Tickets */}
      <div className="my-4 w-full pr-1">
        <div className="mb-6 flex items-center text-lg font-extrabold md:text-2xl">
          <div className="h-[1px] w-full bg-black text-black" />
          <span className="inline-flex w-full justify-center text-center md:w-[620px]">
            Golden Tickets
          </span>
          <div className="h-[1px] w-full bg-black text-black" />
        </div>
        <div className="w-auto rounded-xl border-[1.5px] border-black p-2 shadow-[2.5px_3px_0_#000]">
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
