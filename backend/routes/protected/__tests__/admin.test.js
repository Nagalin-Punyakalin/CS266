const request = require('supertest');
const app = require('../../../index');
const path = require('path')
const Product = require('../../../database/Product')

jest.mock('../../../database/Product')
describe('Test admin API', () => {
    it('should send a status code of 201 when adding a new product', async () => {
      Product.findOne.mockImplementationOnce(()=>null)
        const response = await request(app)
            .put('/add-product')
            .field('name', 'demo')
            .field('price', 20)
            .attach('test', path.join(__dirname,'test.jpg'));

        expect(response.status).toBe(201);
    });

    it('should send a status code of 409 when adding an existing product', async () => {
        Product.findOne.mockImplementationOnce(()=>({
            name: "conflict",
            price: 30,
            imageUrl:"path"
        }))
          const response = await request(app)
              .put('/add-product')
              .field('name', 'conflict')
              .field('price', 30)
             .attach('test', path.join(__dirname,'test.jpg'));
  
          expect(response.status).toBe(409);
      });

      it('should send a status code of 500 when error occur', async () => {
        Product.findOne.mockImplementationOnce(() => {
            throw new Error('MongoDB error');
          });
          const response = await request(app)
              .put('/add-product')
              .field('name', 'demo')
              .field('price', 20)
             .attach('test', path.join(__dirname,'test.jpg'));
          expect(response.status).toBe(500);
      });
});