const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Bike = db.bike;

exports.create = async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
        throw 'User not found';
    }

    const newBike = new Bike({
        brand: req.body.brand,
        registration: req.body.registration,
        size: req.body.size,
        color: req.body.color,
        owner: user._id
    });

    const created = await newBike.save();

    if(!created) throw 'Error al crear bike';

    res.send({ message: "Bike was registered successfully!" });
};

exports.getAll = async(req, res) => {
    const user = await User.findOne({ username: req.params.username });
    const bikes = await Bike.find({ owner: user.id});
    res.send(bikes);
};