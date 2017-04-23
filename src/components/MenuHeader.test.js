import React from 'react';
import { mount } from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuHeader from './MenuHeader';

test('MenuHeader', () => {
  const component = mount(
    <MuiThemeProvider>
      <MenuHeader station="fm4"/>
    </MuiThemeProvider>,
  );

  expect(component.find('img').node.src.includes('fm4')).toBe(true);
});
