import { Box } from '@mui/material';
import Invite from './Invite';
import TopUp from './TopUp';

function HeaderButtons() {
  return (
    <Box  sx={{ mr: 1, display:'flex' }}>
      <Box
        sx={{
          display: {
            xs: 'none', // Hidden on small screens
            md: 'block', // Shown on medium and larger screens
          },
        }}
      >
        <TopUp />
      </Box>
      <Invite />
    </Box>
  );
}

export default HeaderButtons;
