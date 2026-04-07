import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { products, promoCodes } from "../data/mockData";

const StoreContext = createContext(null);

const storageKeys = {
  cart: "veloura-cart",
  wishlist: "veloura-wishlist",
  user: "veloura-user",
  orders: "veloura-orders",
  designs: "veloura-designs",
  users: "veloura-users",
  admin: "veloura-admin",
};

const readStorage = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage(storageKeys.cart, []));
  const [wishlist, setWishlist] = useState(() => readStorage(storageKeys.wishlist, []));
  const [currentUser, setCurrentUser] = useState(() => readStorage(storageKeys.user, null));
  const [orders, setOrders] = useState(() => readStorage(storageKeys.orders, []));
  const [savedDesigns, setSavedDesigns] = useState(() => readStorage(storageKeys.designs, []));
  const [users, setUsers] = useState(() =>
    readStorage(storageKeys.users, [
      { name: "Demo User", email: "demo@veloura.com", password: "demo123", role: "user" },
    ])
  );
  const [isAdmin, setIsAdmin] = useState(() => readStorage(storageKeys.admin, false));

  useEffect(() => window.localStorage.setItem(storageKeys.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => window.localStorage.setItem(storageKeys.wishlist, JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => window.localStorage.setItem(storageKeys.user, JSON.stringify(currentUser)), [currentUser]);
  useEffect(() => window.localStorage.setItem(storageKeys.orders, JSON.stringify(orders)), [orders]);
  useEffect(() => window.localStorage.setItem(storageKeys.designs, JSON.stringify(savedDesigns)), [savedDesigns]);
  useEffect(() => window.localStorage.setItem(storageKeys.users, JSON.stringify(users)), [users]);
  useEffect(() => window.localStorage.setItem(storageKeys.admin, JSON.stringify(isAdmin)), [isAdmin]);

  const addToCart = ({ product, size, color, quantity = 1, customization = null }) => {
    const cartId = `${product.id}-${size}-${color}-${customization?.id ?? "standard"}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.cartId === cartId);
      if (existing) {
        return prev.map((item) =>
          item.cartId === cartId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          cartId,
          productId: product.id,
          title: product.title,
          price: product.price,
          image: product.images[0],
          size,
          color,
          quantity,
          customization,
        },
      ];
    });
  };

  const updateCartQuantity = (cartId, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity: Math.max(1, quantity) } : item))
    );
  };

  const removeFromCart = (cartId) => setCart((prev) => prev.filter((item) => item.cartId !== cartId));

  const toggleWishlist = (productId) =>
    setWishlist((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]));

  const signup = ({ name, email, password }) => {
    if (users.some((user) => user.email === email)) {
      return { ok: false, message: "Email already exists." };
    }
    const user = { name, email, password, role: "user" };
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    return { ok: true };
  };

  const login = ({ email, password }) => {
    const user = users.find((entry) => entry.email === email && entry.password === password);
    if (!user) {
      return { ok: false, message: "Invalid credentials." };
    }
    setCurrentUser(user);
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  const adminLogin = ({ email, password }) => {
    if (email === "admin@veloura.com" && password === "admin123") {
      setIsAdmin(true);
      return { ok: true };
    }
    return { ok: false, message: "Admin credentials are incorrect." };
  };

  const adminLogout = () => setIsAdmin(false);

  const saveDesign = (design) => {
    const designRecord = { ...design, id: design.id ?? `design-${Date.now()}` };
    setSavedDesigns((prev) => [designRecord, ...prev.filter((item) => item.id !== designRecord.id)]);
    return designRecord;
  };

  const placeOrder = ({ coupon }) => {
    if (!cart.length) return null;
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = coupon && promoCodes[coupon] ? subtotal * promoCodes[coupon] : 0;
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      items: cart,
      subtotal,
      discount,
      total: subtotal - discount,
      status: "Processing",
    };
    setOrders((prev) => [order, ...prev]);
    setCart([]);
    return order;
  };

  const analytics = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + order.total, 0);
    return {
      revenue,
      orderCount: orders.length,
      userCount: users.length,
      avgOrderValue: orders.length ? revenue / orders.length : 0,
    };
  }, [orders, users]);

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        currentUser,
        orders,
        savedDesigns,
        users,
        isAdmin,
        analytics,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        toggleWishlist,
        signup,
        login,
        logout,
        adminLogin,
        adminLogout,
        saveDesign,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
