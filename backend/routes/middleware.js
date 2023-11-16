const passport = require("../passport/passport-config");
const Account = require('../database/Account')

function isAuthenticated(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }
    
    passport.authenticate('jwt', { session: false }, (err, username) => {
        if (err) {
            console.error(err);
            return res.sendStatus(500);
        }

        if (!username) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        req.username = username;
        return next();
    })(req, res, next);
}

function isSeller(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized - Token missing' });
    }

    passport.authenticate('jwt',{session : false},async(err,id )=>{
        if(err) {
            console.log(err)
            return res.sendStatus(500)
        }

        if(!id) return res.status(401).json({ message: 'Unauthorized - Invalid token' });

        const user = await User.findById(id)
        
        if(user?.role === 'seller') return next()

        return res.status(401).json({ message: 'Unauthorized - Invalid role' });

    })(req,res,next)
}

module.exports = isAuthenticated