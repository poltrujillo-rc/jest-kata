import React from 'react';
import { useContext } from 'react';
import useAlert from './hooks/useAlert';

// Replaces useContext with a Jest mock function for controlled testing
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

// Hint 1: Mock useAlert using jest.mock(.....), so we can control its return value in tests


const customers = [
  {
    name: 'Bob',
    email: 'bob@sky.uk',
    phone: '77777777777',
    address: 'Watermark'
  }
]
const setHomeAlertText = jest.fn();
// Hint 2: create another mock function, for setHomeAlertVisible

describe('CustomerList', () => {
  beforeEach(() => {
    // Mocks the return value of useContext
    useContext.mockReturnValue({ customers });

    // TODO: Mock the return value of useAlert
  });

  // Clears mock call/instance history after every test, to avoid tests affecting each-other
  afterEach(() => {
    jest.clearAllMocks();
  });

  //TODO: these tests must be changed from it.todo('{test-name}') to it('{test-name}', () => { ... }
  describe('Client added alert', () => {
    it.todo('should render an alert with text New client has been added when displayAlert from hook is true');
    // 1. Render the component
    // 2. Check that the hooks have been called
    // 3. Check that the alert is displayed (hint: check for the text in the alert)

    it.todo('should not render an alert with text New client has been added when displayAlert from hook is false');
  });

  describe('Display client list', () => {
    it.todo('should display context clients');
  });
});
