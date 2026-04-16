import { Star } from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CustomizeStudio } from "../components/CustomizeStudio";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { formatPrice } from "../utils/currency";

export function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { products, addToCart } = useStore();
  const product = products.find((item) => item.id === id) ?? products[0];
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [size, setSize] = useState(product.sizes[1] ?? "M");
  const [color, setColor] = useState(product.colors[0]);
  const [design, setDesign] = useState(null);

  const showCustomizer = useMemo(() => new URLSearchParams(location.search).get("customize") === "1", [location.search]);

  const handleAddToCart = () => {
    addToCart({ product, size, color, customization: design });
    navigate("/cart");
  };

  return (
    <div className="page-stack">
      <section className="product-detail">
        <div className="product-gallery">
          <div className="product-gallery__main">
            <img src={activeImage} alt={product.title} />
          </div>
          <div className="product-gallery__thumbs">
            {product.images.map((image) => (
              <button key={image} className={activeImage === image ? "thumb thumb--active" : "thumb"} onClick={() => setActiveImage(image)}>
                <img src={image} alt={product.title} />
              </button>
            ))}
          </div>
        </div>

        <div className="product-info">
          <p className="eyebrow">{product.category}</p>
          <h1>{product.title}</h1>
          <div className="product-price">
            <strong>{formatPrice(product.price)}</strong>
            <span>{formatPrice(product.oldPrice)}</span>
          </div>
          <div className="rating-row">
            <Star size={16} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="muted">{product.reviewsCount} verified reviews</span>
          </div>
          <p>{product.description}</p>

          <div className="variant-group">
            <span>Size</span>
            <div className="chip-row">
              {product.sizes.map((entry) => (
                <button key={entry} className={`chip ${size === entry ? "chip--active" : ""}`} onClick={() => setSize(entry)}>
                  {entry}
                </button>
              ))}
            </div>
          </div>

          <div className="variant-group">
            <span>Color</span>
            <div className="chip-row">
              {product.colors.map((entry) => (
                <button key={entry} className={`chip ${color === entry ? "chip--active" : ""}`} onClick={() => setColor(entry)}>
                  {entry}
                </button>
              ))}
            </div>
          </div>

          {design ? (
            <div className="saved-design-note">
              <strong>Customization ready.</strong>
              <span>Your latest saved design will be included with this item.</span>
            </div>
          ) : null}

          <div className="product-actions">
            <button className="btn btn--primary" onClick={handleAddToCart}>
              Add To Cart
            </button>
            <button className="btn btn--ghost" onClick={() => navigate(`/product/${product.id}?customize=1`)}>
              Customize Product
            </button>
          </div>
        </div>
      </section>

      {showCustomizer ? <CustomizeStudio product={product} onUseDesign={setDesign} /> : null}

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Pair It With</p>
            <h2>More premium pieces from the edit</h2>
          </div>
        </div>
        <div className="card-grid card-grid--products">
          {products
            .filter((item) => item.id !== product.id)
            .slice(0, 3)
            .map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
        </div>
      </section>
    </div>
  );
}
