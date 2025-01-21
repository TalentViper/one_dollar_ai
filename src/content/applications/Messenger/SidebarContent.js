import React, { useState } from 'react';
import {
  Box,
  List,
  Button,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  TextField,

  InputAdornment,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';

import UserBox from 'src/components/UserBox';
import Language from 'src/components/Language'

import Auth from './Auth';

import {
  increaseChatId,
  setActiveChatId,
  deleteChat
} from 'src/actions/chatAction';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const RootWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        padding: ${theme.spacing(2.5)};
        color: black;
        border-top: solid 1px ${theme.colors.alpha.black[50]};
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        justify-content : space-between;
        height: 100vh;
        ${theme.breakpoints.up('lg')} {
            height: calc(100vh - 90px);
        }
  `
);

const ListItemWrapper = styled(ListItemButton)(
  ({ theme }) => `
        &.MuiButtonBase-root {
            margin: ${theme.spacing(1)} 0;
        }

        &.Mui-selected {
            background: ${theme.colors.alpha.white[50]};
        }
  `
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background:rgb(172, 172, 172);
    border-radius:10px;
    color : black;

    .MuiInputBase-input {
        border-radius:0 10px 10px 0 ;
        color:black;
        font-size: ${theme.typography.pxToRem(17)};
        background:rgb(172, 172, 172);
        color : black;
        padding-top:5px;
        padding-bottom:5px;
    }
`
);

function SidebarContent() {

  const dispatch = useDispatch();
  const chatHistory = useSelector((state) => state.chat.chatHistory);
  const activeChatId = useSelector((state) => state.chat.activeChatId);
  const { t, i18n } = useTranslation();

  const [searchValue, setSearchValue] = useState('');
  const [openSearchResults, setOpenSearchResults] = useState(false);


  const handleNewChat = () => {
    dispatch(increaseChatId());
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const onSelectChat = (chatId) => {
    const data = { chatId: chatId };
    dispatch(setActiveChatId(data));
  };

  const groupChatsByDay = (chats) => {
    const grouped = chats.reduce((groups, chat) => {
      const date = new Date(chat.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let dateKey;

      if (date.toDateString() === today.toDateString()) {
        dateKey = 'Today';
      } else if (date.toDateString() === yesterday.toDateString()) {
        dateKey = 'Yesterday';
      } else {
        dateKey = date.toLocaleDateString();
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(chat);
      return groups;
    }, {});

    // Sort dates in reverse chronological order
    const sortedDates = Object.entries(grouped).sort((a, b) => {
      if (a[0] === 'Today') return -1;
      if (b[0] === 'Today') return 1;
      if (a[0] === 'Yesterday') return -1;
      if (b[0] === 'Yesterday') return 1;

      const dateA = new Date(a[0]);
      const dateB = new Date(b[0]);
      return dateB - dateA;
    });

    return Object.fromEntries(sortedDates);
  };

  const groupedChats = groupChatsByDay(chatHistory);

  const onDeleteChat = (chat_id) => {
    const answer = window.confirm('Are you sure you want to delete this chat?');

    if (answer) {
      const data = { chat_id };
      dispatch(deleteChat(data));
    }
  };

  return (
    <RootWrapper>
      <Box 
        sx={{ 
          width: '100%', 
          display:'flex',
          overflow:'hidden',
          flexDirection:'column',
          }}>
        <Box>
          <UserBox/>
          <Language />
        </Box>
        <Button
          sx={{ textAlign: 'center', background: 'white', width: '100%', mb: 1 }}
          startIcon={<AddIcon />}
          onClick={handleNewChat}
        >
          {t('new_chat')}
        </Button>
        <SearchInputWrapper
          value={searchValue}
          // autoFocus
          onChange={handleSearchChange}
          sx={{color : 'black'}}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchTwoToneIcon sx={{color : "black"}}  />
              </InputAdornment>
            )
          }}
          placeholder={t('search')}
          fullWidth
        />
        <Box mt={2} 
          sx={{
            overflowY:'scroll',
            '&::-webkit-scrollbar': {
              height: '0px', // Hides the horizontal scrollbar
            },
          }}
        >
          {Object.entries(groupedChats).map(([date, chats]) => (
            <Box key={date}>
              <Typography
                variant="subtitle2"
                sx={{
                  px: 2,
                  backgroundColor: (theme) => theme.colors.alpha.black[5],
                  color: 'black',
                  fontWeight: 800
                }}
              >
                {date}
              </Typography>
              <List disablePadding component="div">
                {chats.map((chat) => (
                  <ListItemWrapper
                    key={chat.id}
                    selected={chat.id === activeChatId}
                    onClick={() => onSelectChat(chat.id)}
                  >
                    <ListItemText
                      sx={{ mr: 1 }}
                      primaryTypographyProps={{
                        color: 'textPrimary',
                        variant: 'h5',
                        noWrap: true
                      }}
                      secondaryTypographyProps={{
                        color: 'black',
                        noWrap: true
                      }}
                      secondary={`${new Date(
                        chat.date
                      ).toLocaleTimeString()} - Chat ${chat.id}`}
                    />
                    <DeleteIcon onClick={() => onDeleteChat(chat.id)} />
                  </ListItemWrapper>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      </Box>
      
      <Box mt={2} sx={{ width: '100%' }}>
        <Auth />
      </Box>
    </RootWrapper>
  );
}

export default SidebarContent;
