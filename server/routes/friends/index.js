import {Router} from 'express';
import * as controller from './friends.controller';

const router = Router();

router.get('/searchNew', controller.searchNewFriends);
router.get('/getAll', controller.getFriends);
router.get('/getRequestsSentToMe', controller.getRequestsSentToMe);
router.post('/sendRequest', controller.sendFriendRequest);
router.post('/acceptRequest', controller.acceptFriendRequest);
router.delete('/removeFriend', controller.removeFromFriends);

module.exports = router;