import express from "express";
import
    {
        sendTipNotification,
        submitUserDetails,
        verifyAccount,
        getUserByWallet,
        getUserByEmail,
        checkUserExists
    } from "../controllers/UserController.js";

const router = express.Router();

router.route("/verify-account").post(verifyAccount);

router.route("/connect-wallet").post(submitUserDetails);

router.route("/send-tip").post(sendTipNotification);

router.route("/wallet/:wallet").get(getUserByWallet);

router.route("/email/:email").get(getUserByEmail);

router.route("/exists").get(checkUserExists);

export default router;
