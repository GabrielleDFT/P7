const mongoose = require ("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.af3bwpu.mongodb.net/groupomania",
        {
    useNewUrlParser: true,
    useUnifiedTopology : true,
        }
    )
    .then(() => console.log('Successfully Connected to MongoDB !'))
    .catch((err) => console.log('Oops - Failed to Connet to MongoDB', err));




