const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model : Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //? Creador de la conversacion (owner)
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //? este es el owner que viene desde el token
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0] //? array
    //?  [1] Se edito algo correctamente (si encontro el id)
    //? [0] No se edito nada (porque no encontro el id)
}


const removeConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}

//* createConversation({
//*     title: 'Conversacion Sahid - Evertz',//? Titulo del chat
//*     ownerId: 'db8b69e8-3233-43a0-a0b1-87774ffc8566', //? Evertz como owner
//*     participantId: 'c4a8c88d-37a8-4c38-b251-8cef07c33145' //? Sahid como invitado
//* })
//* .then(data => console.log(data))
//* .catch(err => console.log(err))

module.exports = {
    findAllConversations,
    createConversation, 
    findConversationById,
    updateConversation,
    removeConversation
}
