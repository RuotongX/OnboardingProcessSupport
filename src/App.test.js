import { render, screen } from '@testing-library/react';
import ApiTest from './view/Test/ApiTest';

test('renders learn react link', () => {
  render(<ApiTest />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
