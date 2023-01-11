import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveUserFriend,
} from "../controllers/user.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//update
router.post("/:id/:friendId", verifyToken, addRemoveUserFriend);

export default router;
