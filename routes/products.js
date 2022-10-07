const express = require('express')
const router = express.Router()
const { products } = require('../products')
const { authUser } = require('../auth')
const { canViewProduct, canDeleteProduct, scopedProduct } = require('../permissions/product')

router.get('/', authUser, (req, res) => {
    res.json(canViewProduct(req.user, products))
  })

  router.delete('/:productId', setProduct, authUser, authDeleteProduct, (req, res) => {
    res.send('Deleted Product')
  })
  
  function setProduct(req, res, next) {
    const productId = parseInt(req.params.productId)
    req.product = products.find(product => product.id === productId)
    
    if (req.product == null) {
      res.status(404)
      return res.send('Product not found')
    }
    next()
  }
  
  function authGetProduct(req, res, next) {
    if (!canViewProduct(req.user, req.product)) {
      res.status(401)
      return res.send('Not Allowed')
    }
  
    next()
  }
  
  function authDeleteProduct(req, res, next) {
    if (!canDeleteProduct(req.user, req.product)) {
      res.status(401)
      return res.send('Not Allowed')
    }
  
    next()
  }
  
  module.exports = router