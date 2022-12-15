const { findParticipantConversations } = require('../participants/participants.controller')

const participantValidate = (req, res, next) => {
    const conversationId = req.params.conversation_id
    const userId = req.user.id

    findParticipantConversations(userId, conversationId)
        .then(data => {
            if(data){
                next()
            } else {
                res.status(400).json({message: "You're not participant from this conversation"})
            }
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}


module.exports = participantValidate
