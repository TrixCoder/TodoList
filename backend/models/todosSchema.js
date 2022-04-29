const mongoose = require("mongoose");

const todosSchema = new mongoose.Schema({
    sno: Number,
    title: String,
    description: String
}, { timestamps: true });

module.exports = todos = mongoose.model("todos", todosSchema);