import instance from '@middleware/request'

const getAllConsultancy = async () => {
    const {data} = await instance.get('/consultancy')
    return data
}

const updateConsultancy = async (payload) => {
    const {data} = await instance.put(
        '/consultancy',
        payload
    )
    return data
}

const addPartnerStudy = async (payload) => {
    const {data} = await instance.post(
        '/partner-study',
        payload
    )
    return data
}


const deletePartnerStudy = async (payload) => {
    const {data} = await instance.delete(
        '/partner-study',
        {data: payload}
    )
    return data
}

const getAllConversations = async () => {
    const {data} = await instance.get('/conversations')
    return data
}

const getConversationByClientId = async (params) => {
    const {data} = await instance.get(
        '/conversations',
        {params}
    )
    return data
}

export {
    getAllConsultancy,
    deletePartnerStudy,
    updateConsultancy,
    addPartnerStudy,
    getAllConversations,
    getConversationByClientId
}

