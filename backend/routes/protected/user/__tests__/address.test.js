const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const server = require('../../../../index');
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'

// Mock data for the request
const addressData = {
    _id: 'id',
    houseNumber : 'test',
    village : 'test',
    alley : 'test',
    street : 'test',
    subDistrict : 'test',
    subArea : 'test',
    province : 'test',
    postalCode : 'test',
    phone : 'test'
}

describe('Address Router', () => {
    afterEach(()=>{
        server.close()
    },10000)
    test('should add a new address successfully', async () => {
    // Mock the save method of the Address model
    jest.spyOn(require('../../../../database/Address').prototype, 'save').mockResolvedValueOnce();

    // Send a request to the endpoint
    const response = await request(server)
      .post('/user/address')
      .send(addressData)
      .set('authorization', `Bearer ${token}`);

    // Assert the response
    expect(response.status).toBe(201);
    expect(response.text).toBe("{\"message\":\"Your info have been saved\"}");
  });

  test('should handle internal server error', async () => {
    // Mock the save method of the Address model to throw an error
    jest.spyOn(require('../../../../database/Address').prototype, 'save').mockRejectedValueOnce(new Error('Mocked save error'));

    // Send a request to the endpoint
    const response = await request(server)
      .post('/user/address')
      .send(addressData)
      .set('authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json');

    // Assert the response
    expect(response.status).toBe(500);
    expect(response.text).toBe("{\"message\":\"Internal Server Error\"}");
  });
});