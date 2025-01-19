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
  Divider,
  ListItemIcon,
  Select,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import CheckIcon from '@mui/icons-material/Check';
import LockIcon from '@mui/icons-material/Lock';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { useDispatch, useSelector } from 'react-redux';

import {selectModel} from 'src/actions/settingAction';
import { start } from 'nprogress';
// Mock user data
const user = {
  signed: true,
  avatar: '/static/images/avatars/4.jpg',
  paid: true, // Change this to `true` if the user has paid
};

// Define models with categories and options
const models = [
  {
    category: 'Open AI',
    logo: '/static/images/logo/openai.svg',
    options: [
      { id: 'gpt-1', label: 'GPT-4o mini', icons: ['thumbUp'], requiresPayment: false },
      { id: 'gpt-2', label: 'o1-mini', icons: ['thumbUp', 'lock'], requiresPayment: true },
      { id: 'gpt-3', label: 'GPT-4o(paid)', icons: ['thumbUp', 'lock'], requiresPayment: true },
    ],
  },
  {
    category: 'Google',
    logo: '/static/images/logo/gemini.svg',
    options: [
      { id: 'gemini-1', label: 'Gemini 1.5 Flash', icons: [], requiresPayment: false },
      { id: 'gemini-2', label: 'Gemini 1.5 Pro', icons: ['lock'], requiresPayment: true },
      { id: 'gemini-3', label: 'Gemini 2.0 Flash', icons: ['lock'], requiresPayment: true },
    ],
  },
  {
    category: 'Meta',
    logo: '/static/images/logo/meta.svg',
    options: [
      { id: 'llama-1', label: 'Llama 2.1', icons: [], requiresPayment: false },
      { id: 'llama-2', label: 'Llama 3.1', icons: ['lock'], requiresPayment: true },
    ],
  },
];

function HeaderMenu() {
  const dispatch = useDispatch();
  const model = useSelector((state) => state.setting.model);
  const [selectedModel, setSelectedModel] = useState({
    id: 'gpt-1',
    label: 'GPT-4o mini',
  });
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Open and close menu handlers
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Handle model selection
  const handleModelSelect = (model) => {
    if (!model.requiresPayment || user.paid) {
      dispatch(selectModel(model));
      setSelectedModel(model);
      handleClose();
    }
  };

  // Render icons dynamically
  const renderIcons = (icons) => {
    return icons.map((icon, index) => {
      if (icon === 'thumbUp') return <ThumbUpIcon key={index} sx={{ color: '#686868' }} />;
      if (icon === 'lock' && !user.paid) return <LockIcon key={index} sx={{ color: 'black' }} />;
      return null;
    });
  };

  useEffect(() => {
    setSelectedModel(model);
  });

  return (
    <>
      <Button
        sx={{
          display: 'block',
          color: '#265A9E',
          lineHeight: '18px',
          ml: { xs: '0px', md: '20px' },
          padding: { xs: '0px', md: '7px 10px !important' },
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <Box display="flex" alignItems="center" color="black">
          <Typography sx={{ fontSize: 20, fontWeight: 400 }}>{model.label}</Typography>
          <ExpandMoreTwoToneIcon fontSize="small" sx={{ pl: 0.3 }} />
        </Box>
      </Button>

      <Menu
        anchorEl={ref.current}
        sx={{
          mt: 1.5,
          '& .MuiAvatar-root': { width: 32, height: 32, ml: -0.5, mr: 1 },
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
        }}
        open={isOpen}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* Render model categories and options */}
        {models.map((modelGroup) => (
          <Box key={modelGroup.category} sx={{ mb: 1 }}>
            {/* Category header */}
            <Box display="flex" alignItems="center" sx={{ color: 'black', mb: 1 }}>
              <Box
                component="img"
                sx={{ height: 20, width: 20, mr: 1 }}
                alt={modelGroup.category}
                src={modelGroup.logo}
              />
              <Typography fontSize={16}>{modelGroup.category}</Typography>
            </Box>

            {/* Options */}
            {modelGroup.options.map((option) => (
              <MenuItem
                key={option.id}
                sx={{
                  padding: '3px 10px',
                  color: selectedModel.id === option.id ? 'black !important' : 'gray !important',
                  gap: 1,
                  opacity: !user.paid && option.requiresPayment ? 0.5 : 1, // Dim disabled options
                  pointerEvents: !user.paid && option.requiresPayment ? 'none' : 'auto', // Disable interaction for unpaid options
                }}
                onClick={() => handleModelSelect(option)}
              >
                <CheckIcon
                  sx={{
                    opacity: selectedModel.id === option.id ? 1 : 0,
                    color: 'black',
                  }}
                />
                {option.label}
                {renderIcons(option.icons)}
              </MenuItem>
            ))}
          </Box>
        ))}
      </Menu>
    </>
  );
}

export default HeaderMenu;