import { useModalStore } from "~/store";
import ResultModal from "./result-modal";

const Modals = {
  RESULT: ResultModal,
};

const Modal = () => {
  const {
    modal: { state },
  } = useModalStore();

  if (state) {
    const Child = Modals[state];

    return <Child />;
  }
};

export default Modal;
