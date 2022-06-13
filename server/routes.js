const router = require('express').Router();
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');
const messageController = require('./controllers/messageController');
const roleController = require('./controllers/roleController');
const offerController = require('./controllers/offerController');
const blogController = require('./controllers/blogController');
const articleController = require('./controllers/articleController');
const isAuth = require('./middlewares/isAuth');


router.get('/', (req, res) => {
    res.send('Server is running')
})

router.use('/auth', authController);
router.use('/role', roleController);
router.use('/products', productController);
router.use('/user', userController);
router.use('/offer', offerController);
router.use('/messages', messageController);
router.use('/blog', blogController);
router.use('/article', articleController);


module.exports = router;