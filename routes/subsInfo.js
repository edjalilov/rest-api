import express from "express";
const router = express.Router();
import {
  subsGetInfo,
  subsCreateInfo,
  subsGetByMsisdn,
  subsDeleteInfo,
  subsUpdateInfo,
} from "../controllers/subsInfo.js";


router.get("/", subsGetInfo);
router.post("/", subsCreateInfo);
router.get("/:msisdn", subsGetByMsisdn);
router.delete("/:msisdn", subsDeleteInfo);
router.patch("/:msisdn", subsUpdateInfo);

export default router;
