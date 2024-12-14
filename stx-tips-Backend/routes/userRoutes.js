import express from "express";
import { sendTipNotification, submitUserDetails, verifyAccount } from "../controllers/UserController.js";

const router = express.Router();

router.route("/verify-account").post(verifyAccount);

router.route("/connect-wallet").post(submitUserDetails);

router.route("/send-tip").post(sendTipNotification);

export default router;
