import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost,deletePost,commentOnPost,likeUnlikePost,getAllPosts,getlikePost , getFollowingPosts , getUserPosts} from "../controllers/post-controllers.js";

const router = express.Router();

router.get("/all", protectRoute, getAllPosts);

router.post("/create", protectRoute, createPost);
router.get("/following", protectRoute, getFollowingPosts);
router.get("/likes/:id", protectRoute, getlikePost);
router.get("/user/:username", protectRoute, getUserPosts);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/comment/:id", protectRoute, commentOnPost);
router.delete("/:id", protectRoute, deletePost);

export default router;