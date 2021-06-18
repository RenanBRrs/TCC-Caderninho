const express = require('express');
const { login, logout } = require('../controllers/auth');
const {
  createColaborator,
  showColaborators,
  deleteColaborator,
  indexColaborator,
  colaboratorsIsDeleted,
  reactivateCollaborator,
  updateColaborator,
} = require('../controllers/colaborators');
const {
  createCustomer,
  showCustomers,
  deleteCustomer,
  indexCustomer,
  customersIsDeleted,
  reactivateCustomer,
  updateCustomer,
  newId,
} = require('../controllers/customers');
const {
  createProduct,
  showProducts,
  deleteProduct,
  indexProduct,
  productsIsDeleted,
  reactivateProduct,
  updateProduct,
} = require('../controllers/products');
const { createSale, showSales, indexSale } = require('../controllers/sales');
const middleware = require('../middleware/auth');
const routers = express.Router();

routers.get('/', (req, res) => {
  return res.status(200).json({ message: 'success' });
});

routers.post('/login', login);
routers.get('/logout', logout);
routers.post('/colaborators/create', createColaborator);
routers.use(middleware);
/** colaborators */
routers.get('/colaborators/show', showColaborators);
routers.get('/colaborators/show/:email', indexColaborator);
routers.get('/colaborators/delete/show', colaboratorsIsDeleted);
routers.delete('/colaborators/delete/:email', deleteColaborator);
routers.post('/colaborators/reactive/:email', reactivateCollaborator);
routers.put('/colaborators/update/:cpf', updateColaborator);
routers.get('/colaborators/id', newId);
/** customers */
routers.post('/customers/create', createCustomer);
routers.get('/customers/show', showCustomers);
routers.get('/customers/show/:cpf', indexCustomer);
routers.get('/customers/delete/show', customersIsDeleted);
routers.delete('/customers/delete/:cpf', deleteCustomer);
routers.post('/customers/reactive/:cpf', reactivateCustomer);
routers.put('/customers/update/:cpf', updateCustomer);
routers.get('/customers/id', newId);
/** products */
routers.post('/products/create', createProduct);
routers.get('/products/show', showProducts);
routers.get('/products/show/:id', indexProduct);
routers.get('/products/delete/show', productsIsDeleted);
routers.delete('/products/delete/:id', deleteProduct);
routers.post('/products/reactive/:id', reactivateProduct);
routers.put('/products/update/:id', updateProduct);
/** sale */
routers.post('/sales/create', createSale);
routers.get('/sales/show', showSales);
routers.get('/sales/show/:id', indexSale);

module.exports = routers;
