const router = require('express').Router();
const Address = require('../../../database/Address');
/**
 * @swagger
 * /admin/add-product:
 *   put:
 *     summary: Add a new product if it not already exists
 *     description: Endpoint to add a new product with image.
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       '201':
 *         description: Product added successfully
 *       '409':
 *         description: Product already exists in the store
 *       '500':
 *         description: Internal server error, please try again later
 */
router.post('/Address', async (req, res) => {
  try {
    const { useraddress } = req.body;
    console.log('Request Body:', req.body);
    const UserAddress = Address({
      useraddress
    })
    await UserAddress.save();

    res.status(200).json(UserAddress);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
