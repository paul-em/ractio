import React from 'react';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import stations from '../stations';

const styles = {
  container: {
    padding: 10,
  },
  radioButton: {
    padding: 10,
  },
};

export default class Stations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 'fm4',
    };
  }

  setStation(shortName) {
    this.setState({
      selected: shortName,
    });
  }

  render() {
    return <div>
      <h1>{this.constructor.name}</h1>
      <Paper style={styles.container}>
        <RadioButtonGroup name="stations" valueSelected={this.state.selected}
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
