import express from "express"
import {getMessage, sendMessage} from "../controllers/message.controller.js"
import { protectRoutes } from "../moddleware/protectRoute.js";
const router=express.Router();

router.post('/send/:id',protectRoutes, sendMessage)
router.get('/:id',protectRoutes, getMessage)

export default router;