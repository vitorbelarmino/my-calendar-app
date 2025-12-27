import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: ConfirmDialogProps) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 " onClick={handleBackdropClick}>
      <div
        className="fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-white p-6 shadow-lg duration-200 sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <div className="flex items-start gap-4">
            <div className="shrink-0">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="text-sm text-gray-500 mt-1">{message}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button onClick={onClose} variant="secondary" className="mt-2 sm:mt-0">
            {cancelText}
          </Button>
          <Button onClick={onConfirm} variant="danger">
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};
