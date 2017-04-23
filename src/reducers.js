import stations from './stations';
import defaultTheme, { getTheme } from './theme';

export default function reducer(state = {
  station: { ...stations[0] },
  theme: defaultTheme,
  settings: {
    dark: true,
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
    default: {
      return state;
    }
  }
}
