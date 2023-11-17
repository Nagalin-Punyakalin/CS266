const request = require('supertest');
const server = require('../index');
const Account = require('../database/Address')
const bcrypt = require('bcryptjs')
jest.mock('../../../../database/Address')

describe("Unit test for login", () => {
    afterEach(()=>{
        server.close()
    })
    it('should return jwt with valid username and password', async () => {
      Account.findOne.mockImplementationOnce(()=>({
        username : 'user',
        password : 'password'
      }))
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const response = await request(server)
            .post('/login')
            .send({
                username: 'user',
                password: 'password'
            });
    
        expect(response.status).toBe(200);
    });

    it('should return 401 with invalid username and password', async () => {
        Account.findOne.mockImplementationOnce(()=>null)
        const response = await request(server)
              .post('/login')
              .send({
                  username: 'invalid',
                  password: 'password'
              });
      
          expect(response.status).toBe(401);
      });
});