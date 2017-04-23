export function setStation(station) {
  return {
    type: 'SET_STATION',
    payload: station,
  };
}
export function changeSettings(update) {
  return {
    type: 'CHANGE_SETTINGS',
    payload: update,
  };
}
