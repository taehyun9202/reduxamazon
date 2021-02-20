const Users = require("../controllers/User.controllers");
const auth = require("../config/middleware");

module.exports = app => {
    app.post("/api/signUp", Users.register);
    app.post("/api/signIn",  Users.login);
    app.get("/api/users/", auth, Users.getAll)
    app.get("/api/users/:_id", auth, Users.getOne)
    app.delete("/api/users/:_id", Users.delete)
    app.put("/api/users/:_id", Users.update);
}