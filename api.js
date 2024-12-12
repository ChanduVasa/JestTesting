// api.js
const axios = require('axios');

async function fetchUsers() {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  return response.data;
}

async function fetchUserById(userId) {
  const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`);
  return response.data;
}

module.exports = { fetchUsers, fetchUserById };
