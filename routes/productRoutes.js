module.exports = (app) => {
    const products = require('../controller/productController.js');
  
    // Create a new Product
    app.post('/api/products', products.create);
  
    // Retrieve all Products
    app.get('/api/products', products.findAll);
  
    // Retrieve a single Product with productId
    app.get('/api/products/:productId', products.findOne);
  
    // Update a Product with productId
    app.put('/api/products/:productId', products.update);
  
    // Delete a Product with productId
    app.delete('/api/products/:productId', products.delete);
  };
  