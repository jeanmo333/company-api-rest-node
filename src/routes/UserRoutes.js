import {Router} from 'express';

import { CreateUser } from '../controllers/UserControllers.js';
import { verifyToken ,isAdmin} from '../middlewares/AuthJWT.js';
import { checkRolesExisted} from '../middlewares/VerifySignup.js';

const router = Router();

router.post('/',[verifyToken,isAdmin, checkRolesExisted], CreateUser);

export default router;