const request = require("supertest");
const mongoose = require('mongoose');
const app = require("../app");
const DB = `mongodb+srv://team-5:infsteam5@cluster0.zsrux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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


describe("GET / ", () => {
    test("It should respond with an array of suggest goals and corresponding suggested activities",
        async () => {
            const response = await request(app).get("/suggest");
            expect(response.statusCode).toBe(200);
            // console.log(response.body.data.suggests[0]);
            expect(response.body.data.suggests[0]).toHaveProperty("high_contribution_activity");
            expect(response.body.data.suggests[0]).toHaveProperty("very_high_contribution_activity");
            expect(response.body.data.suggests[0]).toHaveProperty("goal");
            expect(response.body.data.suggests[0]).toHaveProperty("_id");
            expect(response.body.results).toBe(11);
        })
});