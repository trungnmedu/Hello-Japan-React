const decodeJwt = (token) => {
    console.log(token);
    const [header, payload, signature] = token.split('.')
    console.log(payload);
    return Buffer.from(payload, 'base64')
}

export {
    decodeJwt
};

