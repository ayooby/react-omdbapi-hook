import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('index is rendered correctly', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome to OMDB applicaton/i);
  expect(linkElement).toBeInTheDocument();
});
