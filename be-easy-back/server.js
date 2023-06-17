const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: ["http://localhost:4200"],
  credentials: true
}

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "jhonemillan-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
// q6r1vOvf49n7uMdx
const db = require("./app/models");
const Role = db.role;

db.mongoose.set('useFindAndModify', false); 

db.mongoose
  .connect(`mongodb+srv://jhonemillan:q6r1vOvf49n7uMdx@cluster0.birh9ib.mongodb.net/`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require('./app/routes/bike.routes')(app);
require('./app/routes/userinfo.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "URBAN"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'urban' to roles collection");
      });

      new Role({
        name: "ADVENTURE"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'adventure' to roles collection");
      });

      new Role({
        name: "AMATEUR"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'amaateur' to roles collection");
      });
    }
  });
}
