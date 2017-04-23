import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import TrackCard from '../components/TrackCard';
import { updateProgram } from '../actions';

const styles = {
  spinner: {
    textAlign: 'center',
    marginTop: 10,
  },
};

@connect(store => ({
  station: store.station,
  songs: store.program.songs,
  fetching: store.program.fetching,
  error: store.program.error,
}))
export default class Progam extends React.Component {
  static propTypes = {
    station: PropTypes.object,
    dispatch: PropTypes.func,
    songs: PropTypes.array,
    fetching: PropTypes.bool,
    error: PropTypes.string,
  };

  componentWillMount() {
    if (!this.props.fetching) {
      this.props.dispatch(updateProgram(this.props.station));
    }
  }

  render() {
    const now = Date.now();
    const songs = this.props.songs.filter(song => song.start < now);
    return <div>
      {this.props.fetching && !songs.length ?
        <div style={ styles.spinner }><CircularProgress /></div> :
        null}
      {songs.map(item => <TrackCard {...item} />) }
      {this.props.error || songs.length === 0 ?
        <p>Keine Programminfo gefunden</p> :
        null}
    </div>;
  }
}
