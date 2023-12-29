import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {
  GridActionsCellItem,
  GridRowId,
  GridColumns,
} from '@mui/x-data-grid';

export default function AlertDialog(messageContent,acceptHandler,denyHandler,icon) {
  const [open, setOpen] = React.useState(false);
  const handleAccept = (accept) => {
    setOpen(true);
    accept();
  };

  const handleClose = (deny) => {
    setOpen(false);
    deny();
  };

  return (
    <span>
    <GridActionsCellItem icon={icon} onClick={ () => {
      setOpen(true);
    }}/>
    
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {icon}{messageContent.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {messageContent.body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={() => handleClose(denyHandler)}>{messageContent.deny}</Button>
            <Button onClick={() => handleAccept(acceptHandler)} autoFocus>{messageContent.accept}</Button>
        </DialogActions>
      </Dialog>
    
    </span>
  );
}
