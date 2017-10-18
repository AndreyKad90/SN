import {Router} from 'express';
import * as controller from './authentication.controller';

const router = Router();

router.post('/login', controller.login);

module.exports = router;
