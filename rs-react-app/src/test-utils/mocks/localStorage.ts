import { beforeAll, beforeEach, vi, type Mock } from 'vitest';

type LocalStorageMock = {
  getItem: Mock;
  setItem: Mock;
  removeItem: Mock;
  clear: Mock;
  mockReset: () => void;
};

const createLocalStorageMock = (): LocalStorageMock => {
  const mock = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
    mockReset: function () {
      this.getItem.mockReset();
      this.setItem.mockReset();
      this.removeItem.mockReset();
      this.clear.mockReset();
    },
  };

  return mock;
};

export const setupLocalStorageMock = () => {
  const localStorageMock = createLocalStorageMock();

  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    });
  });

  beforeEach(() => {
    localStorageMock.mockReset();
    localStorageMock.getItem.mockImplementation(() => null);
  });

  return localStorageMock;
};

export const localStorageMock = createLocalStorageMock();
