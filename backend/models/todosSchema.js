const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
    sno: Number,
    title: String,
    description: String,
    timeLimit: Number
}, { timestamps: true });

module.exports = todos = mongoose.model("todos", todosSchema);