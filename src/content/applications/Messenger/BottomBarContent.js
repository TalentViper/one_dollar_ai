import {
  Avatar,
  Tooltip,
  IconButton,
  Box,
  Button,
  styled,
  InputBase,
  useTheme,
  Menu,
  MenuItem,
  Divider,
  Input
} from '@mui/material';
import { useState, useEffect } from 'react';
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CancelIcon from '@mui/icons-material/Cancel';
import { useDispatch, useSelector } from 'react-redux';
import EmojiPicker from "emoji-picker-react";
import ScreenCapture from 'src/ScreenCapture';
import './style.css';
import { setMessages, sendMessage } from 'src/actions/chatAction';

const MessageInputWrapper = styled(InputBase)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(18),
  padding: theme.spacing(1),
  width: '100%',
  maxHeight: theme.typography.pxToRem(162),
  lineHeight: 1
}));

const HiddenInput = styled('input')({ display: 'none' });

function BottomBarContent({ file: propFile }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [input, setInput] = useState('');
  const [screenCapture, setScreenCapture] = useState(null);

  useEffect(() => {
    if (propFile) {
      setFile(propFile);
      const fileUrl = URL.createObjectURL(propFile);

      if(propFile.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onloadend = () => {
          setScreenCapture(reader.result)
        };
        reader.readAsDataURL(propFile);}
      else{
        setFilePreview(fileUrl);
      }
    }
  }, [propFile]);

  const sendOneMessage = () => {
    if ((!input.trim() && !filePreview) && (!input.trim() && !screenCapture)) return;

    const newMessage = {
      sender: 'user',
      text: input,
      file: filePreview ? file.name : null,
      base64Encoded : screenCapture ? screenCapture : null,
    };

    const formattedMessages = [...messages, newMessage].map(({ sender, text }) => ({
      role: sender === 'bot' ? 'assistant' : 'user',
      content: text
    }));
    console.log("sendMessage", file);
    dispatch(setMessages({ message: newMessage }));

    const formData = new FormData();
    if(file != null){
      formData.append("file", file); // Attach the file
    }
    formData.append('model', "gpt-4o-mini");
    formData.append("message", input); // Add the message
    formData.append("formattedMessages", JSON.stringify(formattedMessages));
    // dispatch(sendMessage({ message: input, file : file, formattedMessages }));
    dispatch(sendMessage(formData));
    setInput('');
    setFilePreview(null);
    setScreenCapture(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendOneMessage();
    }
  };

  const handleEmojiClick = (emojiObject) => {
    setInput((prev) => prev + emojiObject.emoji);
    setAnchorEl(null);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if(selectedFile.type.startsWith('image/')){
        const reader = new FileReader();
        reader.onloadend = () => {
          setScreenCapture(reader.result)
        };
        reader.readAsDataURL(selectedFile);
      }else{

        const fileUrl = URL.createObjectURL(selectedFile);
        setFilePreview(fileUrl);
      }
    }
    setAnchorE2(null);
  };

  const handleScreenCapture = (capturedImage) => {
    if (capturedImage !== "data:,") {
      setScreenCapture(capturedImage);
    }
  };

  const Preview = ({ type, children, onDelete }) => (
    <Box
      sx={{
        position: 'relative',
        p: type == "img" ? '3px' : '7px',
        maxWidth: type == "img" ? 50 : 250,
        height: 50,
        border: '1px solid gray',
        borderRadius: 1,
        display: 'flex',
        flex: 'none',
        alignItems: 'center',
        color: 'black',
        gap: 0.5,
        mx: 1
      }}
    >
      {children}
      <IconButton
        sx={{ color: 'black', position: 'absolute', right: -17, top: -17, fontSize: 20 }}
        onClick={onDelete}
      >
        <CancelIcon />
      </IconButton>
    </Box>
  );

  return (
    <ScreenCapture onEndCapture={handleScreenCapture}>
      {({ onStartCapture }) => (
        <Box
          sx={{
            background: 'white',
            display: 'flex',
            alignItems: 'flex-end',
            px: 2,
            py: 1
          }}
        >
          <Box flexGrow={1} display="flex" flexDirection="column" >
            {filePreview && (
              <Preview type="file" onDelete={() => setFilePreview(null)}>
                <div style={{ width: 30 }}>
                  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.8033 10.4665L9.94233 18.0854C8.75873 19.2326 8.75873 21.0935 9.94233 22.2407V22.2407C11.1259 23.3878 13.046 23.3878 14.2296 22.2407L24.5925 12.1969C26.7634 10.0929 26.7634 6.68204 24.5925 4.57802V4.57802C22.4216 2.47399 18.9024 2.47399 16.7315 4.57802L6.36862 14.6218C3.21046 17.6827 3.21046 22.6434 6.36862 25.7043V25.7043C9.52678 28.7652 14.6452 28.7652 17.8033 25.7043L24.0924 19.6089" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span style={{ overflow: 'hidden', textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{file.name}</span>
              </Preview>
            )}
            {screenCapture && (
              <Preview type="img" onDelete={() => setScreenCapture(null)}>
                <Box component="img" src={screenCapture} alt="Screen Capture" sx={{ borderRadius: 1, width: '100%', height: '100%' }} />
              </Preview>
            )}
            <MessageInputWrapper
              autoFocus
              placeholder="Write a message"
              multiline
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              maxRows={9}
              sx={{
                fontSize: 15,
                color: '#667085',
                '& .MuiInputBase-input': {
                  maxHeight: '162px',
                  overflowY: 'auto'
                }
              }}
            />
          </Box>
          <Box display="flex" gap={1} alignItems="center">
            <Tooltip arrow="top" title="Choose an emoji">
              <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_28_1551)">
                    <path d="M15 0C6.72896 0 0 6.72896 0 15C0 23.271 6.72896 30 15 30C23.271 30 30 23.271 30 15C30 6.72896 23.271 0 15 0ZM15 28.125C7.76285 28.125 1.875 22.2371 1.875 15C1.875 7.76285 7.76285 1.875 15 1.875C22.2371 1.875 28.125 7.76285 28.125 15C28.125 22.2371 22.2371 28.125 15 28.125ZM23.0595 19.1719C22.0814 20.3634 20.8512 21.3232 19.4576 21.9822C18.0639 22.6412 16.5415 22.983 14.9999 22.983C13.4584 22.983 11.9359 22.6412 10.5423 21.9822C9.1487 21.3232 7.91852 20.3634 6.94037 19.1719C6.86173 19.0768 6.80263 18.9672 6.76645 18.8492C6.73027 18.7313 6.71772 18.6074 6.72952 18.4846C6.74133 18.3618 6.77725 18.2425 6.83524 18.1336C6.89323 18.0247 6.97213 17.9284 7.06744 17.85C7.16274 17.7717 7.27257 17.7129 7.39062 17.6771C7.50868 17.6413 7.63264 17.6292 7.7554 17.6414C7.87816 17.6536 7.99731 17.6899 8.10601 17.7482C8.21472 17.8065 8.31084 17.8858 8.38887 17.9813C9.19113 18.9588 10.2002 19.7463 11.3433 20.2869C12.4865 20.8276 13.7353 21.108 14.9999 21.108C16.2645 21.108 17.5133 20.8276 18.6565 20.2869C19.7997 19.7463 20.8087 18.9588 21.611 17.9813C21.7691 17.7901 21.9966 17.6694 22.2436 17.6457C22.4906 17.622 22.7369 17.6971 22.9286 17.8546C23.1203 18.0122 23.2417 18.2393 23.2662 18.4862C23.2907 18.7331 23.2164 18.9797 23.0595 19.1719H23.0595ZM17.1759 12.4075V11.748C17.1759 10.3672 18.4639 9.24387 20.047 9.24387C21.6301 9.24387 22.9181 10.3672 22.9181 11.748V12.4078C22.9181 12.6565 22.8194 12.8949 22.6435 13.0707C22.4677 13.2465 22.2293 13.3453 21.9806 13.3453C21.732 13.3453 21.4935 13.2465 21.3177 13.0707C21.1419 12.8949 21.0431 12.6565 21.0431 12.4078V11.748C21.0431 11.451 20.6171 11.1189 20.047 11.1189C19.477 11.1189 19.0509 11.451 19.0509 11.748V12.4078C19.0509 12.6565 18.9522 12.8949 18.7764 13.0707C18.6005 13.2465 18.3621 13.3453 18.1134 13.3453C17.8648 13.3453 17.6263 13.2465 17.4505 13.0707C17.2747 12.8949 17.1759 12.6565 17.1759 12.4078V12.4075ZM7.08158 12.4075V11.748C7.08158 10.3672 8.36965 9.24387 9.95268 9.24387C11.5357 9.24387 12.8238 10.3672 12.8238 11.748V12.4078C12.8238 12.6565 12.725 12.8949 12.5492 13.0707C12.3734 13.2465 12.1349 13.3453 11.8863 13.3453C11.6376 13.3453 11.3992 13.2465 11.2234 13.0707C11.0475 12.8949 10.9488 12.6565 10.9488 12.4078V11.748C10.9488 11.451 10.5228 11.1189 9.95268 11.1189C9.38256 11.1189 8.95658 11.451 8.95658 11.748V12.4078C8.95658 12.6565 8.85781 12.8949 8.682 13.0707C8.50618 13.2465 8.26772 13.3453 8.01908 13.3453C7.77044 13.3453 7.53198 13.2465 7.35617 13.0707C7.18035 12.8949 7.08158 12.6565 7.08158 12.4078V12.4075Z" fill="#667085" />
                  </g>
                  <defs>
                    <clipPath id="clip0_28_1551">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </IconButton>
            </Tooltip>
            <Tooltip arrow="top" title="Attach a file">
              <IconButton onClick={(e) => setAnchorE2(e.currentTarget)}>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.8033 10.4665L9.94233 18.0854C8.75873 19.2326 8.75873 21.0935 9.94233 22.2407V22.2407C11.1259 23.3878 13.046 23.3878 14.2296 22.2407L24.5925 12.1969C26.7634 10.0929 26.7634 6.68204 24.5925 4.57802V4.57802C22.4216 2.47399 18.9024 2.47399 16.7315 4.57802L6.36862 14.6218C3.21046 17.6827 3.21046 22.6434 6.36862 25.7043V25.7043C9.52678 28.7652 14.6452 28.7652 17.8033 25.7043L24.0924 19.6089" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </IconButton>
            </Tooltip>
            <IconButton onClick={sendOneMessage}>
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M27.6263 13.2025L3.44125 1.40374C3.20884 1.29048 2.95142 1.23822 2.69324 1.25188C2.43506 1.26554 2.1846 1.34467 1.96544 1.48182C1.74627 1.61898 1.56561 1.80964 1.44045 2.03587C1.31529 2.26209 1.24975 2.51645 1.25 2.77499V2.81874C1.25012 3.02313 1.27531 3.22673 1.325 3.42499L3.645 12.705C3.6761 12.8286 3.74426 12.9398 3.84033 13.0236C3.9364 13.1073 4.0558 13.1597 4.1825 13.1737L14.3788 14.3075C14.5484 14.3279 14.7047 14.4098 14.8181 14.5376C14.9315 14.6654 14.9941 14.8304 14.9941 15.0012C14.9941 15.1721 14.9315 15.3371 14.8181 15.4649C14.7047 15.5927 14.5484 15.6746 14.3788 15.695L4.1825 16.8287C4.0558 16.8427 3.9364 16.8951 3.84033 16.9789C3.74426 17.0627 3.6761 17.1739 3.645 17.2975L1.325 26.5762C1.27531 26.7745 1.25012 26.9781 1.25 27.1825V27.2262C1.24996 27.4847 1.31565 27.7389 1.4409 27.9649C1.56615 28.191 1.74683 28.3815 1.96597 28.5185C2.1851 28.6555 2.43548 28.7345 2.69356 28.7481C2.95163 28.7617 3.20893 28.7095 3.44125 28.5962L27.625 16.7975C27.9618 16.6332 28.2457 16.3776 28.4442 16.0597C28.6428 15.7419 28.7481 15.3747 28.7481 15C28.7481 14.6253 28.6428 14.258 28.4442 13.9402C28.2457 13.6224 27.9631 13.3668 27.6263 13.2025Z" fill="#667085" />
              </svg>
            </IconButton>
          </Box>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Menu>
          <Menu anchorEl={anchorE2} open={Boolean(anchorE2)} onClose={() => setAnchorE2(null)}>
            <label htmlFor="file-upload">
              <MenuItem>
                <HiddenInput id="file-upload" type="file" onChange={handleFileChange} />
                Upload File
              </MenuItem>
            </label>
            <Divider />
            <MenuItem onClick={() => { onStartCapture(); setAnchorE2(null); }}>
              Capture Screenshot
            </MenuItem>
          </Menu>
          <Menu
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={() => setAnchorE2(null)}
            PaperProps={{
              sx: {
                padding: 0, // Removes all padding
              },
            }}
            MenuListProps={{
              sx: {
                padding: 0, // Removes all padding
              },
            }}
            sx={{
              '.MuiMenu-paper': {
                top: 'unset !important',
                bottom: '65px !important'
              },
            }}
          >
            <label htmlFor="messenger-upload-file">
              <MenuItem
                sx={{
                  color: 'black !important',
                  borderRadius: 0,
                  py: 1,
                  '&:hover': {
                    color: 'white !important',
                    backgroundColor: '#265A9E', // Replace 'red' with your desired color
                  },
                }}
              >
                <input
                  id="messenger-upload-file"
                  type="file"
                  accept="image/jpeg, image/png" // Allow images and specific document types
                  style={{ display: 'none' }} // Hide the input
                  onChange={handleFileChange}
                />
                <InsertDriveFileOutlinedIcon />&nbsp; &nbsp; Send File
              </MenuItem>
            </label>
            <Divider sx={{ my: '0px !important' }} />

            <MenuItem
              onClick={() => {
                onStartCapture();
                setAnchorE2(null);
              }}
              sx={{
                color: 'black !important',
                borderRadius: 0,
                py: 1,
                '&:hover': {
                  color: 'white !important',
                  backgroundColor: '#265A9E', // Replace 'red' with your desired color
                },
              }}
            >
              <AddPhotoAlternateOutlinedIcon />&nbsp; &nbsp; Attach a screenshort
            </MenuItem>
          </Menu>
        </Box>
      )}
    </ScreenCapture>
  );
}

export default BottomBarContent;
