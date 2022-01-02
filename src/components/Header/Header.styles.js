import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
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