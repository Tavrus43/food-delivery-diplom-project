const express = require('express');
const router = express.Router();
const { createPromo, getPromos, deletePromo } = require('../controllers/promoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, createPromo);
router.get('/', getPromos);
router.delete('/:id', authMiddleware, deletePromo);

module.exports = router;