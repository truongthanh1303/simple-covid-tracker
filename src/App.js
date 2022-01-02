import { ThemeProvider, createTheme } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useReducer } from 'react';

import './App.css';
import Header from './components/Header';
import SelectCountry from './components/SelectCountry';
import InfoList from './components/InfoList';
import { reducer, initialState } from './reducer';
import { AppContext } from './context';

let theme = createTheme(theme => ({
  breakpoints: {
    values: {
      xs: 320,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
    },
  },
}));

theme = responsiveFontSizes(theme);

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <ThemeProvider theme={theme}>
        <Header/>
        <Container maxWidth="md" disableGutters={true} style={{ marginTop: 70 }}>
          {(state.country || state.region) && (
            <Box sx={{ mb: 2 }}>
              { state.country && (
                <Typography variant="h1" color="primary.main" sx={{ textAlign: 'center' }} data-testid="heading-country">
                  { state.country }
                </Typography>
              )}
              { state.region && (
                <Typography variant="h2" color="primary.light" sx={{ textAlign: 'center' }} data-testid="heading-region">
                  Region: { state.region }
                </Typography>
              )}
            </Box>
          )}
          <InfoList/>
          <SelectCountry/>
        </Container>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
