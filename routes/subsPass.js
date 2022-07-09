import express from "express";
const router = express.Router();
import {
  subsGetPass,
  subsCreatePass,
  subsGetPassByMsisdn,
  subsDeletePass,
} from "../controllers/subsPass.js";

router.get("/", subsGetPass);
router.post("/", subsCreatePass);
router.get("/:msisdn", subsGetPassByMsisdn);
router.delete("/:msisdn", subsDeletePass);

export default router;
