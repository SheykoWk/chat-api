const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? users - messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //? users - conversations

    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //? usuarios - participaciones tabla pivote entre users - conversations
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //? conversations - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? conversataions - participants tabla pivote entre users - conversations
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)

}

module.exports = initModels