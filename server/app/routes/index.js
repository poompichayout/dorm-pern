const jwtAuth = require('./jwtAuth');
const userRoute = require('./user.routes');
const adminRoute = require('./admin.routes');

module.exports = {
    jwtAuth,
    userRoute,
    adminRoute
}