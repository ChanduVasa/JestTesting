// app.js
const { fetchUsers, fetchUserById } = require('./api');

async function getAllUserNames() {
  const users = await fetchUsers();
  return users.map((user) => user.name);
}

async function getUserDetails(userId) {
  const user = await fetchUserById(userId);
  return {
    name: user.name,
    email: user.email,
  };
}


// Simulates a function that fetches user data and filters them based on a condition
async function getFilteredUsersByName(substring) {
  const users = await fetchUsers();
  return users.filter((user) => user.name.includes(substring));
}

// Simulates a function that uses a delay
async function delayedGreeting(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Hello, ${name}!`);
    }, delay);
  });
}

// Simulates a callback-based asynchronous function
function processWithCallback(data, callback) {
  setTimeout(() => {
    callback(data.toUpperCase());
  }, 1000);
}




module.exports = { getAllUserNames, getUserDetails,  getFilteredUsersByName,
    delayedGreeting,
    processWithCallback, }; // Ensure these are exported
