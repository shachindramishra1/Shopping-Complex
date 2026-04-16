import express from "express";
import { User } from "../models/User.js";
import { hashPassword, sanitizeUser, verifyPassword } from "../utils/auth.js";

const router = express.Router();

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeMobile(mobile) {
  return String(mobile ?? "").replace(/\D/g, "");
}

router.post("/signup", async (req, res) => {
  try {
    const name = String(req.body.name ?? "").trim();
    const email = String(req.body.email ?? "").trim().toLowerCase();
    const mobile = normalizeMobile(req.body.mobile);
    const password = String(req.body.password ?? "");

    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "Name, email, mobile number, and password are required." });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Please enter a valid email address." });
    }

    if (mobile.length < 10) {
      return res.status(400).json({ message: "Please enter a valid mobile number." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { mobile }],
    });

    if (existingUser) {
      return res.status(409).json({
        message: existingUser.email === email ? "Email already exists." : "Mobile number already exists.",
      });
    }

    const user = await User.create({
      name,
      email,
      mobile,
      passwordHash: hashPassword(password),
    });

    return res.status(201).json({
      message: "Account created successfully.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to create account right now." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const identifier = String(req.body.identifier ?? "").trim().toLowerCase();
    const password = String(req.body.password ?? "");
    const mobile = normalizeMobile(identifier);

    if (!identifier || !password) {
      return res.status(400).json({ message: "Email or mobile number and password are required." });
    }

    const user = await User.findOne({
      $or: [{ email: identifier }, { mobile }],
    });

    if (!user || !verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    return res.json({
      message: "Login successful.",
      user: sanitizeUser(user),
    });
  } catch (error) {
    return res.status(500).json({ message: "Unable to login right now." });
  }
});

export { router as authRoutes };
