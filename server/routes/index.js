import {Router} from 'express';

const router = Router();

router.use('/authentication', require('./authentication'));
router.use('/users', require('./users'));
router.use('/friends', require('./friends'));
router.use('/locations', require('./locations'));

module.exports = router;
