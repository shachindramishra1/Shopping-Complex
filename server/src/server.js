import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const products = [
  { id: "nova-tee", title: "Nova Signature Tee", price: 89, stock: 28, collection: "Streetwear" },
  { id: "atelier-hoodie", title: "Atelier Cloud Hoodie", price: 149, stock: 16, collection: "Women" },
  { id: "satin-bomber", title: "Satin Flux Bomber", price: 220, stock: 9, collection: "Men" }
];

const orders = [];
const users = [{ id: 1, name: "Demo User", email: "demo@veloura.com", role: "user" }];
const coupons = [
  { code: "PINK10", discountPercent: 10 },
  { code: "LUXE15", discountPercent: 15 },
  { code: "RUNWAY20", discountPercent: 20 }
];

app.get("/api/health", (_req, res) => res.json({ status: "ok", service: "Veloura API" }));
app.get("/api/products", (_req, res) => res.json(products));
app.get("/api/orders", (_req, res) => res.json(orders));
app.get("/api/users", (_req, res) => res.json(users));
app.get("/api/coupons", (_req, res) => res.json(coupons));

app.post("/api/orders", (req, res) => {
  const order = { id: `ORD-${Date.now()}`, ...req.body };
  orders.push(order);
  res.status(201).json(order);
});

app.listen(port, () => {
  console.log(`Veloura API running on http://localhost:${port}`);
});
