import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import LinkIcon from 'material-ui/svg-icons/content/link';
import transitions from 'material-ui/styles/transitions';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import ErrorIcon from 'material-ui/svg-icons/alert/warning';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Slider from 'material-ui/Slider';
import { ipcRenderer } from 'electron';

const styles = {
  element: {
    position: 'fixed',
    top: 0,
    width: '100%',
    boxSizing: 'border-box',
    zIndex: 10,
    transition: transitions.easeOut(null, 'background-color', null),
  },
  appBar: {
    boxShadow: 'none',
  },
  headlines: {
    transition: transitions.easeOut(null, 'padding-left', null),
    paddingRight: 20,
  },
  headline: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontWeight: 'normal',
    margin: 0,
  },
  h1: {
    fontSize: '1.7em',
  },
  controls: {
    position: 'absolute',
    width: '100%',
    height: 10,
    right: 0,
    bottom: 0,
  },
  fab: {
    position: 'absolute',
    right: 40,
    bottom: -28,
  },
  slider: {
    position: 'absolute',
    width: 100,
    right: 110,
    bottom: 0,
  },
  innerSlider: {
    margin: 0,
  },
};

export default class MediaBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      error: false,
      volume: 1,
      audio: new Audio(),
    };
  }

  static propTypes = {
    station: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    broadcast: PropTypes.string,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    iconStyleLeft: PropTypes.object,
    style: PropTypes.object,
    height: PropTypes.number,
  };

  componentDidMount() {
    ipcRenderer.on('VolumeUp', () => {
      this.updateVolume(Math.min(this.state.volume + 0.1, 1));
    });
    ipcRenderer.on('VolumeDown', () => {
      this.updateVolume(Math.max(this.state.volume - 0.1, 0));
    });
    ipcRenderer.on('VolumeMute', () => {
      this.updateVolume(this.state.volume === 0 ? 1 : 0);
    });
    ipcRenderer.on('MediaPlayPause', () => {
      this.playPause();
    });
    ipcRenderer.on('MediaStop', () => {
      if (this.state.playing) {
        this.playPause();
      }
    });

    this.audioElement.addEventListener('playing', () => {
      this.setState({ playing: true, error: false });
    });
    this.audioElement.addEventListener('error', () => {
      this.setState({ error: true });
    });
  }

  updateVolume(volume) {
    this.setState({ volume });
    this.audioElement.volume = volume;
  }

  playPause() {
    if (this.state.playing) {
      this.audioElement.pause();
    } else {
      this.audioElement.play();
    }
    this.setState({ playing: !this.state.playing });
  }

  getPlayIcon() {
    if (this.state.error && this.state.playing) {
      return <ErrorIcon/>;
    }
    return this.state.playing ? <PauseIcon/> : <PlayIcon/>;
  }

  render() {
    return <div style={{
      height: this.props.height,
      ...styles.element,
      backgroundColor: this.props.theme.palette.primary1Color,
      color: this.props.theme.palette.alternateTextColor,
    }}>
      <AppBar style={styles.appBar}
              onLeftIconButtonTouchTap={this.props.onLeftIconButtonTouchTap}
              iconStyleLeft={this.props.iconStyleLeft}
              iconElementRight={<IconButton tooltip="Open Station Website"
                                            tooltipPosition="bottom-left"
                                            href={this.props.station.website}
                                            target="_blank"><LinkIcon /></IconButton>}/>
      <div style={{ ...styles.headlines, ...this.props.style }}>
        <h1 style={{ ...styles.headline, ...styles.h1 }}>{this.props.station.name}</h1>
        <h2 style={styles.headline}>{this.props.broadcast}</h2>
        <div style={styles.controls}>
          <Slider style={styles.slider}
                  sliderStyle={styles.innerSlider}
                  value={this.state.volume}
                  onChange={(e, value) => this.updateVolume(value)}/>
          <div style={styles.fab}>
            <FloatingActionButton
              onTouchTap={() => this.playPause()}>
              {this.getPlayIcon()}
            </FloatingActionButton>
          </div>
        </div>
      </div>
      <audio src={this.props.station.streamurl}
             autoPlay
             ref={audio => (this.audioElement = audio) }/>
    </div>;
  }
}
