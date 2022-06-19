const orderRoutes = require('./orderRouters');

exports.getRoutes = (routes) => {
    
    orderRoutes.appendOrderRoutes(routes);

    return routes;
}