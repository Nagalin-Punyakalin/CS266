const request = require('supertest');
const server = require('../../../../index');
const Purchase = require('../../../../database/Purchase')
jest.mock('../../../../database/Product')
jest.mock('../../../../database/Purchase')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'

describe('Unit test for put /user/purchase endpoint', () => {
    afterEach(()=>{
        server.close()
    },10000)
    it('should successfully confirm orders', async () => {
      const payload = [
        {
          quantity: 2,
          total: 100,
          id: 'product_id_1',
        },
      ];

      jest.spyOn(Purchase.prototype, 'save').mockResolvedValue();
  
      const response = await request(server)
        .put('/user/purchase')
        .send(payload)
        .set('authorization', `Bearer ${token}`)
        
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Your orders have been confirmed');
  
    });

    it('should handle internal server error', async () => {
        const payload = [
          {
            quantity: 2,
            total: 100,
            id: 'product_id_1',
          },
        ];
  
        jest.spyOn(Purchase.prototype, 'save').mockRejectedValue(new Error('Mocked error'));
    
        const response = await request(server)
          .put('/user/purchase')
          .send(payload)
          .set('authorization', `Bearer ${token}`)
          
        expect(response.status).toBe(500)
        expect(response.body).toHaveProperty('message', 'Internal server error, please try again later');
    
      });
});

describe('Unit test for get /user/order endpoint',()=>{
  afterEach(()=>{
    server.close()
},10000)
    it('should fetch all the order in database', async () => {
    
        Purchase.find.mockImplementationOnce(() => ({
          populate: jest.fn().mockResolvedValue([
            {
              quantity: 1,
              status: "Pending payment",
              total: 134,
              products: {
                name: "test1",
              },
            },
          ]),
        }));

      const response = await request(server)
          .get('/user/order')
          .set('authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual([{
            quantity: 1,
            status: "Pending payment",
            total: 134,
            name: "test1" 
      }])
});

it('should return 500 status when error occurs', async () => {
    
  Purchase.find.mockImplementationOnce(() => (new Error('MongoDB Error')));

const response = await request(server)
    .get('/user/order')
    .set('authorization', `Bearer ${token}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error, please try again leter')
  
});

})