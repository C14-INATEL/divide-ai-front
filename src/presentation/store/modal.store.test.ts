import { vi } from "vitest";
import { useModalStore } from "./modal.store";

describe("useModalStore", () => {
  beforeEach(() => {
    useModalStore.setState({ activeModal: null, modalProps: null });
  });

  it("inicia sem modal ativo", () => {
    const { activeModal, modalProps } = useModalStore.getState();
    expect(activeModal).toBeNull();
    expect(modalProps).toBeNull();
  });

  describe("openModal", () => {
    it("ativa o modal pelo nome", () => {
      useModalStore.getState().openModal("create-group");
      expect(useModalStore.getState().activeModal).toBe("create-group");
    });

    it("armazena as props do modal", () => {
      const onSuccess = vi.fn();
      useModalStore.getState().openModal("create-group", { onSuccess });
      expect(useModalStore.getState().modalProps).toMatchObject({ onSuccess });
    });

    it("armazena props do edit-group com campos obrigatórios", () => {
      const props = { groupId: "g-1", name: "Meu Grupo", description: "Desc" };
      useModalStore.getState().openModal("edit-group", props);
      expect(useModalStore.getState().activeModal).toBe("edit-group");
      expect(useModalStore.getState().modalProps).toMatchObject(props);
    });

    it("armazena props do add-member", () => {
      useModalStore.getState().openModal("add-member", { groupId: "g-2" });
      expect(useModalStore.getState().activeModal).toBe("add-member");
      expect(useModalStore.getState().modalProps).toMatchObject({ groupId: "g-2" });
    });

    it("define modalProps como null quando sem props", () => {
      useModalStore.getState().openModal("create-group");
      expect(useModalStore.getState().modalProps).toBeNull();
    });
  });

  describe("closeModal", () => {
    it("limpa activeModal e modalProps", () => {
      useModalStore.getState().openModal("create-group", { onSuccess: vi.fn() });
      useModalStore.getState().closeModal();

      expect(useModalStore.getState().activeModal).toBeNull();
      expect(useModalStore.getState().modalProps).toBeNull();
    });
  });

  it("troca entre modais corretamente", () => {
    useModalStore.getState().openModal("create-group");
    expect(useModalStore.getState().activeModal).toBe("create-group");

    useModalStore.getState().openModal("add-member", { groupId: "g-3" });
    expect(useModalStore.getState().activeModal).toBe("add-member");
  });
});
