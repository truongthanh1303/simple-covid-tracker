import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { Container } from '@mui/material';
import { useContext } from 'react';

import logo from '../../assets/images/logo.jpg';
import { AppContext } from '../../context';
import { useStyles } from './Header.styles';

function Header() {
  const classes = useStyles();
  const [state] = useContext(AppContext);

  return <>
    <AppBar position="fixed" color="default">
      { state.isLoading && <LinearProgress /> }
      <Container maxWidth="md" disableGutters={true}>
        <Toolbar>
          <img src={logo} alt="Logo" className={classes.logo}/>
          <Typography variant="h6" className={classes.title}>
            Simple Corona Project
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  </>
}

export default Header;