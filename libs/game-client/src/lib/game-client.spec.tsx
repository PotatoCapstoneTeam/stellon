import { render } from '@testing-library/react';

import GameClient from './game-client';

describe('GameClient', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<GameClient />);
    expect(baseElement).toBeTruthy();
  });
});
