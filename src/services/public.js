import instance from "@middleware/request"

const getAllPartner = async (type) => {
    const { data } = await instance.get(
        '/partner',
        {
            params: {
                type
            }
        }
    )
    return data
}

export {
    getAllPartner
}

