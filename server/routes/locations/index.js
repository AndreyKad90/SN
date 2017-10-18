import {Router} from 'express';
import * as controller from './locations.controller';

const router = Router();

router.get('/countries', controller.getCountries);

module.exports = router;
