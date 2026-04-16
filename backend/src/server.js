import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { connectDatabase } from "./config/db.js";
import { loadEnv } from "./config/env.js";
import { User } from "./models/User.js";
import { authRoutes } from "./routes/authRoutes.js";
import { sanitizeUser } from "./utils/auth.js";

loadEnv();

const app = express();
const port = Number(process.env.PORT || 4000);
const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: corsOrigin }));
app.use(express.json({ limit: "10mb" }));

const products = [
  { id: "nova-tee", title: "Nova Signature Tee", price: 89, stock: 28, collection: "Streetwear" },
  { id: "atelier-hoodie", title: "Atelier Cloud Hoodie", price: 149, stock: 16, collection: "Women" },
  { id: "satin-bomber", title: "Satin Flux Bomber", price: 220, stock: 9, collection: "Men" },
];

const orders = [];
const coupons = [
  { code: "PINK10", discountPercent: 10 },
  { code: "LUXE15", discountPercent: 15 },
  { code: "RUNWAY20", discountPercent: 20 },
];

app.get("/api/health", (_req, res) =>
  res.json({
    status: "ok",
    service: "SM Signature API",
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  })
);

app.use("/api/auth", authRoutes);

app.get("/api/products", (_req, res) => res.json(products));
app.get("/api/orders", (_req, res) => res.json(orders));
app.get("/api/coupons", (_req, res) => res.json(coupons));

app.get("/api/users", async (_req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users.map(sanitizeUser));
  } catch (error) {
    res.status(500).json({ message: "Unable to load users right now." });
  }
});

app.post("/api/orders", (req, res) => {
  const order = { id: `ORD-${Date.now()}`, ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`SM Signature API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start API:", error.message);
    process.exit(1);
  }
}

startServer();
