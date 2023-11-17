const request = require('supertest');
const app = require('../../../../index');
const path = require('path')
const fs = require('fs');
const Product = require('../../../../database/Product')

jest.mock('../../../../database/Product')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'
afterEach(() => {
    const testFiles = fs.readdirSync(path.join(__dirname, '../../../../public'));

    testFiles.forEach(file => {
        if (file.startsWith('test')) {
            const filePath = path.join(path.join(__dirname, '../../../../public'), file);
            fs.unlinkSync(filePath);
            console.log(`Deleted: ${filePath}`);
        }
    });
});

describe('Unit test for adding a new product', () => {
    
    it('should send a status code of 201 when adding a new product', async () => {
      Product.findOne.mockImplementationOnce(()=>null)
        const response = await request(app)
            .put('/admin/product')
            .set('authorization', `Bearer ${token}`)
            .field('name', 'demo')
            .field('price', 20)
            .attach('image', path.join(__dirname,'test.jpg'));

        expect(response.status).toBe(201);
    });

    it('should send a status code of 409 when adding an existing product', async () => {
        Product.findOne.mockImplementationOnce(()=>({
            name: "conflict",
            price: 30,
            imageUrl:"path"
        }))
          const response = await request(app)
              .put('/admin/product')
              .set('authorization', `Bearer ${token}`)
              .field('name', 'conflict')
              .field('price', 30)
              .attach('image', path.join(__dirname,'test.jpg'));
  
          expect(response.status).toBe(409);
      });

      it('should send a status code of 500 when error occur', async () => {
        Product.findOne.mockImplementationOnce(() => {
            throw new Error('MongoDB error');
        });
        
          const response = await request(app)
              .put('/admin/product')
              .set('authorization', `Bearer ${token}`)
              .field('name', 'demo')
              .field('price', 20)
              .attach('image', path.join(__dirname,'test.jpg'));
          expect(response.status).toBe(500);
      });

     it('should send a status code of 400 when the data is incomplete',async()=>{
        const response = await request(app)
              .put('/admin/product')
              .set('authorization', 'Bearer ' + token)

        expect(response.status).toBe(400)
      })
});