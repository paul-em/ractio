import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

const styles = {
  element: {
    padding: 10,
    display: 'flex',
    fontSize: '0.8em',
    marginBottom: 20,
  },
  track: {
    flex: 1,
    paddingLeft: 20,
  },
  time: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLine: {
    margin: 5,
    fontWeight: 'normal',
  },
};

const TrackCard = ({ artist, song, time }) => (
  <Paper style={styles.element}>
    <div style={styles.time}>
      {
        time.toLocaleTimeString(navigator.language, {
          hour: 'numeric',
          minute: '2-digit',
        })
      }
    </div>
    <div style={styles.track}>
      <h2 style={styles.trackLine}>
        {song}
      </h2>
      <h3 style={styles.trackLine}>
        {artist}
      </h3>
    </div>
  </Paper>
);

TrackCard.propTypes = {
  artist: PropTypes.string.isRequired,
  song: PropTypes.string.isRequired,
  time: PropTypes.instanceOf(Date),
};

export default TrackCard;
