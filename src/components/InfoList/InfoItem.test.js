import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';

import InfoItem from './InfoItem';

afterEach(cleanup);
describe('test InfoItem component', () => {
  it('render InfoItem', () => {
    const date = '2021/12/09 01:23:09+00'
    render(<InfoItem
      data={{
        count: 123456,
        title: 'Vietnam',
        updated: date
      }}
    />);

    expect(screen.getByText('Vietnam')).toBeInTheDocument();
    expect(screen.getByText(new Date(date).toDateString())).toBeInTheDocument();
  });
});