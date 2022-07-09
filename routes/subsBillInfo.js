import express from "express";
const router = express.Router();
import {
  subsGetBillInfo,
  subsCreateBillInfo,
  subsGetBillInfoByMsisdn,
  subsDeleteBillInfo,
} from "../controllers/subsBillInfo.js";

router.get("/", subsGetBillInfo);
router.post("/", subsCreateBillInfo);
router.get("/:msisdn", subsGetBillInfoByMsisdn);
router.delete("/:msisdn", subsDeleteBillInfo);

export default router;
