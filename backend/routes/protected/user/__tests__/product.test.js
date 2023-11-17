const request = require('supertest');
const server = require('../../../../index');
const Product = require('../../../../database/Product')
const Purchase = require('../../../../database/Purchase')
jest.mock('../../../../database/Product')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'
describe("Unit test for get /user/product endpoint", () => {
    afterEach(()=>{
        server.close()
    })
    it('should fetch all the product in database', async () => {
      Product.find.mockImplementationOnce(()=>([{
        name: 'product1',
        price: 20,
        imageName: 'image'
      }]))
        const response = await request(server)
            .get('/user/product')
            .set('authorization', `Bearer ${token}`)
            

        expect(response.status).toBe(200);
    });

    it('should handle internal error for fethcing product', async () => {
        Product.find.mockImplementationOnce(()=>{
            throw new Error('MongoDB error')
        })
          const response = await request(server)
              .get('/user/product')
              .set('authorization', `Bearer ${token}`)
          expect(response.status).toBe(500);
      });
});

describe('Unit test for put /user/purchase endpoint', () => {
    afterEach(()=>{
        server.close()
    })
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