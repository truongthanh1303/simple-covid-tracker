import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';

import InfoItem from './InfoItem';
import { AppContext } from '../../context';
import { useStyles } from './InfoList.styles';

function InfoList() {
  const classes = useStyles();
  const [ state ] = useContext(AppContext);

  const [statInfos, setStatInfos] = useState({
    confirmed: {
      title: 'Confirmed',
      count: state.stats.confirmed,
      updated: state.stats.updated,
      style: classes.confirmed
    },
    recovered: {
      title: 'Recovered',
      count: state.stats.recovered,
      updated: state.stats.updated,
      style: classes.recovered
    },
    deaths: {
      title: 'Deaths',
      count: state.stats.deaths,
      updated: state.stats.updated,
      style: classes.deaths
    },
  });

  function renderItems() {
    return Object.values(statInfos).map((entry, index) => (
      <Grid key={index} item xs={12} sm={4}>
        <InfoItem data={entry} />
      </Grid>
    ));
  };

  useEffect(() => {
    setStatInfos(statInfos => ({
      confirmed: {
        ...statInfos.confirmed,
        count: state.stats.confirmed,
        updated: state.stats.updated,
      },
      recovered: {
        ...statInfos.recovered,
        count: state.stats.recovered,
        updated: state.stats.updated,
      },
      deaths: {
        ...statInfos.deaths,
        count: state.stats.deaths,
        updated: state.stats.updated,
      },
    }))
  }, [state.stats]);

  return  <>
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      className={classes.container}
    >
      {renderItems()}
    </Grid>
  </>
}

export default InfoList;