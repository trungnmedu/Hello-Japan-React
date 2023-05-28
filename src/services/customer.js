import instance from '@middleware/request'

const postRequestConsultancy = async (payload) => {
    const { data } = await instance.post(
        '/consultancy',
        payload
    )
    return data
}

const getAdmin = async () => {
    const { data } = await instance.get('/get-admin')
    return data
}

const createProcedure = async (payload) => {
    const { data } = await instance.post('/procedure', payload)
    return data
}

const getAllProcedure = async () => {
    const { data } = await instance.get('/procedure')
    return data
}
export {
    getAdmin,
    getAllProcedure,
    createProcedure,
    postRequestConsultancy
}

