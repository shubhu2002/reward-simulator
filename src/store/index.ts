import { create } from "zustand";

export type ModalState = "RESULT" | null;

interface ModalStore {
  totalRewardPoints: number;
  modal: { state: ModalState };
  error: boolean;
  setTotalRewardPoints: (value: number) => void;
  setModal: (m_state: ModalState) => void;
  setError: (value: boolean) => void;
}

export const useModalStore = create<ModalStore>()((set) => ({
  totalRewardPoints: 0,
  modal: { state: null },
  error: false,
  setTotalRewardPoints: (value: number) =>
    set(() => ({ totalRewardPoints: value })),
  setModal: (m_state: ModalState) => set(() => ({ modal: { state: m_state } })),
  setError: (value: boolean) => set(() => ({ error: value })),
}));
