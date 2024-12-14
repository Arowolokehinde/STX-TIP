import Email from "../emails/email.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import AppError from "../errorHandlers/appError.js";

// Create Email verification token
export const createVerificationToken = (user) => {
  const verificationToken = jwt.sign(
    { email: user.email, wallet: user.wallet },
    process.env.VERIFY_EMAIL_SECRET,
    {
      expiresIn: process.env.VERIFY_EMAIL_EXPIRES_IN,
    }
  );

  return verificationToken;
};

// Submit user details endpoint
export const submitUserDetails = catchAsync(async (req, res, next) => {
  const { email, wallet } = req.body;

  // Check if email or wallet already exists
  const checkEmail = await User.findOne({ email });
  const checkWallet = await User.findOne({ wallet });

  if (checkEmail) return next(new AppError("Email already exists", 400));
  if (checkWallet) return next(new AppError("Wallet address already exists", 400));

  // Create user without saving
  const user = new User({
    email,
    wallet,
    isverified: false
  });

  const verificationToken = createVerificationToken(user);

  // Generate verification URL
  const verificationURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/verify/${verificationToken}`;

  // Save user to database
  await user.save();

  // Send verification email
  const data = {
    user: { email: user.email },
    verificationURL
  };

  await new Email(user, data).sendVerificationLink();

  res.status(201).json({
    success: true,
    verificationToken,
    message: `Please check your email: ${user.email} to verify your account!`
  });
});

// Verify account endpoint
export const verifyAccount = catchAsync(async (req, res, next) => {

  const { token } = req.body || req.params;

  // Verify token
  const decoded = jwt.verify(token, process.env.VERIFY_EMAIL_SECRET);
  console.log(decoded);

  // Find user and update verification status
  const user = await User.findOneAndUpdate(
    { email: decoded.email, wallet: decoded.wallet },
    { isverified: true },
    { new: true }
  );

  if (!user) {
    return next(new AppError("Invalid verification link", 400));
  }

  res.status(200).json({
    success: true,
    message: "Account verified successfully"
  });
});

// Send tip notification email
export const sendTipNotification = catchAsync(async (req, res, next) => {
  const { senderWallet, recipientWallet, amount } = req.body;

  // Find sender and recipient details
  const sender = await User.findOne({ wallet: senderWallet });
  const recipient = await User.findOne({ wallet: recipientWallet });

  if (!sender || !recipient) {
    return next(new AppError("Invalid wallet address", 400));
  }

  if (!sender.isverified) {
    return next(new AppError("Sender account not verified", 400));
  }

  // Prepare email data
  const data = {
    sender: {
      email: sender.email,
      wallet: senderWallet
    },
    recipient: {
      email: recipient.email,
      wallet: recipientWallet
    },
    amount
  };

  // Send emails to both sender and recipient
  await Promise.all([
    new Email(sender, data).sendTipSentNotification(),
    new Email(recipient, data).sendTipReceivedNotification()
  ]);

  res.status(200).json({
    success: true,
    message: "Tip notification sent successfully"
  });
});

export default {
  submitUserDetails,
  verifyAccount,
  sendTipNotification
};