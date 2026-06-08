import { CreateGroupModal } from "../create-group-modal";
import { CreateDebtModal } from "../create-debt-modal";
import { useModalStore, type ModalName, type ModalPropsMap } from "../../store/modal.store";

type ModalBaseProps = { open: boolean; onClose: () => void };

type ModalRegistry = {
  [K in ModalName]: React.ComponentType<ModalPropsMap[K] & ModalBaseProps>;
};

type AnyModalComponent = React.ComponentType<
  ModalPropsMap[ModalName] & ModalBaseProps
>;

const MODALS: ModalRegistry = {
  "create-group": CreateGroupModal,
  "create-debt": CreateDebtModal,
};

export function ModalContainer() {
  const { activeModal, modalProps, closeModal } = useModalStore();

  return (
    <>
      {(Object.entries(MODALS) as [ModalName, AnyModalComponent][]).map(
        ([name, Modal]) => (
          <Modal
            key={name}
            {...(activeModal === name ? modalProps : {})}
            open={activeModal === name}
            onClose={closeModal}
          />
        ),
      )}
    </>
  );
}
