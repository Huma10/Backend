const Response = require("../service/Response");
const jsonwebtoken = require('jsonwebtoken');
const response = new Response();
const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send(response.response(401,'Unauthorized','Token is missing in header','error'));
    }
    // Read the headers data
    const headers = req.headers.authorization; // Bearer Token-Value
    // Split headers value
    let receivedToken = headers.split(" ")[1]; // Bearer Token-Value, [1] means a token value

    jsonwebtoken.verify(receivedToken, process.env.JWT_SECRET, (err, decoded) => {
        if(err){
            return res.status(401).send(response.response(401,'Unauthorized','Invalid Token','error'));
        }
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;