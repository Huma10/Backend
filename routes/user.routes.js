const UserController = require('../controller/user.controller');
const verifyToken = require('../middlewares/verifyTokens');

function routes(app) {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.get('/api/user/:id',verifyToken, UserController.findUserById);
    app.post('/api/logout', UserController.logout);
    app.put('/api/user/:id',verifyToken, UserController.updateProfile)
};

module.exports = routes;
