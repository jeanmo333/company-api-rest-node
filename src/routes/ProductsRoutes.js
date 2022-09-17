import {Router} from 'express';
import {
    createProduct,
    getProducts,
    getProductById,
    updateProductById,
    deleteProductById
} from '../controllers/ProductsControllers.js';
import { verifyToken ,isAdmin, isModerador} from '../middlewares/AuthJWT.js';

const router = Router();


router.get('/',getProducts);
router.post('/',[verifyToken,isModerador],createProduct);
router.get('/:productId',getProductById);
router.put('/:productId',[verifyToken,isAdmin],updateProductById);
router.delete('/:productId',[verifyToken,isAdmin], deleteProductById);

export default router;