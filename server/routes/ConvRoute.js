const router = require("express").Router();
const Conversation = require("../model/Conversation")


router.post("/", async (req, res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderUsername, req.body.receiverUsername],
    });
    try{
        const savedConversation = await newConversation.save()
        res.status(200).json(savedConversation)
    }
    catch(error){
        res.status(500).json(error)
    }
})

router.get("/:username", async(req,res)=>{
    try{
        const conversation = await Conversation.find({
            members:{ $in:[req.params.username]}
        })
        res.status(200).json(conversation);
    }
    catch(error){
        res.status(500).json(error)
    }
})

module.exports = router;