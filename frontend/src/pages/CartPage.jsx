import { Minus, Plus, Tag, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { promoCodes } from "../data/mockData";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../utils/currency";

export function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useStore();
  const [coupon, setCoupon] = useState("");
  const [message, setMessage] = useState("");

  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const discount = promoCodes[coupon] ? subtotal * promoCodes[coupon] : 0;
  const total = subtotal - discount;

  const checkout = () => {
    const order = placeOrder({ coupon });
    if (order) {
      setMessage(`Order ${order.id} placed successfully.`);
      setCoupon("");
    }
  };

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Shopping Cart</p>
            <h1>Your curated bag</h1>
          </div>
        </div>
        <div className="cart-layout">
          <div className="cart-items">
            {cart.length ? (
              cart.map((item) => (
                <article key={item.cartId} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item__content">
                    <div className="cart-item__top">
                      <div>
                        <h3>{item.title}</h3>
                        <p className="muted">
                          {item.size} / {item.color}
                        </p>
                      </div>
                      <strong>{formatPrice(item.price)}</strong>
                    </div>
                    {item.customization ? (
                      <div className="cart-item__custom">
                        <span>Customization attached</span>
                        <small>{item.customization.elements.length} elements in live preview</small>
                        <div className={`cart-preview cart-preview--${item.customization.productType}`}>
                          <div className="cart-preview__garment" />
                          {item.customization.elements.map((element) => (
                            <div
                              key={element.id}
                              className="cart-preview__element"
                              style={{
                                left: `${element.x}%`,
                                top: `${element.y}%`,
                                width: `${Math.max(20, element.size * 0.38)}px`,
                                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                              }}
                            >
                              {element.type === "image" ? <img src={element.content} alt="Customization preview" /> : <span>{element.content}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    <div className="cart-item__actions">
                      <div className="quantity-control">
                        <button onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}>
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.cartId)}>
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="empty-state">Your cart is empty. Add a premium piece to get started.</div>
            )}
          </div>
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            <label className="coupon-box">
              <Tag size={16} />
              <input value={coupon} onChange={(event) => setCoupon(event.target.value.toUpperCase())} placeholder="Promo code" />
            </label>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Discount</span>
              <strong>- {formatPrice(discount)}</strong>
            </div>
            <div className="summary-row summary-row--total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>
            <button className="btn btn--primary" onClick={checkout} disabled={!cart.length}>
              Checkout
            </button>
            <p className="muted">Try `PINK10`, `LUXE15`, or `RUNWAY20` for discounts.</p>
            {message ? <p className="success-text">{message}</p> : null}
          </aside>
        </div>
      </section>
    </div>
  );
}
