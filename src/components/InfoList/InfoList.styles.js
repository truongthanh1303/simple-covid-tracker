import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  confirmed: {
    borderBottom: `5px solid ${theme.palette.primary.dark} !important`,
  },
  recovered: {
    borderBottom: `5px solid ${theme.palette.success.dark} !important`,
  },
  deaths: {
    borderBottom: `5px solid ${theme.palette.error.dark} !important`,
  }
}))