import { create } from "zustand";

export type ModalPropsMap = {
  "create-group": { onSuccess?: () => void };
  "create-debt": {
    debt?: import("../../data/services/debt-service/debt.service").Debt;
    groups?: import("../../data/services/group-service/group.service").Group[];
    selectedGroupId?: string;
    currentUserId?: string;
    currentUserName?: string;
    onSuccess?: (groupId: string) => void;
  };
  "edit-group": { groupId: string; name: string; description?: string; onSuccess?: () => void };
  "add-member": { groupId: string; onSuccess?: () => void };
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
