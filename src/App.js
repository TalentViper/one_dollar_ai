import { useRoutes } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';
import { AuthProvider } from "src/contexts/AuthContext";
import { InviteProvider } from 'src/contexts/InviteContext';

function App() {
  const content = useRoutes(router);

  return (
    <ThemeProvider>
      <AuthProvider>
        <InviteProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <CssBaseline />
            {content}
          </LocalizationProvider>
        </InviteProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
