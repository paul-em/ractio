/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MediaBar from './MediaBar';
import stations from '../stations';
import theme from '../theme';

injectTapEventPlugin();

test('MediaBar', () => {
  let handlerTapped = false;
  const tapHandler = function handler() {
    handlerTapped = true;
  };

  const component = mount(
    <MuiThemeProvider>
      <MediaBar station={stations[0]}
                broadcast="Sleepless"
                height={160}
                theme={theme}
                onLeftIconButtonTouchTap={tapHandler}/>
    </MuiThemeProvider>,
  );
  expect(component.text().includes('Sleepless')).toBe(true);

  expect(handlerTapped).toBe(false);
  const node = ReactDOM.findDOMNode(component.find('button').first().node);
  TestUtils.Simulate.touchTap(node);
  expect(handlerTapped).toBe(true);
});
