import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import stations from '../stations';
import { setStation as setStationAction } from '../actions';

const styles = {
  container: {
    padding: 10,
  },
  radioButton: {
    padding: 10,
  },
};

@connect(store => ({
  station: store.station,
}))
export default class Stations extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    dispatch: PropTypes.func,
  };

  setStation(shortName) {
    const station = stations.find(loopStation => loopStation.shortName === shortName);
    if (station) {
      this.props.dispatch(setStationAction(station));
    }
  }

  render() {
    return <div>
      <h1>{this.constructor.name}</h1>
      <Paper style={styles.container}>
        <RadioButtonGroup name="stations" valueSelected={this.props.station.shortName}
                          onChange={(e, value) => this.setStation(value)}>
          {stations.map(station => <RadioButton value={station.shortName}
                                                label={station.name}
                                                key={station.shortName}
                                                style={styles.radioButton}/>)}
        </RadioButtonGroup>
      </Paper>
    </div>;
  }
}
