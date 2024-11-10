import { RxCross2 } from "react-icons/rx";
import { useModalStore } from "~/store";

const CloseButton = () => {
  const { setModal } = useModalStore();

  return (
    <div
      className={`group flex cursor-pointer items-center justify-center rounded-full border-2 border-red-600 bg-white p-1 transition-all duration-300 hover:bg-red-600`}
      onClick={() => setModal(null)}
    >
      <div
        className={`z-[3] rounded-full bg-primary p-3 transition-all duration-300 group-hover:translate-x-[80px] group-hover:rotate-[360deg] group-hover:bg-white group-hover:text-black`}
      >
        <RxCross2 className="stroke-[1.5px]" />
      </div>
      <div
        className={`font-inter px-4 font-medium tracking-wider transition-all duration-300 group-hover:-translate-x-[40px]`}
      >
        Close
      </div>
    </div>
  );
};

export default CloseButton;
