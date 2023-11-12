// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://admin:admin@cluster0.bajxvvr.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true }); 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors());
app.use(bodyParser.json());

// Define the Address schema
const addressSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
});

const Address = mongoose.model('Address', addressSchema);

// API endpoint to add an address
app.post('/api/addAddress', (req, res) => { 
  const { name, address, phone } = req.body;

  const newAddress = new Address({
    name,
    address,
    phone,
  });

  newAddress.save((err, address) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).json({ message: 'Address added successfully', address });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
