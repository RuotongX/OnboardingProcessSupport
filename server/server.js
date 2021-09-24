const mongoose = require('mongoose');
const app = require('./app');

const DB = `mongodb+srv://team-5:infsteam5@cluster0.zsrux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

//connect to MongoDB
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(con => {
        console.log(con.connection);
        console.log('Database connected at ' + Date.now() + " " + new Date().toLocaleDateString() + " " +
            new Date(new Date("9/23/2021").getTime() + 7 * 24 * 60 * 60 * 1000));
    });

//create the listener
app.listen(3000, () => {
    console.log(`App running on port ${process.env.PORT} `);
});
