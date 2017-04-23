import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Checkbox from 'material-ui/Checkbox';
import Paper from 'material-ui/Paper';
import { changeSettings } from '../actions';

const styles = {
  container: {
    padding: 10,
  },
  checkbox: {
    padding: 10,
  },
};

@connect(store => ({
  settings: store.settings,
}))
export default class Settings extends React.Component {
  static propTypes = {
    settings: PropTypes.object,
    dispatch: PropTypes.func,
  };

  changeSettings(prop, val) {
    this.props.dispatch(changeSettings({
      [prop]: val,
    }));
  }

  render() {
    return <div>
      <h1>Einstellungen</h1>
      <Paper style={styles.container}>
        <Checkbox style={styles.checkbox}
                  label="Dunkler Modus"
                  checked={this.props.settings.dark}
                  onCheck={(e, value) => this.changeSettings('dark', value)}/>
      </Paper>
    </div>;
  }
}
