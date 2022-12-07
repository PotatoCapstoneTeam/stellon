import { render } from '@testing-library/react';

import GameView from './game-view';

describe('GameView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameView />);
    expect(baseElement).toBeTruthy();
  });
});
