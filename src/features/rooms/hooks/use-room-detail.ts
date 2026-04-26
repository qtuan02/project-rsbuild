import { useState } from "react";

import { getRooms } from "../data/room.repository";

interface UseRoomDetailOptions {
  roomId: string;
  onBack?: () => void;
}

export const useRoomDetail = ({ roomId, onBack }: UseRoomDetailOptions) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const room = getRooms().find((item) => item.id === roomId);

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsDeleting(false);
    setDeleteDialogOpen(false);
    onBack?.();
  };

  return {
    room,
    deleteDialogOpen,
    isDeleting,
    setDeleteDialogOpen,
    handleDelete,
  };
};
