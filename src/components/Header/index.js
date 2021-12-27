import { makeStyles } from '@mui/styles';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Container } from '@mui/material';

import logo from '../../assets/images/logo.jpg'

const useStyles = makeStyles(theme => ({
  logo: {
    width: 150,
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  title: {
    color: theme.palette.primary.main,
    flex: 1,
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      textAlign: 'right'
    }
  }
}))

function Header() {
  const classes = useStyles();
  return <>
    <AppBar position="static" color="transparent">
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