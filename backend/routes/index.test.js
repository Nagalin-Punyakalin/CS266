const request = require('supertest');
const server = require('../index');
const Account = require('../database/Account')
const bcrypt = require('bcryptjs')
jest.mock('../database/Account')

describe("Unit test for login", () => {
    afterEach(()=>{
        server.close()
    })
    it('should return jwt with valid username and password', async () => {
      Account.findOne.mockImplementationOnce(()=>({
        username : 'user',
        password : 'password',
        role : 'user'
      }))
      jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
      const response = await request(server)
            .post('/login')
            .send({
                username: 'user',
                password: 'password'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('role');
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
          expect(response.body.message).toEqual('Invalid username or password')
      });

      it('should return 500 when error occurs',async()=>{
        Account.findOne.mockImplementationOnce(() => {
            throw new Error('MongoDB error');
        });
        const response = await request(server)
              .post('/login')
              .send({
                  username: 'user',
                  password: 'password'
              });
      
          expect(response.status).toBe(500);
          expect(response.body.message).toEqual('Internal server errors, please try again later')

      })
});