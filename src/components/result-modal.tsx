import { motion } from "framer-motion";

import { useModalStore } from "~/store";
import CloseButton from "./close-button";

const ResultModal = () => {
  const { totalRewardPoints } = useModalStore();
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-screen w-full flex-col items-center justify-center gap-6 bg-[#000]/60 backdrop-blur">
      <CloseButton />
      <motion.div
        className="bg-primary flex h-auto w-[90vw] max-w-[450px] flex-col justify-center gap-6 rounded-lg border-[3px] p-6 text-center text-lg font-extrabold tracking-wider shadow-[6px_6px_0_#101010]"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="mb-[10px] text-center text-[7vw] font-extrabold md:text-4xl">
          Total Reward Points
        </div>

        <h1 className="golden-text text-3xl md:text-4xl">
          {totalRewardPoints.toFixed(2)}
        </h1>
      </motion.div>
    </div>
  );
};
export default ResultModal;
