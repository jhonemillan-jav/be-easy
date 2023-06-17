const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/bike.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/bike", controller.create);
  app.get('/api/user/:username/bikes', controller.getAll);
};
