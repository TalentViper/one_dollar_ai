import { Box, Avatar, Button, Typography, Card, styled, Divider } from '@mui/material';
import SmsIcon from '@mui/icons-material/Sms';
// import ChatIcon from '@mui/icons-material/Chat';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// import {
//   formatDistance,
//   format,
//   subDays,
//   subHours,
//   subMinutes
// } from 'date-fns';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

// const DividerWrapper = styled(Divider)(
//   ({ theme }) => `
//       .MuiDivider-wrapper {
//         border-radius: ${theme.general.borderRadiusSm};
//         text-transform: none;
//         background: ${theme.palette.background.default};
//         font-size: ${theme.typography.pxToRem(13)};
//         color: ${theme.colors.alpha.black[50]};
//       }
// `
// );

const CardWrapperPrimary = styled(Card)(
  ({ theme }) => `
      background: #265A9E;
      color: white;
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-right-radius: ${theme.general.borderRadius};
      max-width: 100%;
      margin-bottom: 15px;
      margin-left:54px
`
);

const CardWrapperSecondary = styled(Card)(
  ({ theme }) => `
      background: white;
      color: #667085;
      padding: ${theme.spacing(2)};
      border-radius: ${theme.general.borderRadiusXl};
      border-top-left-radius: ${theme.general.borderRadius};
      max-width: 100%;
      margin-bottom: 15px;
      margin-right:54px

`
);

function ChatContent() {
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };

  // const [loading, setLoading] = useState(false);

  const messages = useSelector((state) => state.chat.messages);
  const messagesEndRef = useRef(null); // Ref to the chat container

  // Function to scroll to the bottom of the messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  return (
    <>
      <Box sx={{
        overflowY: 'auto', px: {
          xs: 1,
          md: 10
        }
      }}>
        {/* <DividerWrapper>
        {format(subDays(new Date(), 3), 'MMMM dd yyyy')}
      </DividerWrapper> */}
        {messages.map((message, index) =>
          message.sender === 'bot' ? (
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              pt={3}
              key={index}
            >
              {/* <Avatar
          variant="rounded"
          sx={{
            width: 50,
            height: 50
          }}
          alt="Zain Baptista"
          src="/static/images/avatars/2.jpg"
        /> */}
              <SmsIcon style={{ color: '#265A9E' }} fontSize="large" />
              <Box
                display="flex"
                alignItems="flex-start"
                flexDirection="column"
                justifyContent="flex-start"
                ml={2}
              >
                <Typography
                  variant="subtitle1"
                  color="text.third"
                  sx={{
                    pt: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ScheduleTwoToneIcon
                    sx={{
                      mr: 0.5,
                      color: 'text.third'
                    }}
                    fontSize="small"
                  />
                  {/* {formatDistance(subHours(new Date(), 115), new Date(), {
                  addSuffix: true
                })} */}
                  LiveChat {new Date().getHours()} : {new Date().getMinutes()}
                </Typography>
                <CardWrapperSecondary>
                  <ReactMarkdown>{message.text}</ReactMarkdown>
                </CardWrapperSecondary>
              </Box>
            </Box>
          ) : (
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-end"
              pt={3}
              key={index}
            >
              <Box
                display="flex"
                alignItems="flex-end"
                flexDirection="column"
                justifyContent="flex-end"
                mr={2}
              >
                <Typography
                  variant="subtitle1"
                  color="text.third"
                  sx={{
                    pt: 1,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <ScheduleTwoToneIcon
                    sx={{
                      mr: 0.5
                    }}
                    fontSize="small"
                  />
                  {/* {formatDistance(subHours(new Date(), 125), new Date(), {
                  addSuffix: true
                })} */}
                  LiveChat {new Date().getHours()} : {new Date().getMinutes()}
                </Typography>
                <CardWrapperPrimary>
                  {message.file && (
                    <Box sx={{
                      position: 'relative',
                      float: 'right',
                      p: '7px',
                      border: '1px solid white',
                      maxWidth: 250,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: 'white',
                    }}>
                      <Box sx={{ width: 30, height: 30 }}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M17.8033 10.4665L9.94233 18.0854C8.75873 19.2326 8.75873 21.0935 9.94233 22.2407V22.2407C11.1259 23.3878 13.046 23.3878 14.2296 22.2407L24.5925 12.1969C26.7634 10.0929 26.7634 6.68204 24.5925 4.57802V4.57802C22.4216 2.47399 18.9024 2.47399 16.7315 4.57802L6.36862 14.6218C3.21046 17.6827 3.21046 22.6434 6.36862 25.7043V25.7043C9.52678 28.7652 14.6452 28.7652 17.8033 25.7043L24.0924 19.6089" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Box>
                      <span>{message.file}</span>
                    </Box>
                  )}
                  <ReactMarkdown >{message.text}</ReactMarkdown>
                </CardWrapperPrimary>
              </Box>
              {/* <Avatar
              variant="rounded"
              sx={{
                width: 50,
                height: 50
              }}
              alt={user.name}
              src={user.avatar}
            /> */}
              <AccountCircleIcon fontSize="large" style={{ color: '#265A9E' }} />
            </Box>
          )
        )}
        <span ref={messagesEndRef} />
      </Box>
    </>
  );
}

export default ChatContent;
