// Enhanced app.test.js
const { 
    getAllUserNames, 
    getUserDetails, 
    getFilteredUsersByName, 
    delayedGreeting, 
    processWithCallback 
  } = require('./app');
  const api = require('./api');
  
  jest.mock('./api'); // Mock the entire api.js module
  
  describe('App Logic with Mocked API', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mock states before each test
    });
  
    describe('getAllUserNames()', () => {
      test('should return a list of user names', async () => {
        api.fetchUsers.mockResolvedValue([
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
        ]);
  
        const names = await getAllUserNames();
  
        expect(api.fetchUsers).toHaveBeenCalledTimes(1);
        expect(names).toEqual(['John Doe', 'Jane Smith']);
        expect(names).toMatchSnapshot();
      });
  
      test('should handle an empty response', async () => {
        api.fetchUsers.mockResolvedValue([]);
  
        const names = await getAllUserNames();
  
        expect(api.fetchUsers).toHaveBeenCalledTimes(1);
        expect(names).toEqual([]);
        expect(names).toMatchSnapshot();
      });
    });
  
    describe('getUserDetails()', () => {
      test('should return user details for a valid user ID', async () => {
        api.fetchUserById.mockResolvedValue({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@example.com',
        });
  
        const userDetails = await getUserDetails(1);
  
        expect(api.fetchUserById).toHaveBeenCalledWith(1);
        expect(userDetails).toEqual({
          name: 'John Doe',
          email: 'john.doe@example.com',
        });
        expect(userDetails).toMatchSnapshot();
      });
  
      test('should throw an error if user ID is invalid', async () => {
        api.fetchUserById.mockRejectedValue(new Error('User not found'));
  
        await expect(getUserDetails(999)).rejects.toThrow('User not found');
        expect(api.fetchUserById).toHaveBeenCalledWith(999);
      });
    });
  });
  
  describe('Testing Complex Asynchronous Functions', () => {
    beforeEach(() => {
      jest.clearAllMocks(); // Clear mock state before each test
    });
  
    describe('getFilteredUsersByName()', () => {
      test('should filter users whose names contain the substring', async () => {
        api.fetchUsers.mockResolvedValue([
          { id: 1, name: 'John Doe' },
          { id: 2, name: 'Jane Smith' },
          { id: 3, name: 'Doe Ray' },
        ]);
  
        const filteredUsers = await getFilteredUsersByName('Doe');
  
        expect(api.fetchUsers).toHaveBeenCalledTimes(1);
        expect(filteredUsers).toEqual([
          { id: 1, name: 'John Doe' },
          { id: 3, name: 'Doe Ray' },
        ]);
        expect(filteredUsers).toMatchSnapshot();
      });
  
      test('should return an empty array if no users match', async () => {
        api.fetchUsers.mockResolvedValue([{ id: 1, name: 'Alice' }]);
  
        const filteredUsers = await getFilteredUsersByName('Z');
  
        expect(filteredUsers).toEqual([]);
        expect(filteredUsers).toMatchSnapshot();
      });
    });
  
    describe('delayedGreeting()', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });
  
      afterEach(() => {
        jest.useRealTimers();
      });
  
      test('should resolve with a greeting after the delay', async () => {
        const greetingPromise = delayedGreeting('John', 5000);
  
        jest.advanceTimersByTime(5000);
  
        await expect(greetingPromise).resolves.toBe('Hello, John!');
      });
  
      test('should not resolve before the delay', () => {
        const greetingPromise = delayedGreeting('John', 5000);
  
        jest.advanceTimersByTime(3000);
  
        const pendingCheck = new Promise((resolve) => {
          setTimeout(() => resolve('still pending'), 0);
        });
        expect(Promise.race([greetingPromise, pendingCheck])).resolves.toBe('still pending');
      });
    });
  
    describe('processWithCallback()', () => {
      beforeEach(() => {
        jest.useFakeTimers();
      });
  
      afterEach(() => {
        jest.useRealTimers();
      });
  
      test('should process data and invoke callback with the result', (done) => {
        const callback = jest.fn((result) => {
          expect(result).toBe('DATA');
          done();
        });
  
        processWithCallback('data', callback);
  
        jest.advanceTimersByTime(1000);
  
        expect(callback).toHaveBeenCalledTimes(1);
      });
  
      test('should not call callback before processing is complete', () => {
        const callback = jest.fn();
  
        processWithCallback('data', callback);
  
        jest.advanceTimersByTime(500);
  
        expect(callback).not.toHaveBeenCalled();
      });
    });
  });
  