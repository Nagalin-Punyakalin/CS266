const request = require('supertest');
const server = require('../../../../index');
const Product = require('../../../../database/Product')
const Purchase = require('../../../../database/Purchase')
jest.mock('../../../../database/Product')
jest.mock('../../../../database/Purchase')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'
describe("Unit test for get /user/product endpoint", () => {
    afterEach(()=>{
        server.close()
    },10000)
    it('should fetch all the product in database', async () => {
      // Mocking the Product.find method
      Product.find.mockImplementationOnce(() => ([{
          _id: 'id',
          name: 'product1',
          price: 20,
          imageName: 'image'
      }]));
  
      // Making a request to the endpoint
      const response = await request(server)
          .get('/user/product')
          .set('authorization', `Bearer ${token}`);
  
      // Expecting a 200 status code
      expect(response.status).toBe(200);
  
      // Parsing the response body as JSON
      console.log(response.body)
     expect(response.body).toEqual([{
      id: expect.any(String),
       name: 'product1', 
       price: 20, 
       imageName: 'image' 
     }])
  });

    it('should handle internal error for fethcing product', async () => {
        Product.find.mockImplementationOnce(()=>{
            throw new Error('MongoDB error')
        })
          const response = await request(server)
              .get('/user/product')
              .set('authorization', `Bearer ${token}`)

          expect(response.status).toBe(500);
          expect(response.body.message).toBe('Unable to fetch data, please try again later')
      });
});
