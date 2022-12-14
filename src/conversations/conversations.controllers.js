const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')

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


// createConversation({
//     title: 'Conversacion Sahid - Evertz',//? Titulo del chat
//     ownerId: 'db8b69e8-3233-43a0-a0b1-87774ffc8566', //? Evertz como owner
//     participantId: 'c4a8c88d-37a8-4c38-b251-8cef07c33145' //? Sahid como invitado
// })
// .then(data => console.log(data))
// .catch(err => console.log(err))




