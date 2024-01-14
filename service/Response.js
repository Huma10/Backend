const { response } = require("express");

class Response{
    response(statusCode, codeName, data, flag){
        console.log(statusCode, codeName, data, flag);
        const body = {
            status: statusCode,
            code:codeName
        }
        if(flag=='error'){
            body.error = data;
        }else if(typeof data ==='string'){
            body.message = data;
        }else{
            body.records = data;
        }
        return body;
    }
}
module.exports = Response;