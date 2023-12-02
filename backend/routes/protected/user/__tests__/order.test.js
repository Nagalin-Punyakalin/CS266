const request = require('supertest');
const server = require('../../../../index');
const Purchase = require('../../../../database/Purchase')
jest.mock('../../../../database/Product')
jest.mock('../../../../database/Purchase')

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDE2MTI4MH0.lgHTAj_hx6MuWNXhdxVAFZvVX63MZHY7dg9WC57unkY'

describe('Unit test for get /user/order endpoint',()=>{
  afterEach(()=>{
    server.close()
},10000)
jest.mock('../../../../database/Order')
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

  const Order = require('../../../../database/Order')

  it('should save slip name in DB', async () => {
    // Mocking Order
    const mockOrder = new Order();
    mockOrder.orderID = Math.floor(Math.random() * 1000);
    await mockOrder.save(); 
    console.log('Order ID:', mockOrder.orderID);

    // Mocking Slip
    const mockSlip = {
      buffer: Buffer.from('mock slip content'),
      slipName: 'mock-slip.png',
    };
    console.log('test222222222222222');
    const response = await request(server)
      .post('/slip')
      .field('orderID', mockOrder.orderID)
      //.attach('image', mockSlip.buffer, mockSlip.slipName)
      .set('authorization', `Bearer ${token}`);
    console.log('Response status:' ,response);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Your slip have been uploaded');

    
    const updatedOrder = await Order.findOne({ orderID: mockOrder.orderID });
    console.log('Slip name:', updatedOrder.slipName);
    expect(updatedOrder.slipName).toBe(mockSlip.slipName);
  });

})