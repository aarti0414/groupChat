const bycrypt = require('bcryptjs');

const User = require('../models/user');
const { Op } = require('sequelize');

exports.signup = (req, res) => {
    console.log('req: ', req.body);
    const { name, email, phone, password } = req.body;

    const saltRounds = 10;
    bycrypt.genSalt(saltRounds, function (err, salt) {
        bycrypt.hash(password, salt, function (err, hash) {
            if (err) {
                console.log(err);
                res.status({ message: 'something went wrong' });
            }
            User.findOne({
                where: {
                    [Op.or]: [
                        { name: name },
                        { email: email }
                    ]
                }
            })
                .then((user) => {
                    if (user && user.email == email) {
                        return res.status(201).json({ success: true, message: 'Email Already Exists!' });
                    }
                    else if (user && user.name == name) {
                        return res.status(201).json({ success: true, message: 'User name Already Exists!' });
                    }
                    return User.create({ name, email, phone, password: hash })
                })
                .then(() => { res.status(201).json({ success: true, message: 'Successfully New User Created' }) })
                .catch((err) => {
                    console.log(err);
                    res.status(403).json({ success: false, message: 'Error' });
                })
        })
    })
};
