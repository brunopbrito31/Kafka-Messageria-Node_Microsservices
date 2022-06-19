const orderController = require('../controllers/orderController')

exports.appendOrderRoutes = ( routes ) => {
    routes.post('/api/v1/orders/', orderController.generateNewOrder)
}