
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
  InputBase,
  Paper,
  ListItemText,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


function InviteButton() {
  const { t, i18n } = useTranslation();
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);


  const [inviteLink, setInviteLink] = useState('www.onedollarai.com/invite/');
  const [inviteCode, setInviteCode] = useState('');

  const handleOpen = () => {
    setOpen(true);
    const generateInviteCode = () => {
      let code = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return code;
    };
    const code = generateInviteCode();
    setInviteCode(code);
    setInviteLink('www.onedollarai.com/invite/' + code);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink);
    alert('Invite link copied to clipboard!');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(inviteCode);
    alert('Invite code copied to clipboard!');
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
          Invite a friend<br/>
        <span style={{color:'#378DFD'}}>60% off</span>
      </Button>

      <Dialog
        maxWidth='xs'
        sx={{
          borderRadius: '0px !important',
        }}
        onClose={handleClose} open={isOpen}>
        <DialogContent
          sx={{
            background: 'white',
            padding: 3
          }}>
          <DialogContentText id="alert-dialog-description" sx={{ color: 'black' }}>
            <Typography color="black" variant="subtitle1" mb={1}>
            {t('inviteDscription')}
            </Typography>
          </DialogContentText>
          <Box mb={2}>
            <Typography fontSize={14} fontWeight={400} color="#83848C" mb={1} >{t('copyLink')}</Typography>
            <Paper
              component="form"
              sx={{p: '0px 4px', color:'black', display: 'flex', alignItems: 'center', borderColor:"black !important", borderRadius:0}}
            > 
              <InputBase
                sx={{ ml: 1, flex: 1, color:'black'}}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                type="text" value={inviteLink} readOnly
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px', color: '#000000'}} aria-label="directions"
                onClick={handleCopyLink}
              >
                <FileUploadOutlinedIcon />
              </IconButton>
            </Paper>
          </Box>
          <Box>
            <Typography fontSize={14} fontWeight={400} color="#83848C" mb={1} >{t('shareInviteCode')}</Typography>
            <Paper
              component="div"
              sx={{p: '0px 4px', color:'black', display: 'flex', alignItems: 'center', borderColor:"black !important", borderRadius:0}}
            > 
              <InputBase
                sx={{ ml: 1, flex: 1, color:'black'}}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                type="text" value={inviteCode} readOnly
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" sx={{ p: '10px', color: '#000000'}} aria-label="directions"
                onClick={handleCopyCode}
              >
                <FileUploadOutlinedIcon />
              </IconButton>
            </Paper>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default InviteButton;
