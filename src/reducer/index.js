export const ACTION_TYPE = {
  CHANGE_COUNTRY: 'change_country',
  CHANGE_REGION: 'change_region',
  CHANGE_STATS: 'change_stats',
  SET_DATA: 'set_data',
  SET_LOADING: 'set_loading'
}

export const reducer = (state, action) => {
  switch(action.type) {
    case ACTION_TYPE.CHANGE_COUNTRY:
      return {
        ...state,
        country: action.payload
      };

    case ACTION_TYPE.CHANGE_REGION:
      return {
        ...state,
        region: action.payload
      };

    case ACTION_TYPE.CHANGE_STATS:
      return !action.payload ? {
        ...state,
        stats: initialState.stats
      } : {
        ...state,
        stats: action.payload
      };

    case ACTION_TYPE.SET_DATA:
      return {
        ...state,
        covidStatsData: action.payload
      };

    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
}

export const initialState = {
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
}