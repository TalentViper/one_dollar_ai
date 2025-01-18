
import { forwardRef, useRef, useState } from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Hidden,

  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';


function TopUp() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const initialValues = {
    email: '',
  };

  const [openSearchResults, setOpenSearchResults] = useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (values) => {
    console.log('Form submitted successfully:', values);
    // You can handle form submission here (e.g., send data to an API)
  };

  const handleLoginSuccess = (response) => {
    console.log("Login successful:", response);
    // You can use response.credential to get the Google access token and further process
  };

  const handleLoginFailure = (error) => {
    console.log("Login failed:", error);
  };


  return (
    <>
      <Button 
        sx={{
          display:'block',
          width: '130px',
          color:'#265A9E',
          lineHeight:'18px',
          ml: {
            xs: '0px',
            md: '20px',
          },
          padding: {
            xs: '0px 0px 0px 0px !important',
            md: '7px 10px !important',
          },
          borderRadius: '20px',
          border: {
            xs: 'none',
            md: '2px solid #378DFD',
          }
          }}
          ref={ref}
          onClick={handleOpen}
        >
        <span style={{color:'#EA0004'}}>$0.10</span> left <br/> Please Top up
      </Button>

      <Dialog
        maxWidth='xs'
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={isOpen}>
      </Dialog>
    </>
  );
}

export default TopUp;
