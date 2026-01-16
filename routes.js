import express from "express";
import { getAadharList } from "./aadharcontroller.js";

const router = express.Router();

router.get("/", getAadharList);

export default router;
