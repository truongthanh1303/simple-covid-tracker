import {
  initialState,
  reducer,
  ACTION_TYPE
} from './index';

describe('test the reducer and actions', () => {

  it('should return the initial state', () => {
    expect(initialState).toEqual({
      country: '',
      region: '',
      stats: {
        lat: "",
        long: "",
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        updated: null
      },
      covidStatsData: {},
      isLoading: false
    });
  });

  it('should change country', () => {
    expect(reducer(initialState, {
      type: ACTION_TYPE.CHANGE_COUNTRY,
      payload: 'Global'
    })).toEqual({
      ...initialState,
      country: 'Global'
    });
  });

  it('should change region', () => {
    expect(reducer(initialState, {
      type: ACTION_TYPE.CHANGE_REGION,
      payload: 'All'
    })).toEqual({
      ...initialState,
      region: 'All'
    });
  });

  it('should change stats', () => {
    expect(reducer(initialState, {
      type: ACTION_TYPE.CHANGE_STATS,
      payload: {
        lat: "12.12",
        long: "-107.10",
        confirmed: 123456,
        recovered: 123,
        deaths: 100,
        updated: '2021/12/09 01:23:09+00'
      }
    })).toEqual({
      ...initialState,
      stats: {
        lat: "12.12",
        long: "-107.10",
        confirmed: 123456,
        recovered: 123,
        deaths: 100,
        updated: '2021/12/09 01:23:09+00'
      }
    });
  });

  it('set covid stats data', () => {
    expect(reducer(initialState, {
      type: ACTION_TYPE.SET_DATA,
      payload: {
        "Vietnam": {
          "All": {
            "confirmed": 1352122,
            "recovered": 0,
            "deaths": 26930,
            "country": "Vietnam",
            "population": 95540800,
            "sq_km_area": 331689,
            "life_expectancy": "69.3",
            "elevation_in_meters": 398,
            "continent": "Asia",
            "abbreviation": "VN",
            "location": "Southeast Asia",
            "iso": 704,
            "capital_city": "Hanoi",
            "lat": "14.058324",
            "long": "108.277199",
            "updated": "2021/12/09 01:23:09+00"
          }
        }
      }
    })).toEqual({
      ...initialState,
      covidStatsData: {
        "Vietnam": {
          "All": {
            "confirmed": 1352122,
            "recovered": 0,
            "deaths": 26930,
            "country": "Vietnam",
            "population": 95540800,
            "sq_km_area": 331689,
            "life_expectancy": "69.3",
            "elevation_in_meters": 398,
            "continent": "Asia",
            "abbreviation": "VN",
            "location": "Southeast Asia",
            "iso": 704,
            "capital_city": "Hanoi",
            "lat": "14.058324",
            "long": "108.277199",
            "updated": "2021/12/09 01:23:09+00"
          }
        }
      }
    });
  });

  it('others action', () => {
    expect(reducer(initialState, {
      type: 'unknown action',
      payload: 'This is wrong action'
    })).toEqual(initialState);
  });

});