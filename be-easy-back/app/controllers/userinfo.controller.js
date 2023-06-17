const config = require("../config/auth.config");
const db = require("../models");
const UserInfo = db.userinfo;
const User = db.user;

exports.create = async(req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
        throw 'User not found';
    }

    const userInfo = new UserInfo();

    const updateData = {
        name: req.body.name,
        lastname: req.body.lastname,
        birthday: req.body.birthday,
        height: req.body.height,
        weight: req.body.weight,
    }

    const filter = { user: user.id };

    const created = await UserInfo.findOneAndUpdate(filter, updateData, {
        upsert: true,
        new: true
    });

    if(!created) throw 'Error al crear user info';

    res.send({ message: "User Info was registered successfully!" });
};

exports.getInfo = async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const userInfo = await UserInfo.findOne({ user: user.id});
    res.send(userInfo);

};