import { useContext } from 'react';
// import Scrollbar from 'src/components/Scrollbar';
import { SidebarContext } from 'src/contexts/SidebarContext';
import SidebarContent from 'src/content/applications/Messenger/SidebarContent';

import {
  Box,
  Drawer,
  // alpha,
  styled,
  Divider,
  useTheme,
  // Button,
  // lighten,
  // darken
  Typography
} from '@mui/material';
import { Padding } from '@mui/icons-material';

// import SidebarMenu from './SidebarMenu';
// import Logo from 'src/components/LogoSign';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        color: ${theme.colors.alpha.trueWhite[70]};
        position: relative;
        z-index: 7;
        // height: 100vh;
        // padding-bottom: 68px;
`
);

function Sidebar() {
  const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);
  const closeSidebar = () => toggleSidebar();
  const theme = useTheme();

  return (
    <>
      <Drawer
        sx={{
          display: { xs: 'inline-block', lg: 'none' },
          boxShadow: `${theme.sidebar.boxShadow}`,
          background: `${theme.colors.alpha.black[30]}`,
          '& .MuiPaper-root' : {
            borderRadius:'0px 25px 25px 0px',
          }
        }}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        open={sidebarToggle}
        onClose={closeSidebar}
        variant="temporary"
        elevation={9}
      >
        <SidebarWrapper
          sx={{
            // background:
            //   theme.palette.mode === 'dark'
            //     ? theme.colors.alpha.white[100]
            //     : darken(theme.colors.alpha.black[100], 0.5)
            background: `${theme.colors.alpha.black[30]}`,
            padding:0,
          }}
        >
          {/* <Scrollbar> */}
          <Box p={0}>
            <Box
              sx={{
                width: 280,
              }}
            >
              {/* <Logo /> */}
              <SidebarContent />
            </Box>
          </Box>
          {/* <Divider
            sx={{
              mt: theme.spacing(3),
              mx: theme.spacing(2),
              background: theme.colors.alpha.trueWhite[10]
            }}
          /> */}
          {/* <SidebarMenu /> */}
          {/* </Scrollbar> */}
        </SidebarWrapper>
      </Drawer>
    </>
  );
}

export default Sidebar;
