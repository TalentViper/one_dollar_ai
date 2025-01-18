import React, { useState } from 'react';
import {
  Box,
  Tooltip,
  Badge,
  tooltipClasses,
  styled,
  useTheme,
  Avatar,
  Button,
  Typography,
  Select,
  MenuItem,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';

const LanguageWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        text-decoration: none;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Language() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(1);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const toogleSwitch = (event) => {
    setChecked(event.target.checked);
  };

  const changeLanguage = (language) => {
    console.log("language", language);
    i18n.changeLanguage(language);
  };

  const user = {
    name: 'Catherine Pike',
    email: 'random.dude@random.com',
    avatar: '/static/images/avatars/4.jpg'
  };

  const flags = [
    {
      id: 1,
      url: '/static/images/flags/england.png',
      language: 'English',
      code: "en"
    },
    {
      id: 2,
      url: '/static/images/flags/china.png',
      language: '中文',
      code: "cn"
    }, {
      id: 3,
      url: '/static/images/flags/hongkong.png',
      language: '繁體中文',
      code: "hk"
    }, {
      id: 4,
      url: '/static/images/flags/japan.png',
      language: '日本語',
      code: "ja"
    },

  ]

  return (
    <LanguageWrapper >
      <Typography sx={{
        color: 'black',
        textAlign: 'left',
        mb: 1
      }}
        fontWeight={400}
        fontSize={16}
      >Language:</Typography>
      <Select
        sx={{
          width: '100%',
          mb: 0.5,
          '& .MuiInputBase-input': {
            display: 'flex',
            py: 0.7
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: 'gray !important',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'black !important', // Border color
            },
            '&:hover fieldset': {
              borderColor: 'black', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: '#10a37f', // Border color when focused
            },
          },
        }}
        value={lang}
        onChange={handleChange}
      >
        {flags && flags.length > 0 && flags.map((item, index) => {
          return (
            <MenuItem
              key={index}
              value={item.id}
              onClick={() => changeLanguage(item.code.toLowerCase())}
            >
              <Avatar
                sx={{
                  width: 26,
                  height: 26
                }}
                alt={item.language}
                src={item.url}
              />
              <Typography fontSize={16} fontWeight={400} sx={{ color: 'black', ml: 1 }}>{item.language}</Typography>
            </MenuItem>
          )
        })}
      </Select>
      <Box mb={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography fontSize={16} fontWeight={400} sx={{ color: 'black', ml: 1 }}>{t('fumanize')}</Typography>
        <Switch
          sx={{
            padding: 0,
            width: 44,
            height: 22,
            '& .MuiSwitch-switchBase': {
              padding: '1px',
              '&.Mui-checked': {
                color: '#fff',
                '& + .MuiSwitch-track': {
                  backgroundColor: '#009688',
                  opacity: 1,
                },
              },
            },
            '& .MuiSwitch-thumb': {
              padding: 0,
              boxShadow: 'none',
            },
            '& .MuiSwitch-track': {
              borderRadius: 16,
              backgroundColor: '#e0e0e0',
              opacity: 1,
            },
          }}
          checked={checked}
          onChange={toogleSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </LanguageWrapper>
  );
}

export default Language;
