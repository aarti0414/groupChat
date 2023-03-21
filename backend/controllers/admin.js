const bycrypt = require('bcryptjs');

const User = require('../models/user');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

function generateAccessToken(id) {
  return jwt.sign(id, process.env.TOKEN_SECRET);
}

exports.signup = (req, res) => {

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
          res.status(403).json({ success: false, message: 'Error while Signing up!' });
        })
    })
  })
};

exports.login = (req, res) => {

  const { email, password } = req.body;
  User.findAll({ where: { email: email } })
    .then(user => {
      if (user.length > 0) {
        bycrypt.compare(password, user[0].password, function (err, response) {
          if (err) {
            console.log(err);
          }
          if (response) {
            console.log(JSON.stringify(user));
            const jwtToken = generateAccessToken(user[0].id);
            console.log('jwtTokrn: ', jwtToken);
            res.status(200).json({ token: jwtToken, userId: user[0].id, success: true, message: 'successfully logged in' });
          }
          else {
            return res.status(401).json({ success: false, message: 'Wrong Password' });
          }
        })
      } else {
        return res.status(404).json({ success: false, message: 'User does not exist, Please sign up!' });
      }
    })
};

