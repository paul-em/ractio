import React from 'react';
import PropTypes from 'prop-types';
import logos from '../logos';

const styles = {
  element: {
    width: '100%',
    padding: 10,
    boxSizing: 'border-box',
    textAlign: 'center',
  },
  img: {
    width: 100,
  },
};

const MenuHeader = ({ station }) => (
  <div style={styles.element}>
    <img style={styles.img} src={logos[station]}/>
  </div>
);

MenuHeader.propTypes = {
  station: PropTypes.string.isRequired,
};

export default MenuHeader;
