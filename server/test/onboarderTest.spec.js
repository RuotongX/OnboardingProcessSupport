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
    test("It should respond with an array of onboarders", async () => {
        const response = await request(app).get("/onboarder");
        expect(response.statusCode).toBe(200);
        expect(response.body.data.onboarders[0]).toHaveProperty("lastname");
        expect(response.body.data.onboarders[0]).toHaveProperty("firstname");
        expect(response.body.data.onboarders[0]).toHaveProperty("company");
        expect(response.body.data.onboarders[0]).toHaveProperty("team_name");
        expect(response.body.data.onboarders[0]).toHaveProperty("_id");
        // console.log(response.body.data.onboarders[0]);
    })
});

describe("Get / ", () => {
    test("It should respond with a onboarder", async () => {
        const response = await request(app).get("/onboarder/614ec097f605ba1fe81eaf04");
        expect(response.statusCode).toBe(200);
        expect(response.body.data.onboarder).toHaveProperty("lastname");
        expect(response.body.data.onboarder).toHaveProperty("firstname");
        expect(response.body.data.onboarder).toHaveProperty("company");
        expect(response.body.data.onboarder).toHaveProperty("team_name");
        expect(response.body.data.onboarder).toHaveProperty("_id");
        // console.log(response.body.data.onboarder);
    })
});

describe("PATCH / ", () => {
    test("It should respond with a onboarder", async () => {
        firstname = 'SAM';
        const response = await request(app)
            .patch("/onboarder/614ec097f605ba1fe81eaf04")
            .send({ firstname: firstname });
        expect(response.statusCode).toBe(200);
        expect(response.body.data.onboarder.firstname).toBe(firstname);
    })
})
