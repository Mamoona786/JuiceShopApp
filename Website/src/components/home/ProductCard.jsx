import Image from "next/image";
import { useState } from "react";
import QuantityInput from "@/components/cart/QuantityInput";

// item. { id, name, price, thumbnail }
export default function ProductCard({ item, onAdd }) {
  const [qty, setQty] = useState(1);
  const it = item || { id: "apple-1", name: "Apple Juice", price: 250, thumbnail: "/images/apple.png" };
  return (
    <div className="card product-card shadow-sm">
      <div className="card-img-wrapper position-relative">
        <Image src={it.thumbnail} className="card-img-top" alt={it.name} width={600} height={400} />
        <span className="offer-tag" style={{ backgroundColor: "#ff5733" }}>Discount</span>
      </div>
      <div className="card-body text-center">
        <h5 className="card-title">{it.name}</h5>
        <p className="card-text text-muted mb-3">Refreshing and healthy.</p>
        <p className="card-price">Price. Rs. {it.price}</p>
        <div className="mb-3"><QuantityInput value={qty} onChange={setQty} /></div>
        <button className="btn btn-add-to-cart w-100" onClick={() => onAdd && onAdd({ ...it, quantity: qty })}>
          <i className="fas fa-cart-plus me-2" />Add to Cart
        </button>
      </div>
    </div>
  );
}
