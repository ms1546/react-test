import { render, screen } from '@testing-library/react';
import App from './App';

test('renders input for image generation', () => {
  render(<App />);
  const inputElement = screen.getByPlaceholderText(/Enter text for image generation/i);
  expect(inputElement).toBeInTheDocument();
});
