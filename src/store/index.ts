import {create} from "zustand"

export type ModalState =
    | "RESULT"
    | null;

interface ModalStore {
    totalRewardPoints : number
    setTotalRewardPoints : (value:number) => void;
    modal:{state:ModalState};
    setModal:(m_state:ModalState) => void;
}

export const useModalStore = create<ModalStore>()((set)=>({
    totalRewardPoints:0,
    setTotalRewardPoints:(value:number) => set(()=>({totalRewardPoints:value})),
    modal:{state:null},
    setModal : (m_state:ModalState) => set(()=>({modal:{state:m_state}}))
}))