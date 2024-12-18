import Email from "../emails/email.js";
import catchAsync from "../utils/catchAsync.js";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";
import AppError from "../errorHandlers/appError.js";

// Create Email verification token
export const createVerificationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const verificationToken = jwt.sign(
    { user, activationCode },
    process.env.VERIFY_EMAIL_SECRET,
    {
      expiresIn: process.env.VERIFY_EMAIL_EXPIRES_IN,
    }
  );

  return {verificationToken, activationCode};
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

  const { verificationToken, activationCode } = createVerificationToken(user);


  // Save user to database
  await user.save();

  // Send verification email
  const data = {
    user: { email: user.email },
    activationCode
  };

  await new Email(user, data).sendVerificationLink();

  res.status(201).json({
    success: true,
    verificationToken,
    activationCode,
    message: `Please check your email: ${user.email} to verify your account!`
  });
});

// Verify account endpoint
export const verifyAccount = catchAsync(async (req, res, next) => {

  const verification_token = req.body.activation_token;
  const { activation_Code } = req.body;

  console.log(verification_token, activation_Code);

  // Verify token
  const decoded = jwt.verify(verification_token, process.env.VERIFY_EMAIL_SECRET);

  if (decoded.activationCode != activation_Code)
    return next(new AppError("Invalid activation token. Please try again", 401));

  // console.log(decoded);

  // Find user and update verification status
  const user = await User.findOneAndUpdate(
    { email: decoded.user.email, wallet: decoded.user.wallet },
    { isverified: true },
    { new: true }
  );

  res.status(200).json({
    success: true,
    data: user,
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

// Get user by wallet address
export const getUserByWallet = catchAsync(async (req, res, next) => {
  const { wallet } = req.params;

  const user = await User.findOne({ wallet }).select('-__v');
  console.log(user);

  if (!user) {
    return next(new AppError('No user found with this wallet address', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// Get user by email
export const getUserByEmail = catchAsync(async (req, res, next) => {
  const { email } = req.params;

  const user = await User.findOne({ email }).select('-__v');

  if (!user) {
    return next(new AppError('No user found with this email address', 404));
  }

  res.status(200).json({
    success: true,
    data: user
  });
});

// Check if user exists
export const checkUserExists = catchAsync(async (req, res, next) => {
  const { email, wallet } = req.query;

  if (!email && !wallet) {
    return next(new AppError('Please provide either email or wallet address', 400));
  }

  const query = {};
  if (email) query.email = email;
  if (wallet) query.wallet = wallet;

  const exists = await User.exists(query);

  res.status(200).json({
    success: true,
    exists: !!exists,
    // If user exists, specify which identifier matched
    matchedBy: exists ? Object.keys(query).join(', ') : null
  });
});

export default {
  submitUserDetails,
  verifyAccount,
  sendTipNotification,
  getUserByWallet,
  getUserByEmail,
  checkUserExists
};