export function setStation(station) {
  return {
    type: 'SET_STATION',
    payload: station,
  };
}

// TODO: remove - this is only here to silence eslint for now until we add more actions
export function setAnotherStation(station) {
  return {
    type: 'SET_STATION',
    payload: station,
  };
}
