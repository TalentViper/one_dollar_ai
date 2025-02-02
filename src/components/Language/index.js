import React, { useEffect, useState } from 'react';
import {
  Box,
  styled,
  useTheme,
  Avatar,
  Typography,
  Select,
  MenuItem,
  Switch
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { toogleLanguage, setLanguage } from 'src/actions/settingAction';

const LanguageWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        text-decoration: none;
        margin: 0 auto;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Language() {
  const dispatch = useDispatch();
  const isToogle = useSelector((state) => state.setting.toogleLanguage);
  const currentLang = useSelector((state) => state.setting.language);
  const theme = useTheme();
  const { t, i18n } = useTranslation();

  const [lang, setLang] = useState(1);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setLang(event.target.value);
  };

  const toogleSwitch = (event) => {
    setChecked(event.target.checked);
    dispatch(toogleLanguage(event.target.checked));
  };

  const changeLanguage = (language) => {
    dispatch(setLanguage(language));
    i18n.changeLanguage(language);
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

  useEffect(() => {
    setChecked(isToogle);
    setLang(currentLang);
    i18n.changeLanguage(currentLang);
  }, [lang]);

  return (
    <LanguageWrapper >
      <Typography sx={{
        color: 'black',
        textAlign: 'left',
        mb: 1
      }}
        fontWeight={400}
        fontSize={16}
      >{t('language')}:</Typography>
      <Select
        // disabled={!isToogle}
        sx={{
          width: '100%',
          mb: 0.5,
          '&.Mui-disabled': {
              '& .MuiSelect-select': {
                WebkitTextFillColor: 'gray'
              },
            },
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
              value={item.code}
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
              backgroundColor: '#939292',
              opacity: 1,
            },
          }}
          checked={isToogle}
          onChange={toogleSwitch}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Box>
    </LanguageWrapper>
  );
}

export default Language;
