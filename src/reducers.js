import stations from './stations';
import defaultTheme, { getTheme } from './theme';

export default function reducer(state = {
  station: { ...stations[0] },
  theme: defaultTheme,
  settings: {
    dark: true,
  },
  program: {
    data: null,
    songs: [],
    broadcast: '',
    fetching: false,
    error: null,
  },
}, action) {
  switch (action.type) {
    case 'SET_STATION': {
      return {
        ...state,
        station: {
          ...action.payload,
        },
        theme: getTheme(action.payload.shortName, state.settings.dark),
      };
    }
    case 'CHANGE_SETTINGS': {
      const settings = {
        ...state.settings,
        ...action.payload,
      };
      return {
        ...state,
        theme: getTheme(state.station.shortName, settings.dark),
        settings,
      };
    }
    case 'UPDATE_PROGRAM_PENDING': {
      return {
        ...state,
        program: {
          songs: [],
          broadcast: '',
          fetching: true,
          error: null,
        },
      };
    }
    case 'UPDATE_PROGRAM_FULFILLED': {
      return {
        ...state,
        program: {
          songs: action.payload.songs,
          broadcast: action.payload.broadcast,
          fetching: false,
          error: null,
        },
      };
    }
    case 'UPDATE_PROGRAM_REJECTED': {
      return {
        ...state,
        program: {
          songs: [],
          broadcast: '',
          fetching: false,
          error: action.payload.message,
        },
      };
    }
    default: {
      return state;
    }
  }
}
