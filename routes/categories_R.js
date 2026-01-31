const express = require('express');
const router = express.Router();
const { getAllCategories, addCategory, getCategory, deleteCategory, updateCategory } = require('../controller/Categories_C');
const { validValues, isValidId } = require('../middelware/Categories_MID');
const { isLoggedIn } = require('../middelware/auth_MID');

router.get('/', isLoggedIn, getAllCategories);
router.post('/', isLoggedIn, validValues, addCategory);
router.get('/:id', isLoggedIn, isValidId, getCategory);
router.delete('/:id', isLoggedIn, isValidId, deleteCategory);
router.patch('/:id', isLoggedIn, isValidId, validValues, updateCategory);

module.exports = router;
