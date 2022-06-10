import { ReactNode } from "react";
import { Dialog, DialogTitle, styled } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Close = styled(CloseIcon)`
  position: absolute;
  top: 24px;
  right: 24px;

  :hover {
    cursor: pointer;
  }
`

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
