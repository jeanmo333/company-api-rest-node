import {Router} from 'express';
import {
    signUp,
    signIn
} from '../controllers/AuthController.js';
import { verifyToken ,isAdmin} from '../middlewares/AuthJWT.js';
import { checkRolesExisted} from '../middlewares/VerifySignup.js';

const router = Router();
router.post('/signup',[verifyToken,isAdmin, checkRolesExisted], signUp);
router.post('/signin', signIn);

export default router;