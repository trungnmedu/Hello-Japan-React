const rules = {
    name: /^[\p{L}\s]+$/u,
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    phone: /^\+?[0-9]\d{1,14}$/,
    require: /^[\p{L}\s]+$/u,
    notEmpty: /^\s*\S+\s*$/
}

export default rules