const Histories = require("../controllers/History.controllers");
const { authenticate } = require("../config/jwt");

module.exports = app => {   
    app.get("/api/history", Histories.getAll);
    app.post("/api/history", Histories.Purchase);
    app.get("/api/history/:userid", Histories.getUserHistory);
    app.get("/api/history/:_id", Histories.getOne);
    app.delete("/api/history/:_id", Histories.delete);
    app.put('/api/history/:_id', Histories.update);
}