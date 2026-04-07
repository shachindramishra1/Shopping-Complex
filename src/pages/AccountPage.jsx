import { Heart, LogOut, Package2, Palette, UserRound } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";

export function AccountPage() {
  const { currentUser, logout, orders, wishlist, products, savedDesigns } = useStore();

  if (!currentUser) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="page-stack">
      <section className="dashboard-hero">
        <div>
          <p className="eyebrow">Profile Dashboard</p>
          <h1>{currentUser.name}</h1>
          <p>{currentUser.email}</p>
        </div>
        <button className="btn btn--ghost" onClick={logout}>
          <LogOut size={16} />
          Logout
        </button>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-card">
          <div className="section-card__title">
            <Package2 size={18} />
            <h3>Order History</h3>
          </div>
          {orders.length ? (
            orders.map((order) => (
              <div key={order.id} className="dashboard-list-item">
                <strong>{order.id}</strong>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span>${order.total.toFixed(2)}</span>
                <span>{order.status}</span>
              </div>
            ))
          ) : (
            <p className="muted">No orders yet.</p>
          )}
        </article>

        <article className="dashboard-card" id="wishlist">
          <div className="section-card__title">
            <Heart size={18} />
            <h3>Wishlist</h3>
          </div>
          {wishlist.length ? (
            wishlist.map((productId) => {
              const product = products.find((item) => item.id === productId);
              return (
                <Link key={productId} to={`/product/${productId}`} className="dashboard-list-item">
                  <strong>{product?.title}</strong>
                  <span>${product?.price}</span>
                </Link>
              );
            })
          ) : (
            <p className="muted">Save pieces you love for later.</p>
          )}
        </article>

        <article className="dashboard-card">
          <div className="section-card__title">
            <Palette size={18} />
            <h3>Saved Designs</h3>
          </div>
          {savedDesigns.length ? (
            savedDesigns.map((design) => (
              <div key={design.id} className="dashboard-list-item">
                <strong>{design.productTitle}</strong>
                <span>{design.elements.length} elements</span>
                <span>{design.productType}</span>
              </div>
            ))
          ) : (
            <p className="muted">Your custom artwork will appear here.</p>
          )}
        </article>

        <article className="dashboard-card">
          <div className="section-card__title">
            <UserRound size={18} />
            <h3>Client Notes</h3>
          </div>
          <p className="muted">
            Early access to capsule drops, one-click reorder, saved customization layers, and premium checkout perks are all enabled.
          </p>
        </article>
      </section>
    </div>
  );
}
