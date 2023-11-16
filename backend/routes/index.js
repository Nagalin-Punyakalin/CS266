const router = require('express').Router();
const admin = require('./protected/admin/index');
const user = require('./protected/user/index');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Account = require('../database/Account');
const isAuthenticated = require('./middleware');
require('dotenv').config();

router.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
       
        const account = await Account.findOne({ username: username });

        if (account && (await bcrypt.compare(password, account?.password))) {
            const payload = { username: account.username, role: account.role }; 
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            return res.status(200).json({ token: token,role: account.role});
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: 'Internal server errors, please try again later', 
        });
    }

    res.status(401).json({ message: 'Invalid username or password' });
}); 


router.use(isAuthenticated)
router.get('/checkauth',(req,res)=>{
    res.sendStatus(200)
})
router.use('/admin', admin);
router.use('/user', user);

module.exports = router;
