import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../utils/currency";

export function ProductCard({ product }) {
  const { toggleWishlist, wishlist } = useStore();
  const wished = wishlist.includes(product.id);

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.images[0]} alt={product.title} />
        <button className={`wishlist-btn ${wished ? "wishlist-btn--active" : ""}`} onClick={() => toggleWishlist(product.id)}>
          <Heart size={16} />
        </button>
        <span className="product-badge">{product.badge}</span>
      </div>
      <div className="product-card__body">
        <p className="eyebrow">{product.collection}</p>
        <div className="product-card__topline">
          <h3>{product.title}</h3>
          <span>{formatPrice(product.price)}</span>
        </div>
        <p className="muted">{product.description}</p>
        <div className="rating-row">
          <Star size={14} fill="currentColor" />
          <span>{product.rating}</span>
          <span className="muted">({product.reviewsCount} reviews)</span>
        </div>
        <Link to={`/product/${product.id}`} className="btn btn--ghost">
          View Product
        </Link>
      </div>
    </article>
  );
}
