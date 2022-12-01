import  express from "express";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import  verifyToken  from "../middleware/VerifyToken.js";
import  refreshToken  from "../controllers/RefreshToken.js";
import gpsdata from "../controllers/Gpslocation.js";
const  router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users',Register);
router.post('/login',Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/gpsdata',verifyToken, gpsdata);
export default router;