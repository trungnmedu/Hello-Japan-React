import instance from '@middleware/request'

const getAllConsultancy = async () => {
    const { data } = await instance.get('/consultancy')
    return data
}

const updateConsultancy = async (payload) => {
    const { data } = await instance.put(
        '/consultancy',
        payload
    )
    return data
}

const addPartner = async (payload) => {
    const { data } = await instance.post(
        '/partner',
        payload
    )
    return data
}

const deletePartner = async (payload) => {
    const { data } = await instance.delete(
        '/partner',
        { data: payload }
    )
    return data
}

const getAllConversations = async () => {
    const { data } = await instance.get('/conversations')
    return data
}

const getConversationByClientId = async (params) => {
    const { data } = await instance.get(
        '/conversations',
        { params }
    )
    return data
}


const getAllProcedure = async () => {
    const { data } = await instance.get('/admin/procedure')
    return data
}
const updateProcedure = async (payload) => {
    const { data } = await instance.put(
        '/admin/procedure',
        payload
    )
    return data
}

export {
    addPartner,
    deletePartner,
    updateProcedure,
    getAllProcedure,
    getAllConsultancy,
    updateConsultancy,
    getAllConversations,
    getConversationByClientId
}

