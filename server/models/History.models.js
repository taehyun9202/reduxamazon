const mongoose = require("mongoose");
const HistorySchema = new mongoose.Schema({
    getuserID:{
        type:String,
        required: true
    },
    item: {
        type: Array,
        default: []
    },
    shipped: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


module.exports = mongoose.model("History", HistorySchema)