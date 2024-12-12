// math.test.js
const { divide, fetchUserData, processNumbers } = require('./math');

describe('Complex Math Functions', () => {
  // Testing divide() with valid and invalid inputs
  describe('divide()', () => {
    test('should return the correct division result', () => {
      expect(divide(10, 2)).toBe(5);
      expect(divide(9, 3)).toBeCloseTo(3);
    });

    test('should throw an error when dividing by zero', () => {
      expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
    });
  });

  // Testing fetchUserData() for asynchronous handling
  describe('fetchUserData()', () => {
    test('should return user data for a valid user ID', async () => {
      const userId = 1;
      const user = await fetchUserData(userId);
      expect(user).toEqual({ id: userId, name: 'John Doe', role: 'Admin' });
    });

    test('should throw an error for missing user ID', async () => {
      await expect(fetchUserData()).rejects.toThrow('User ID is required');
    });
  });

  // Testing processNumbers() with edge cases
  describe('processNumbers()', () => {
    test('should return squares of numbers in an array', () => {
      expect(processNumbers([1, 2, 3])).toEqual([1, 4, 9]);
      expect(processNumbers([-2, 0, 2])).toEqual([4, 0, 4]);
    });

    test('should handle an empty array', () => {
      expect(processNumbers([])).toEqual([]);
    });

    test('should throw a TypeError for invalid input', () => {
      expect(() => processNumbers('not an array')).toThrow(TypeError);
      expect(() => processNumbers(123)).toThrow('Input must be an array');
    });
  });
});
