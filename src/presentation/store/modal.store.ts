import { create } from "zustand";

export type ModalPropsMap = {
  "create-group": { onSuccess?: () => void };
};

export type ModalName = keyof ModalPropsMap;

interface ModalStore {
  activeModal: ModalName | null;
  modalProps: ModalPropsMap[ModalName] | null;
  openModal: <T extends ModalName>(name: T, props?: ModalPropsMap[T]) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  modalProps: null,
  openModal: (name, props = {}) => set({ activeModal: name, modalProps: props }),
  closeModal: () => set({ activeModal: null, modalProps: null }),
}));
