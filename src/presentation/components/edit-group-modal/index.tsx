import { CreateGroupModal } from "../create-group-modal";

interface EditGroupModalProps {
  open: boolean;
  onClose: () => void;
  groupId: string;
  name: string;
  description?: string;
  onSuccess?: () => void;
}

export function EditGroupModal({
  open,
  onClose,
  groupId,
  name,
  description,
  onSuccess,
}: EditGroupModalProps) {
  return (
    <CreateGroupModal
      open={open}
      onClose={onClose}
      onSuccess={onSuccess}
      editMode
      initialData={{ id: groupId, name, description }}
    />
  );
}
