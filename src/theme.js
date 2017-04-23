import {
  grey100, grey900,
  fullWhite, fullBlack, darkBlack,
} from 'material-ui/styles/colors';
import { fade } from 'material-ui/utils/colorManipulator';
import spacing from 'material-ui/styles/spacing';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import stations from './stations';

export function getTheme(stationName, dark) {
  const station = stations.find(loopStation => loopStation.shortName === stationName);
  return getMuiTheme({
    spacing,
    fontFamily: 'Roboto, sans-serif',
    palette: {
      primary1Color: station.color,
      primary2Color: station.color,
      primary3Color: grey900,
      accent1Color: '#DF1C24',
      accent2Color: grey100,
      accent3Color: station.dark ? fullBlack : fullWhite,
      textColor: dark ? fullWhite : darkBlack,
      secondaryTextColor: (0, fade)(fullWhite, 0.7),
      alternateTextColor: station.dark ? fullBlack : fullWhite,
      canvasColor: dark ? '#363839' : fullWhite,
      borderColor: (0, fade)(fullWhite, 0.3),
      disabledColor: (0, fade)(fullWhite, 0.3),
      pickerHeaderColor: (0, fade)(fullWhite, 0.12),
      clockCircleColor: (0, fade)(fullWhite, 0.12),
      shadowColor: fullBlack,
    },
    drawer: {
      width: 256,
    },
    slider: {
      handleColorZero: station.dark ? darkBlack : fullWhite,
      selectionColor: station.dark ? darkBlack : fullWhite,
      rippleColor: station.dark ? darkBlack : fullWhite,
    },
  });
}

export default getTheme('fm4', true);
