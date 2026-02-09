import Image from "next/image";
import { useState } from "react";
import QuantityInput from "@/components/cart/QuantityInput";

// Pass an item and an onAdd callback from the page
// item. { id, name, price, thumbnail }
export default function FeatureCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);
  if (!item) return null;
  return (
    <div className="card feature-card">
      <span className="offer-tag" style={{ backgroundColor: "#ff5733" }}>Discount</span>
      <div className="media-wrap">
        <Image src={item.thumbnail || "/images/apple.png"} alt={item.name} fill sizes="(min-width: 992px) 33vw, (min-width: 768px) 50vw, 100vw" className="card-img-top" style={{ objectFit: "cover" }} />
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{item.name}</h5>
        <p className="card-text text-muted">Freshly pressed Apple Juice for a naturally sweet and crisp refreshment.</p>
        <div className="input-group mb-2" style={{ justifyContent: "center" }}>
          <QuantityInput value={qty} onChange={setQty} />
        </div>
        <p className="card-price">Price. Rs. {item.price}</p>
        <button className="btn btn-add-to-cart" onClick={() => onAdd && onAdd({ ...item, quantity: qty })}>
          <i className="fa fa-cart-plus" /> Add To Cart
        </button>
      </div>
    </div>
  );
}
