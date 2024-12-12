// math.js

// A function that performs division and throws an error for invalid inputs
function divide(a, b) {
    if (b === 0) {
      throw new Error('Cannot divide by zero');
    }
    return a / b;
  }
  
  // A function that simulates fetching user data (async function)
  async function fetchUserData(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    return { id: userId, name: 'John Doe', role: 'Admin' };
  }
  
  // A function that processes a list of numbers and returns their squares
  function processNumbers(numbers) {
    if (!Array.isArray(numbers)) {
      throw new TypeError('Input must be an array');
    }
    return numbers.map((num) => num ** 2);
  }
  
  module.exports = { divide, fetchUserData, processNumbers };
  