function JoiErrorMessage (error) {
    if(error && error.details && error.details.length > 0) {
        return error.details[0].message
    }
    return null;
}

// export this function
module.exports = {  
    JoiErrorMessage
}
