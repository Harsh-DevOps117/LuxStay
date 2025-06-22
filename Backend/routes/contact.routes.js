import express from "express";
import contact  from "../controller/contact.controller.js";
// import requireAuth from "../middleware/roleAuth.js";

const router = express.Router();

router.post("/contact", contact);

export default router;