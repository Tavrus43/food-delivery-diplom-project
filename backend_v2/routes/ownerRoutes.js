const express = require('express');
const {
    createOwnerRestaurant,
    updateOwnerRestaurant,
    deleteOwnerRestaurant,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getOwnerRestaurant,
    getOwnerMenuItems,
    getOwnerOrders,
    updateOrderStatus
} = require('../controllers/ownerController');
const ownerMiddleware = require('../middlewares/ownerMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const uploadImage = require('../utils/cloudinary');
const router = express.Router();

router.use(authMiddleware);
router.use(ownerMiddleware);

router.post('/restaurant', upload.single('image'), async (req, res, next) => {
    try {
        if (req.file) {
            const imagePath = req.file.path;
            req.body.imageUrl = await uploadImage(imagePath);
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Failed to upload image', error: error.message });
    }
}, createOwnerRestaurant);

router.put('/restaurant/:id', upload.single('image'), async (req, res, next) => {
    try {
        if (req.file) {
            const imagePath = req.file.path;
            req.body.imageUrl = await uploadImage(imagePath);
        }
        next();
    } catch (error) {
        return res.status(500).json({ msg: 'Failed to upload image', error: error.message });
    }
}, updateOwnerRestaurant);

router.delete('/restaurant/:id', deleteOwnerRestaurant);

router.get('/restaurant', getOwnerRestaurant);

router.post('/menu-item', upload.single('image'), createMenuItem);
router.put('/menu-item/:id', upload.single('image'), updateMenuItem);
router.delete('/menu-item/:id', deleteMenuItem);

router.get('/menu-items', getOwnerMenuItems);

router.get('/orders', getOwnerOrders);
router.put('/orders/:id', updateOrderStatus);

module.exports = router;
