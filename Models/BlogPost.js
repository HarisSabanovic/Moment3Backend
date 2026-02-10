const mongoose = require("mongoose");


const blogPostSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, minlength: 3, maxlength: 100},
        content: {type: String, required: true, minlength: 12 },
        author: {type: String, required: true, minlength: 5, maxlength: 80},
    },

    { timestamps: true }
);

module.exports = mongoose.model("BlogPost", blogPostSchema);
