import { Heart, Menu, Search, ShoppingBag, User2 } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStore } from "../context/StoreContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/product/nova-tee" },
  { label: "Customize", to: "/product/atelier-hoodie?customize=1" },
  { label: "Account", to: "/account" },
];

export function Layout({ children }) {
  const [open, setOpen] = useState(false);
  const { cart, wishlist, currentUser } = useStore();
  const navigate = useNavigate();

  return (
    <div className="site-shell">
      <header className="topbar">
        <div className="topbar__notice">Luxury Custom Fashion. Free shipping on orders above $180.</div>
      </header>
      <nav className="navbar">
        <button className="icon-btn mobile-only" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <Link to="/" className="brand">
          Veloura Atelier
        </Link>
        <div className={`nav-links ${open ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className="nav-link" onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </div>
        <div className="nav-actions">
          <button className="icon-btn" onClick={() => navigate("/product/satin-bomber")} aria-label="Search products">
            <Search size={18} />
          </button>
          <button className="icon-btn" onClick={() => navigate("/account#wishlist")} aria-label="Wishlist">
            <Heart size={18} />
            <span className="badge-pill">{wishlist.length}</span>
          </button>
          <button className="icon-btn" onClick={() => navigate("/account")} aria-label="Profile">
            <User2 size={18} />
            {currentUser ? <span className="nav-user">{currentUser.name.split(" ")[0]}</span> : null}
          </button>
          <button className="icon-btn" onClick={() => navigate("/cart")} aria-label="Cart">
            <ShoppingBag size={18} />
            <span className="badge-pill">{cart.length}</span>
          </button>
        </div>
      </nav>
      <main>{children}</main>
      <footer className="footer">
        <div>
          <p className="footer__brand">Veloura Atelier</p>
          <p>Luxury essentials, custom drops, and runway-inspired pieces in hot pink detail.</p>
        </div>
        <div>
          <p className="footer__title">Explore</p>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/account">Profile</Link>
        </div>
        <div>
          <p className="footer__title">Social</p>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </footer>
    </div>
  );
}
