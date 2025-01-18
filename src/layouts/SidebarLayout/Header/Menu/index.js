import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  Button,
  Avatar,
  Divider ,
  ListItemIcon,
  Select
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


const user = {
  signed: true,
  avatar: '/static/images/avatars/4.jpg'
};

function HeaderMenu() {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    // setLang(event.target.value);
  };

  return (
    <>
      <Button 
        sx={{
          display:'block',
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
          }}
          ref={ref}
          // endIcon={<KeyboardArrowDownIcon/>}
          onClick={handleOpen}
        >
         <Box
          display="flex"
          alignItems="center"
          color="black"
        // marginBottom={2}
        >
          <span style={{ fontSize: 20, fontWeight:'400' }}>ChatGPT 4o</span>
          <Box display="flex" alignItems="center" pl={0.3}>
            <ExpandMoreTwoToneIcon fontSize="small" />
          </Box>
        </Box>
      </Button>
      <Menu
        anchorEl={ref.current}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="#">
          Gemini
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="#">
          Liama
        </MenuItem>
        {/* <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards"> */}
        <MenuItem sx={{ px: 3 }} component={NavLink} to="#">
          Baidu
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={ref.current}
        sx={{marginTop:'15px'}}
        id="account-menu"
        open={isOpen}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
