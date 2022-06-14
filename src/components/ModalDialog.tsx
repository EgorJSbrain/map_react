import { ReactNode } from "react";
import { Dialog, DialogTitle } from "@mui/material";
import { Close } from "./ModalDialog.styled";

type ModalDialogProps = {
  children: ReactNode;
  title: string;
  open: boolean;
  onClose: () => void;
}
export const ModalDialog = ({title, children, open, onClose}: ModalDialogProps) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <Close onClick={onClose} />
    {children}
  </Dialog>
);
