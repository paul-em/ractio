import React from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import AppBar from 'material-ui/AppBar';
import LinkIcon from 'material-ui/svg-icons/content/link';
import transitions from 'material-ui/styles/transitions';

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
};

export default class MediaBar extends React.Component {
  static propTypes = {
    station: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    broadcast: PropTypes.string,
    onLeftIconButtonTouchTap: PropTypes.func.isRequired,
    iconStyleLeft: PropTypes.object,
    style: PropTypes.object,
    height: PropTypes.number,
  };

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
      </div>
    </div>;
  }
}
