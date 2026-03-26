import React from 'react';
import { useContext } from 'react';
import useAlert from './hooks/useAlert';
import CustomerList from "./CustomerList";
import {screen, render} from "@testing-library/react";
import {CustomerContext} from "./CustomerContext";

// Replaces useContext with a Jest mock function for controlled testing
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useContext: jest.fn()
}));

// Hint 1: Mock useAlert using jest.mock(.....), so we can control its return value in tests
jest.mock('./hooks/useAlert.js');

const customers = [
  {
    name: 'Bob',
    email: 'bob@sky.uk',
    phone: '77777777777',
    address: 'Watermark'
  }
]
const setHomeAlertText = jest.fn();
const setHomeAlertVisible = jest.fn();

// Hint 2: create another mock function, for setHomeAlertVisible

describe('CustomerList', () => {
  beforeEach(() => {
    // Mocks the return value of useContext
    useContext.mockReturnValue({ customers });
    useAlert.mockReturnValue(true);
  });

  // Clears mock call/instance history after every test, to avoid tests affecting each-other
  afterEach(() => {
    jest.clearAllMocks();
  });

  //TODO: these tests must be changed from it.todo('{test-name}') to it('{test-name}', () => { ... }
  describe('Client added alert', () => {
    it('should render an alert with text New client has been added when displayAlert from hook is true', () => {
      render(<CustomerList setHomeAlertVisible={setHomeAlertVisible} setHomeAlertText={setHomeAlertText} />);
      expect(screen.getByText("New client has been added")).toBeInTheDocument();
      expect(useAlert).toHaveBeenCalledWith();
      expect(useAlert).toHaveBeenCalledTimes(1);
      expect(useContext).toHaveBeenCalledWith(CustomerContext);
      expect(useContext).toHaveBeenCalledTimes(1);
    });
    it('should not render an alert with text New client has been added when displayAlert from hook is false', () => {
      useAlert.mockReturnValue(false);
      render(<CustomerList setHomeAlertVisible={setHomeAlertVisible} setHomeAlertText={setHomeAlertText} />);
      expect(screen.queryByText("New client has been added")).not.toBeInTheDocument();
      expect(useAlert).toHaveBeenCalledWith();
      expect(useAlert).toHaveBeenCalledTimes(1);
      expect(useContext).toHaveBeenCalledWith(CustomerContext);
      expect(useContext).toHaveBeenCalledTimes(1);
    });
  });

  describe('Display client list', () => {
    it('should display context clients', () => {
      render(<CustomerList setHomeAlertVisible={setHomeAlertVisible} setHomeAlertText={setHomeAlertText} />);
      expect(screen.getByText(/bob@sky.uk/i)).toBeInTheDocument();
      expect(screen.getByText(/77777777777/i)).toBeInTheDocument();
      expect(screen.getByText(/Watermark/i)).toBeInTheDocument();
      expect(screen.getByText("Bob")).toBeInTheDocument();
    });
  });
});
