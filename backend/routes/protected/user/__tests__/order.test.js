const request = require('supertest');
const server = require('../../../../index');
const Purchase = require('../../../../database/Purchase')
const Order = require('../../../../database/Order')
const path = require('path');
const fs = require('fs').promises;
jest.mock('../../../../database/Product')
jest.mock('../../../../database/Order')
jest.mock('../../../../database/Purchase')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'

describe('Unit test for get /user/order endpoint',()=>{
  afterEach(()=>{
    server.close()
},10000)

it('should fetch all the orders in the database', async () => {
  // Mocking the Purchase.find method
  Purchase.find.mockImplementationOnce(() => ({
    populate: jest.fn().mockResolvedValue([
      {
        quantity: 1,
        status: "Pending payment",
        total: 134,
        products: {
          name: 'test',
          price: 100,
          imageName: 'book_1699806339172-279559867.jpg',
        },
        orderID: { orderID: 123 },
      },
    ]),
  }));

  const response = await request(server)
    .get('/user/order')
    .set('authorization', `Bearer ${token}`);

  expect(response.status).toBe(200);
  console.log("response body: " +JSON.stringify(response.body))


  expect(response.body).toEqual([
    [{
      "quantity":1,
      "status":"Pending payment",
      "total":134,
      "productName":"test",
      "orderID":123
    }]
  ]
   );
});


it('should return 500 status when error occurs', async () => {
    
  Purchase.find.mockImplementationOnce(() => (new Error('MongoDB Error')));

const response = await request(server)
    .get('/user/order')
    .set('authorization', `Bearer ${token}`);
      expect(response.status).toBe(500);
      expect(response.body.message).toBe('Internal Server Error, please try again later')
  
});

})

describe('Unit test for post /user/slip endpoint',()=>{
  afterEach(()=>{
    server.close()
  },10000)

  it('should save slip name in DB and save image to backend/public', async () => {
    //Mocking Order.findOne
    Order.findOne = jest.fn().mockImplementationOnce(() => {
      return {
        orderID: 123,
        slipName: 'mock-slip.png',
        save: jest.fn().mockResolvedValue({
          orderID: 123,
          slipName: 'mock-slip.png',
        }),
      };
    });
    //Mocking Purchase.findOne
    Purchase.find.mockImplementationOnce(() => ({
      populate: jest.fn().mockResolvedValue([
        {
         
          quantity: 2,
          status: 'Pending payment',
          total: 200,
         
          orderID: {
           
            orderID: 109,
            __v: 0
          },
          __v: 0
        },
      ]),
    }));
    //Mocking Slip
    const mockSlip = {
      buffer: Buffer.from('mock slip content'),
      slipName: 'mock-slip.png',
    };
    //Use /user/slip API
    const response = await request(server)
      .post('/user/slip')
      .field('orderID', 123)
      .attach('image', mockSlip.buffer, mockSlip.slipName)
      .set('authorization', `Bearer ${token}`);
    console.log('Response message:' , response.body.message);
    //Check status and body.message
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Your slip have been uploaded');

    const publicFolderPath = path.join(__dirname, '../../../../public');
    const filesInPublic = await fs.readdir(publicFolderPath);
    const uploadedFileName = filesInPublic.find(file => file.startsWith('mock-slip'));
    expect(uploadedFileName).toBeDefined();

    await fs.unlink(path.join(publicFolderPath, uploadedFileName))
      .then(() => {
        console.log(`File ${uploadedFileName} is deleted`);
      })
      .catch((error) => {
        console.error(`Can't delete ${uploadedFileName}:`, error);
      });
  });

  it('should handle order not found', async () => {
    // Mock the findOne method of Order to simulate not finding an order
    Order.findOne.mockResolvedValueOnce(null);
    
    const response = await request(server)
      .post('/user/slip')
      .field('orderID', -1)
      .set('authorization', `Bearer ${token}`);
    console.log('Response message:' , response.body.message);

    // Assert the response
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Order not found');
  });

})