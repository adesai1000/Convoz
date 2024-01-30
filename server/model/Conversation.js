const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
{
    members:{
        type:Array,
    },
});

module.exports = mongoose.model ("Conversation", ConversationSchema);