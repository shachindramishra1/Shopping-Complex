import { ArrowRight, Mail, Star } from "lucide-react";
import { collections, offers, reviews } from "../data/mockData";
import { ProductCard } from "../components/ProductCard";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";

export function HomePage() {
  const { products } = useStore();
  const trending = products.slice(0, 3);
  const arrivals = products.slice(1, 4);

  return (
    <div className="page-stack">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Luxury Street Couture</p>
          <h1>Modern fashion with custom expression and a bold hot pink signature.</h1>
          <p>
            Discover premium essentials, elevated silhouettes, and a built-in design studio for one-of-one pieces.
          </p>
          <div className="hero__actions">
            <Link to="/product/nova-tee" className="btn btn--primary">
              Shop The Edit
            </Link>
            <Link to="/product/atelier-hoodie?customize=1" className="btn btn--ghost">
              Customize Now
            </Link>
          </div>
          <div className="hero__stats">
            <div>
              <strong>2.4k+</strong>
              <span>Premium orders</span>
            </div>
            <div>
              <strong>98%</strong>
              <span>Luxury fit satisfaction</span>
            </div>
            <div>
              <strong>24h</strong>
              <span>Design save turnaround</span>
            </div>
          </div>
        </div>
        <div className="hero__visual">
          <div className="hero-card hero-card--floating">
            <img
              src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80"
              alt="Premium fashion campaign"
            />
          </div>
          <div className="hero-card hero-card--accent">
            <span>Spring Capsule</span>
            <strong>New season, sharp energy</strong>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Trending Now</p>
            <h2>Products everyone is styling right now</h2>
          </div>
          <Link to="/product/satin-bomber" className="section-link">
            Explore more <ArrowRight size={16} />
          </Link>
        </div>
        <div className="card-grid card-grid--products">
          {trending.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">New Arrivals</p>
            <h2>Fresh drops for curated everyday luxury</h2>
          </div>
        </div>
        <div className="card-grid card-grid--products">
          {arrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Featured Collections</p>
            <h2>Dress by mood, movement, and identity</h2>
          </div>
        </div>
        <div className="collection-grid">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.title}>
              <img src={collection.image} alt={collection.title} />
              <div className="collection-card__overlay">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="offer-banner-grid">
        {offers.map((offer) => (
          <article key={offer.title} className="offer-banner">
            <p className="eyebrow">Limited-Time Offer</p>
            <h3>{offer.title}</h3>
            <p>{offer.subtitle}</p>
          </article>
        ))}
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Client Love</p>
            <h2>Customer reviews from our premium community</h2>
          </div>
        </div>
        <div className="review-grid">
          {reviews.map((review) => (
            <article key={review.id} className="review-card">
              <div className="rating-row">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <Star key={index} size={14} fill="currentColor" />
                ))}
              </div>
              <p>{review.text}</p>
              <strong>{review.name}</strong>
              <span>{review.title}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div>
          <p className="eyebrow">Newsletter</p>
          <h2>Join the pink list for launch alerts and exclusive offers</h2>
        </div>
        <form className="newsletter__form">
          <div className="newsletter__field">
            <Mail size={18} />
            <input type="email" placeholder="Enter your email" />
          </div>
          <button type="button" className="btn btn--primary">
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
}
