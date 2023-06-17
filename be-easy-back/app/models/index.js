const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.bike = require('./bike.model');
db.userinfo = require('./userInfo.model');

db.ROLES = ['URBAN', 'ADVENTURE', 'AMATEUR'];

module.exports = db;