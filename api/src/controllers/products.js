const db = require('../database/database');

exports.createProduct = async (req, res) => {
  try {
    const name = req.body.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const productBrand = req.body.productBrand
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const price = req.body.price;

    const id = await db('products')
      .insert({
        name,
        product_brand: productBrand,
        price,
        is_deleted: false,
        created_at: new Date(),
      })
      .returning('id');
    return res
      .status(200)
      .json({ id: id[0], message: 'Product saved successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error saving product' });
  }
};

exports.showProducts = async (req, res) => {
  try {
    const products = await db('products')
      .select('id', 'name', 'product_brand', 'price')
      .where('is_deleted', '=', false);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, '');
    const product = await db('products')
      .where('id', '=', id)
      .update({ is_deleted: true, deleted_at: new Date().toLocaleString() })
      .returning();
    if (product === 0) {
      return res.status(406).json({ message: 'Product not found' });
    }
    return res
      .status(200)
      .json({ id, message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error deleting product' });
  }
};

exports.indexProduct = async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, '');
    const product = await db('products')
      .where('id', '=', id)
      .select('id', 'name', 'product_brand', 'price', 'is_deleted')
      .first();

    if (product === undefined || product.length === 0) {
      return res.status(406).json({ message: 'Product not found' });
    } else {
      return res.status(200).json(product);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.productsIsDeleted = async (req, res) => {
  try {
    const products = await db('products')
      .select(
        'id',
        'name',
        'product_brand',
        'price',
        'is_deleted',
        'deleted_at',
      )
      .where('is_deleted', '=', true);
    return res.status(200).json(products);
  } catch (error) {
    console.log(error);
    return res.status(400).json('Error in database');
  }
};

exports.reactivateProduct = async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, '');
    const product = await db('products')
      .where('id', '=', id)
      .update({ is_deleted: false, deleted_at: null })
      .returning();
    if (product === 0) {
      return res.status(406).json({ message: 'Product not found' });
    }
    return res
      .status(200)
      .json({ id, message: 'Product reactivated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error reactivated product' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id.replace(/\D/g, '');
    const name = req.body.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const productBrand = req.body.productBrand
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    const price = req.body.price

    const product = await db('products')
      .where('id', '=', id)
      .update({ id, name, product_brand: productBrand, price });

    if (product === 0) {
      return res.status(406).json({ message: 'Product not updated' });
    }
    return res
      .status(200)
      .json({ id, message: 'Product updated successfully' });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: 'Error update product' });
  }
};
