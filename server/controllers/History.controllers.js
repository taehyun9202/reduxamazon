const History = require('../models/History.models');

class HistoryController{
    getAll(req, res){
        History.find({}).sort("-createdAt").exec()
            .then(Historys => res.json(Historys))
            .catch(err => res.json(err));
    }
    Purchase(req, res){
        const newHistory = new History(req.body);
        newHistory.save()
            .then(history => res.json({
                msg: "History added",
                history: history
            }))
            .catch(err => res.json(err));
    }
    getUserHistory(req, res){
        History.find({getuserID: req.params.userid}).sort("-createdAt").exec()
            .then(history => res.json(history))
            .catch(err => res.json(err));
    }
    getOne(req, res){
        History.findOne({_id: req.params._id})
            .then(option => res.json(option))
            .catch(err => res.json(err));
    }
    delete(req, res){
        History.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
    update(req, res){
        History.findOneAndUpdate({_id: req.params._id}, req.body)
            .then(history => res.json(history))
            .catch(err => res.json(err));
    }
}

module.exports = new HistoryController()