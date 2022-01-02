import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom'

import App from './App';
import mockData from './assets/mock-data/covid-stats.json';

describe('Test App', () => {

  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(mockData)
    }));
  });

  afterEach(() => {
    global.fetch = originalFetch;
    cleanup;
  });

  it('Should correct with data', async () => {
    await act(async() => {
      render(<App/>);
    });

    const countryHeadingElement = screen.getByTestId('heading-country');
    const regionHeadingElement = screen.getByTestId('heading-region');
    const countrySelectElement = screen.getByTestId('select-component-Country');
    const regionSelectElement = screen.getByTestId('select-component-Region');
    const confirmedTitleElement = screen.getByTestId('Confirmed-title');
    const recoveredTitleElement = screen.getByTestId('Recovered-title');
    const deathsTitleElement = screen.getByTestId('Deaths-title');

    expect(confirmedTitleElement).toBeInTheDocument();
    expect(confirmedTitleElement.innerHTML).toBe('Confirmed');

    expect(recoveredTitleElement).toBeInTheDocument();
    expect(recoveredTitleElement.innerHTML).toBe('Recovered');

    expect(deathsTitleElement).toBeInTheDocument();
    expect(deathsTitleElement.innerHTML).toBe('Deaths');

    expect(countryHeadingElement.innerHTML).toBe('Global');
    expect(regionHeadingElement.innerHTML).toBe('Region: All');
    expect(countrySelectElement.value).toBe('Global');
    expect(regionSelectElement.value).toBe('All');

    setTimeout(() => {
      expect(parseInt(screen.getByTestId('Confirmed-count').innerHTML)).toBe(mockData.Global.All.confirmed);
      expect(parseInt(screen.getByTestId('Recovered-count').innerHTML)).toBe(mockData.Global.All.recovered);
      expect(parseInt(screen.getByTestId('Deaths-count').innerHTML)).toBe(mockData.Global.All.deaths);
    }, 1200);
  });

  it('Should pass after change country value', async () => {
    await act(async() => {
      render(<App/>);
    });

    fireEvent.change(screen.getByTestId('select-component-Country'), { target: { value: 'US' } });
    expect(screen.getByTestId('select-component-Country').value).toBe('US');
    expect(screen.getByTestId('select-component-Region').value).toBe('All');
    expect(screen.getByTestId('heading-country').innerHTML).toBe('US');
    expect(screen.getByTestId('heading-region').innerHTML).toBe('Region: All');

    setTimeout(() => {
      expect(parseInt(screen.getByTestId('Confirmed-count').innerHTML)).toBe(mockData.US.All.confirmed);
      expect(parseInt(screen.getByTestId('Recovered-count').innerHTML)).toBe(mockData.US.All.recovered);
      expect(parseInt(screen.getByTestId('Deaths-count').innerHTML)).toBe(mockData.US.All.deaths);
    }, 1200);
  });

  it('Should pass after change region value', async () => {
    await act(async() => {
      render(<App/>);
    });

    fireEvent.change(screen.getByTestId('select-component-Country'), { target: { value: 'US' } });
    fireEvent.change(screen.getByTestId('select-component-Region'), { target: { value: 'Mississippi' } });
    expect(screen.getByTestId('select-component-Country').value).toBe('US');
    expect(screen.getByTestId('select-component-Region').value).toBe('Mississippi');
    expect(screen.getByTestId('heading-country').innerHTML).toBe('US');
    expect(screen.getByTestId('heading-region').innerHTML).toBe('Region: Mississippi');

    setTimeout(() => {
      expect(parseInt(screen.getByTestId('Confirmed-count').innerHTML)).toBe(mockData.US.Mississippi.confirmed);
      expect(parseInt(screen.getByTestId('Recovered-count').innerHTML)).toBe(mockData.US.Mississippi.recovered);
      expect(parseInt(screen.getByTestId('Deaths-count').innerHTML)).toBe(mockData.US.Mississippi.deaths);
    }, 1200);
  });

  it('Should pass after clear region value', async () => {
    await act(async() => {
      render(<App/>);
    });

    fireEvent.change(screen.getByTestId('select-component-Region'), { target: { value: '' } });
    expect(screen.getByTestId('select-component-Country').value).toBe('Global');
    expect(screen.getByTestId('select-component-Region').value).toBe('');
    expect(screen.getByTestId('heading-country').innerHTML).toBe('Global');
    expect(screen.queryByTestId('heading-region')).not.toBeInTheDocument();

    expect(parseInt(screen.getByTestId('Confirmed-count').innerHTML)).toBe(0);
    expect(parseInt(screen.getByTestId('Recovered-count').innerHTML)).toBe(0);
    expect(parseInt(screen.getByTestId('Deaths-count').innerHTML)).toBe(0);
  });
});
