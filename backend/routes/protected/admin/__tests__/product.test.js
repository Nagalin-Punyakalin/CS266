const request = require('supertest');
const server = require('../../../../index');
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
},10000);

afterEach(()=>{
    server.close()
},10000)
describe("Unit test for admin's product endpoint", () => {
    
    it('should send a status code of 201 when adding a new product', async () => {
      Product.findOne.mockImplementationOnce(()=>null)
        const response = await request(server)
            .put('/admin/product')
            .set('authorization', `Bearer ${token}`)
            .field('name', 'demo')
            .field('price', 20)
            .attach('image', path.join(__dirname,'test.jpg'));

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('Product added successfully')
    });

    it('should send a status code of 409 when adding an existing product', async () => {
        Product.findOne.mockImplementationOnce(()=>({
            name: "conflict",
            price: 30,
            imageName:"path"
        }))
          const response = await request(server)
              .put('/admin/product')
              .set('authorization', `Bearer ${token}`)
              .field('name', 'conflict')
              .field('price', 30)
              .attach('image', path.join(__dirname,'test.jpg'));
  
          expect(response.status).toBe(409);
          expect(response.body.message).toBe('Your product is already exists in the store')
      });

      it('should send a status code of 500 when error occur', async () => {
        Product.findOne.mockImplementationOnce(() => {
            throw new Error('MongoDB error');
        });
        
          const response = await request(server)
              .put('/admin/product')
              .set('authorization', `Bearer ${token}`)
              .field('name', 'demo')
              .field('price', 20)
              .attach('image', path.join(__dirname,'test.jpg'));

          expect(response.status).toBe(500);
          expect(response.body.message).toBe('Internal server error, please try again later')
      });

     it('should send a status code of 400 when the data is incomplete',async()=>{
        const response = await request(server)
              .put('/admin/product')
              .set('authorization', 'Bearer ' + token)

        expect(response.status).toBe(400)
        expect(response.body.message).toBe('Something went wrong , please try again later')
      })
});