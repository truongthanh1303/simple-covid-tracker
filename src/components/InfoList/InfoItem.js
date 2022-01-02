import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';
import { useStyles } from './InfoItem.styles';

function InfoItem({data}) {
  const classes = useStyles();
  const {
    count,
    style,
    title,
    updated,
  } = data;

  return <>
    <Card variant="outlined" className={style}>
      <CardContent>
        <Typography className={classes.title} color="text.secondary" gutterBottom data-testid={`${title}-title`}>
          {title}
        </Typography>
        <Typography className={classes.count} variant="h5" component="div">
          <CountUp
            start={0}
            end={count}
            duration={1}
            separator=","
            containerProps={{
              'data-testid': `${title}-count`
            }}
          />
        </Typography>
        { updated && (
          <Typography className={classes.date} color="text.secondary" variant="body2">
            {new Date(updated).toDateString()}
          </Typography>
        )}
        { updated && (
          <Typography className={classes.time} color="text.secondary" variant="body2">
            {new Date(updated).toLocaleTimeString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  </>
}

export default InfoItem;