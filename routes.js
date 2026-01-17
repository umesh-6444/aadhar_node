import express from "express";
import { getAadharList } from "./aadharcontroller.js";

const router = express.Router();

router.post("/search", getAadharList);

export default router;
