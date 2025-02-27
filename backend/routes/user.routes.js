import express from "express"
import { protectRoute } from "../middleware/protectRoute.js"; 
import {getUserProfile,followUnfollowUser,getsuggestedUsers,updateUserProfile, getFollowingUser,getFollowerUser} from "../controllers/user-controllers.js";

const router = express.Router();

router.get("/profile/:username", protectRoute, getUserProfile);
router.get("/suggested", protectRoute, getsuggestedUsers);
router.post("/follow/:id", protectRoute, followUnfollowUser);
router.get("/following/:id",protectRoute, getFollowingUser);
router.get("/follower/:id",protectRoute, getFollowerUser);
router.post("/update", protectRoute, updateUserProfile);

export default router;