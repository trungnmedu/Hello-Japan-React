import instance from '@middleware/request'

const postRequestConsultancy = async (payload) => {
    const { data } = await instance.post(
        '/consultancy',
        payload
    )
    return data
}

const getAdmin = async () => {
    const { data } = await instance.get(        '/get-admin'    )
    return data
}

export {
    postRequestConsultancy,
    getAdmin
}

