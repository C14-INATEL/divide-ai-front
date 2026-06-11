import { useEffect, useRef } from "react";
import { Trash2 } from "lucide-react";

interface DeleteGroupDialogProps {
  open: boolean;
  onClose: () => void;
  groupName: string;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function DeleteGroupDialog({
  open,
  onClose,
  groupName,
  isDeleting,
  onConfirm,
}: DeleteGroupDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    else dialogRef.current?.close();
  }, [open]);

  return (
    <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle" onClose={onClose}>
      <div className="modal-box max-w-sm rounded-2xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center shrink-0">
            <Trash2 size={18} className="text-error" />
          </div>
          <div>
            <h3 className="font-semibold text-base-content">Excluir grupo</h3>
            <p className="text-sm text-base-content/50 mt-1">
              Tem certeza que deseja excluir{" "}
              <span className="font-medium text-base-content">{groupName}</span>? Essa ação não
              pode ser desfeita.
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 mt-6">
          <button onClick={onClose} className="btn btn-ghost btn-sm rounded-xl">
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="btn btn-error btn-sm rounded-xl gap-1.5"
          >
            {isDeleting && <span className="loading loading-spinner loading-xs" />}
            Excluir grupo
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose} />
      </form>
    </dialog>
  );
}
