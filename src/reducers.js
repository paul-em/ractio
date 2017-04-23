import stations from './stations';
import defaultTheme, { getTheme } from './theme';

export default function reducer(state = {
  station: { ...stations[0] },
  theme: defaultTheme,
}, action) {
  switch (action.type) {
    case 'SET_STATION': {
      return {
        ...state,
        station: {
          ...action.payload,
        },
        theme: getTheme(action.payload.shortName, true),
      };
    }
    default: {
      return state;
    }
  }
}
