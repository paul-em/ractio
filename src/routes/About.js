import React from 'react';
import Paper from 'material-ui/Paper';
import pkg from '../../package.json';

const styles = {
  container: {
    padding: 10,
    lineHeight: '1.4em',
  },
};

export default class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: pkg.version,
    };
  }

  render() {
    return <div>
      <h1>About</h1>
      <Paper style={styles.container}>
        <p>
          Developer: Paul Em<br/>
          Contact: info@paulem.eu<br/>
          Version: {this.state.version}
        </p>
        <h2>Rechtliche Information</h2>
        <p>
          Dieses Programm ist kein offizielles Program des Österreichischen Rundfunks.
          Alle Services zu dieser Radio Station können
          unter der offiziellen Website abgerufen werden.
        </p>
      </Paper>
    </div>;
  }
}
