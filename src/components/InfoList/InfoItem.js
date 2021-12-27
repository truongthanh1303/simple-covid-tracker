import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CountUp from 'react-countup';

function InfoItem({data}) {
  const {
    count,
    style,
    title,
    updated,
  } = data;

  return <>
    <Card variant="outlined" className={style}>
      <CardContent>
        <Typography sx={{ fontSize: 14, textAlign: 'center' }} color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ textAlign: 'center' }} variant="h5" component="div">
          <CountUp
            start={0}
            end={count}
            duration={1}
            separator=","
          />
        </Typography>
        { updated && (
          <Typography sx={{ mt: 1.5, textAlign: 'center' }} color="text.secondary" variant="body2">
            {new Date(updated).toDateString()}
          </Typography>
        )}
        { updated && (
          <Typography sx={{ textAlign: 'center' }} color="text.secondary" variant="body2">
            {new Date(updated).toLocaleTimeString()}
          </Typography>
        )}
      </CardContent>
    </Card>
  </>
}

export default InfoItem;