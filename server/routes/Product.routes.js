const Products = require("../controllers/Product.controllers");

module.exports = app => {
    app.get("/api/products", Products.getAll);
    app.post("/api/products/add", Products.create);
    app.get("/api/products/:_id", Products.getOne);
    app.delete("/api/products/:_id", Products.delete);
}