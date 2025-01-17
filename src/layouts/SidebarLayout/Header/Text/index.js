import { Box, Typography } from '@mui/material';

const HeaderText = () => {
  return (
    <Box display="flex">
      <Typography fontWeight={700} fontSize={30} sx={{ color: '#265A9E' }}>
        OneDollar
      </Typography>
      <Typography fontWeight={700} fontSize={30} sx={{ color: '#227ff3' }}>
        AI
      </Typography>
    </Box>
  );
};

export default HeaderText;
