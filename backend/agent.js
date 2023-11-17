const supertest = require('supertest');
const app = require('./index'); // Replace with the actual path to your Express app file

// Create a SuperTest agent instance
const agent = supertest(app);

// Export the agent for use in other files
module.exports = agent;
