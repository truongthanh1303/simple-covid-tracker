import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import Selection from './Selection';

afterEach(cleanup);
describe('test Selection component', () => {
  it ('default value should empty string', () => {
    render(<Selection label={'test'} selectionData={['Vietnam']}/>);
    const selectComponent = screen.getByTestId('select-component-test');
    expect(selectComponent.value).toBe('');
  });

  it('test onChange selection', () => {
    render(<Selection label={'test'} selectionData={['Vietnam']}/>);
    const selectComponent = screen.getByTestId('select-component-test');
    expect(selectComponent.value).toBe('');
    fireEvent.change(selectComponent, { target: { value: 'Vietnam' } })
    expect(selectComponent.value).toBe('Vietnam');
  });

});