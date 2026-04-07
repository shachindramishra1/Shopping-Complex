import { BarChart3, LockKeyhole, PackageSearch, Percent, ShieldUser, Users } from "lucide-react";
import { useState } from "react";
import { offers } from "../data/mockData";
import { useStore } from "../context/StoreContext";

export function AdminPage() {
  const { adminLogin, adminLogout, isAdmin, products, orders, users, analytics } = useStore();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  if (!isAdmin) {
    return (
      <div className="auth-page">
        <form
          className="auth-card"
          onSubmit={(event) => {
            event.preventDefault();
            const result = adminLogin(credentials);
            if (!result.ok) setError(result.message);
          }}
        >
          <p className="eyebrow">Hidden Admin</p>
          <h1>Admin Login</h1>
          <input
            className="text-input"
            type="email"
            placeholder="Admin email"
            value={credentials.email}
            onChange={(event) => setCredentials((prev) => ({ ...prev, email: event.target.value }))}
          />
          <input
            className="text-input"
            type="password"
            placeholder="Admin password"
            value={credentials.password}
            onChange={(event) => setCredentials((prev) => ({ ...prev, password: event.target.value }))}
          />
          <button className="btn btn--primary" type="submit">
            <LockKeyhole size={16} />
            Enter Admin
          </button>
          {error ? <p className="error-text">{error}</p> : null}
          <p className="muted">Demo admin: `admin@veloura.com` / `admin123`</p>
        </form>
      </div>
    );
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Admin Panel</p>
          <h1>Veloura Commerce Control</h1>
          <p>Hidden from normal user navigation and designed for premium brand operations.</p>
        </div>
        <button className="btn btn--ghost" onClick={adminLogout}>
          Logout Admin
        </button>
      </section>

      <section className="analytics-grid">
        <article className="metric-card">
          <BarChart3 size={18} />
          <span>Revenue</span>
          <strong>${analytics.revenue.toFixed(2)}</strong>
        </article>
        <article className="metric-card">
          <PackageSearch size={18} />
          <span>Orders</span>
          <strong>{analytics.orderCount}</strong>
        </article>
        <article className="metric-card">
          <Users size={18} />
          <span>Users</span>
          <strong>{analytics.userCount}</strong>
        </article>
        <article className="metric-card">
          <ShieldUser size={18} />
          <span>Average Order</span>
          <strong>${analytics.avgOrderValue.toFixed(2)}</strong>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <div className="section-card__title">
            <PackageSearch size={18} />
            <h3>Product Management</h3>
          </div>
          {products.map((product) => (
            <div key={product.id} className="dashboard-list-item">
              <strong>{product.title}</strong>
              <span>{product.collection}</span>
              <span>${product.price}</span>
            </div>
          ))}
        </article>

        <article className="dashboard-card">
          <div className="section-card__title">
            <BarChart3 size={18} />
            <h3>Order Management</h3>
          </div>
          {orders.length ? (
            orders.map((order) => (
              <div key={order.id} className="dashboard-list-item">
                <strong>{order.id}</strong>
                <span>{order.items.length} items</span>
                <span>${order.total.toFixed(2)}</span>
                <span>{order.status}</span>
              </div>
            ))
          ) : (
            <p className="muted">Orders will appear here after checkout.</p>
          )}
        </article>

        <article className="dashboard-card">
          <div className="section-card__title">
            <Users size={18} />
            <h3>User Management</h3>
          </div>
          {users.map((user) => (
            <div key={user.email} className="dashboard-list-item">
              <strong>{user.name}</strong>
              <span>{user.email}</span>
              <span>{user.role}</span>
            </div>
          ))}
        </article>

        <article className="dashboard-card">
          <div className="section-card__title">
            <Percent size={18} />
            <h3>Coupons & Offers</h3>
          </div>
          {offers.map((offer) => (
            <div key={offer.title} className="dashboard-list-item">
              <strong>{offer.title}</strong>
              <span>{offer.subtitle}</span>
            </div>
          ))}
          <div className="dashboard-list-item">
            <strong>PINK10</strong>
            <span>10% off</span>
          </div>
          <div className="dashboard-list-item">
            <strong>LUXE15</strong>
            <span>15% off</span>
          </div>
          <div className="dashboard-list-item">
            <strong>RUNWAY20</strong>
            <span>20% off</span>
          </div>
        </article>
      </section>
    </div>
  );
}
