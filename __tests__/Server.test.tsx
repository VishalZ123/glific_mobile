import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import customRender from '../utils/jestRender';

import Server from '../screens/Server';
import AxiosService from '../config/axios';

describe('Server screen', () => {
  test('renders correctly', () => {
    const { getByTestId, getByText } = customRender(<Server />);

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    expect(serverUrlInput).toBeDefined();
    expect(continueButton).toBeDefined();
  });

  test('updates server URL correctly', async () => {
    const { findByTestId, getByTestId } = customRender(<Server />);

    const serverUrlInput = getByTestId('server');

    const clearInput = await findByTestId('close');

    fireEvent.changeText(serverUrlInput, 'https://example.com');
    expect(serverUrlInput.props.value).toBe('https://example.com');

    fireEvent.press(clearInput);
    expect(serverUrlInput.props.value).toBe('');
  });

  test('displays error message for invalid server URL', () => {
    const { getByTestId, getByText } = customRender(<Server />);

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'invalid-url');
    fireEvent.press(continueButton);

    const errorMessage = getByText('Please enter valid server url');
    expect(errorMessage).toBeDefined();
  });

  test('navigates to Login screen on successful submit', async () => {
    const navigateMock = jest.fn();
    AxiosService.updateServerURL = jest.fn();

    const { getByTestId, getByText } = customRender(
      <Server navigation={{ navigate: navigateMock }} />
    );

    const serverUrlInput = getByTestId('server');
    const continueButton = getByText('CONTINUE');

    fireEvent.changeText(serverUrlInput, 'example.com');
    fireEvent.press(continueButton);

    await waitFor(() => {
      expect(AxiosService.updateServerURL).toHaveBeenCalledWith('https://api.example.com/api');

      expect(navigateMock).toHaveBeenCalledWith('Login');
    });
  });
});
