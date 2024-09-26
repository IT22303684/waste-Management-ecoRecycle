import { Router } from "express";
import { getApplicationStats, getCurrentUser, updateUser , getAllUsers , deleteUser } from "../Controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/ValidatorMiddleware.js";
import { authorizePermissions } from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
const router = Router();


router.get('/getAllusers', getAllUsers);
router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [authorizePermissions('admin'), getApplicationStats]);
router.patch('/update-user',upload.single('avatar') , validateUpdateUserInput, updateUser);
router.delete('/:id', deleteUser);

export default router;