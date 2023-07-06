const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));

// Connect to the database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required:true,
  }
});

const exerciseSchema = new mongoose.Schema({
  uId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  duration: {
    type: Number,
  },
  date: {
    type: String,
  },
})

let User = mongoose.model("User", userSchema);
let Exercise = mongoose.model("Exercise", exerciseSchema);

const createUser = (username, done) => {
  User.findOneAndUpdate({ username : username }, { username : username }, { upsert : true, new : true }, (err, updatedUser) => {
    if (err) return console.log(err);
    done(null, updatedUser);
  })
};

const getAllUsers = (done) => {
  User.find({}, (err, users) => {
    if (err) return console.log(err);
    done(null, users);
  })
};

const findUserById = (uId, done) => {
  User.findById(uId, (err, data) => {
    if(err) return console.log(err);
    done(null, data);
  })
};

const createExercise = (uId, description, duration, date, done) => {
  const newExercise = {
    uId : uId,
    description: description,
    duration: duration,
    date : date,
  };
  Exercise.create(newExercise, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
};

const getExercisesByUid = (uId, done) => {
  Exercise.find({uId : uId }, (err, data) => {
    if (err) return console.log(err);
    done(null, data);
  })
}

app.post("/api/users", (req, res) => {
  let username = req.body.username;
  username = username.replace(/\s/g, '');
  createUser(username, (err, data) => {
    if (err) {
      res.json({
        error: "internal error when creating the user",
      })
    } else {
      res.json({
        username: data.username,
        _id: data._id,
      })
    }
  })
});

app.get("/api/users", (req, res) => {
  let usersArray = [];
  getAllUsers((err, data) => {
    if (err) {
      res.json({
        error: "internal error when getting al users",
      })
    } else {
      res.json(data)
    }
  })
})

app.post("/api/users/:_id/exercises", (req, res) => {
  let { description, duration, date } = req.body;
  let _id = req.params._id;
  if (!date) {
    date = new Date();
    date.setDate(date.getDate());
  } else {
    date = new Date(`${date}T00:00:00`);
  }

  findUserById(_id, (err, data) => {
    if (err) {
      res.json({
        error: "internal error when finding user by uId",
      })
    } else {
      let { username } = data;
      createExercise(_id, description, duration, date.toDateString(), (err, data) => {
        if (err) {
          res.json({
            error: "internal error when creating the exercise",
          })
        } else {
          res.json({
            username: username,
            description: data.description,
            duration: data.duration,
            date: data.date,
            _id: _id,
          });
        }
      })

    }
  })
});

app.get("/api/users/:_id/logs", (req, res) => {
 let uId = req.params._id;
 let { from, to, limit } = req.query;
 findUserById(uId,  (err, data) => {
   if (err) {
     res.json({
       error: "internal error when getting the user by its id",
     })
   } else {
     let username = data.username;
     getExercisesByUid(uId, (err, data) => {
       if (err) {
         res.json({
           error: "internal error when getting the exercises by uId",
         })
       } else {
          if (from) {
            data = data.filter((exercise) => {
              return new Date(exercise.date) >= new Date(from);
            })
          };

          if (to) {
            data = data.filter((exercise) => {
              return new Date(exercise.date) <= new Date(to);
            })
          };

         if (limit) {
           data = data.slice(0, limit);
         };

         data = data.map((exercise) => {
            return {
              description: exercise.description,
              duration: exercise.duration,
              date: exercise.date,
            }
         });
         res.json({
           username: username,
           count: data.length,
           _id: uId,
           log: data,
         })
       }
     })
   }
 })
});












const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
