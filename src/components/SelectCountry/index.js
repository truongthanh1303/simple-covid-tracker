import { Container } from '@mui/material';
import { useCallback, useState, useContext, useLayoutEffect, useEffect } from 'react';

import Selection from './Selection';
import { AppContext } from '../../context';
import { ACTION_TYPE } from '../../reducer';

function SelectCountry() {
  const INIT_COUNTRY = process.env.REACT_APP_INITIAL_COUNTRY;
  const INIT_REGION = process.env.REACT_APP_INITIAL_REGION;
  const [ state, dispatch ] = useContext(AppContext);
  const [countries, setCountries] = useState([]);
  const [regionList, setRegionList] = useState([]);

  function getRegionList(country, data) {
    return country ?
      Object.keys(data[country]) : [];
  }
  function getStats(country, region, data) {
    return country ?
      data[country][region] : null;
  };

  function onChangeCountry(country) {
    dispatch({
      type: ACTION_TYPE.CHANGE_COUNTRY,
      payload: country
    });
  };

  const onChangeRegion = useCallback((region) => {
    const stats = getStats(state.country, region, state.covidStatsData);

    dispatch({
      type: ACTION_TYPE.CHANGE_REGION,
      payload: region
    });

    dispatch({
      type: ACTION_TYPE.CHANGE_STATS,
      payload: stats
    });
  }, [state.covidStatsData, state.country, dispatch]);

  function renderRegion() {
    return regionList.length ? 
      <Selection
        textForEmptyValue='Select Region'
        label='Region'
        selectionData={regionList}
        onChange={onChangeRegion}
        value={state.region}
      /> : null
  }

  useEffect(() => {
    if (state.country && Object.keys(state.covidStatsData)) {
      const regionList = getRegionList(state.country, state.covidStatsData);
      
      onChangeRegion(regionList[0]);
      setRegionList(regionList);
    }
  }, [state.country, state.covidStatsData, onChangeRegion]);

  useLayoutEffect(() => {
    function getCovidStats() {
      fetch('covid-stats.json').then((response) =>
        response.json().then((statsData) => {
          const regionList = getRegionList(INIT_COUNTRY, statsData);
          const stats = getStats(INIT_COUNTRY, INIT_REGION, statsData);

          setRegionList(regionList);
          setCountries(Object.keys(statsData));
          dispatch({
            type: ACTION_TYPE.SET_DATA,
            payload: statsData
          });
          dispatch({
            type: ACTION_TYPE.CHANGE_COUNTRY,
            payload: INIT_COUNTRY
          });
          dispatch({
            type: ACTION_TYPE.CHANGE_REGION,
            payload: INIT_REGION
          });
          dispatch({
            type: ACTION_TYPE.CHANGE_STATS,
            payload: stats
          });
        })
      ).finally(() => {
        dispatch({
          type: ACTION_TYPE.SET_LOADING,
          payload: false
        });
      });
    }

    dispatch({
      type: ACTION_TYPE.SET_LOADING,
      payload: true
    });

    getCovidStats();
  }, [dispatch, INIT_COUNTRY, INIT_REGION]);

  return <>
    <Container maxWidth="md" sx={{ justifyContent: 'center', paddingTop: 1 }}>
      <Selection
        textForEmptyValue='Select Country'
        label='Country'
        selectionData={countries}
        onChange={onChangeCountry}
        value={state.country}
      />

      {
        renderRegion()
      }
    </Container>
  </>
}

SelectCountry.defaultProps = {
  countries: [],
}

export default SelectCountry