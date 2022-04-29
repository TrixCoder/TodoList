const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema({
    theme: String,
    currentStyle: Array
}, { timestamps: true });

module.exports = theme = mongoose.model("theme", themeSchema);