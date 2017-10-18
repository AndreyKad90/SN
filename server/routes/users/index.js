import {Router} from 'express';
import * as controller from './users.controller';

const router = Router();

router.post('/register', controller.registerUser);
router.get('/getAll', controller.getUsers);
router.get('/getMe', controller.getMe);
router.get('/:id', controller.getUser);
router.put('/', controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;