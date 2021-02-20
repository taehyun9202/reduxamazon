const Product = require('../models/Product.models');

class ProductController{
    getAll(req, res){
        Product.find({}).sort("type").exec()
            .then(products => res.json(products))
            .catch(err => res.json(err));
    }
    create(req, res){
        const newProduct = new Product(req.body);
        newProduct.save()
        .then(()=> res.json({msg: "Product added"}))
        .catch(err => res.json(err));
    }
    
    getOne(req, res){
        Product.findOne({_id: req.params._id})
            .then(product => res.json(product))
            .catch(err => res.json(err));
    }
    
    delete(req, res){
        Product.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
}

module.exports = new ProductController()