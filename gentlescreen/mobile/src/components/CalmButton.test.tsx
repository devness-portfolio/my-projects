import { fireEvent, render } from '@testing-library/react-native';

import { CalmButton } from './CalmButton';

describe('CalmButton', () => {
  it('provides an accessible button and handles activation', () => {
    const onPress = jest.fn();
    const screen = render(
      <CalmButton accessibilityLabel="Start calm session" onPress={onPress}>
        Start
      </CalmButton>,
    );

    fireEvent.press(screen.getByRole('button', { name: 'Start calm session' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});

