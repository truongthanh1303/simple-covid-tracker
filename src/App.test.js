import {
  cleanup,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App';
// import mockData from './assets/mock-data/covid-stats.json';

afterEach(cleanup);
describe('Test App', () => {
  // let originalFetch;

  // beforeEach(() => {
  //   originalFetch = global.fetch;
  //   global.fetch = jest.fn(() => Promise.resolve({
  //     json: () => Promise.resolve(mockData)
  //   }));
  // });

  // afterEach(() => {
  //   global.fetch = originalFetch;
  // });

  it('first renders application', () => {
    const { queryByRole } = render(<App />);
    
    const linkElement = screen.getByText(/Corona Project/i);
    expect(linkElement).toBeInTheDocument();
    expect(queryByRole('heading', {level: 1})).toBeNull();
    expect(queryByRole('heading', {level: 2})).toBeNull();
  });
});
