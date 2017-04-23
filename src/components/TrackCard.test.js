import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TrackCard from './TrackCard';

test('TrackCard', () => {
  const component = mount(
    <MuiThemeProvider>
      <TrackCard artist="Rick Astley" song="Never Gonna Give You Up" time={new Date()}/>
    </MuiThemeProvider>,
  );
  expect(component.text().includes('Rick Astley')).toBe(true);
  expect(component.text().includes('Never Gonna Give You Up')).toBe(true);
});
