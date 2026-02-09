import Image from "next/image";

export default function JuiceCard({ item, onAdd }) {
  const it = item || { id: "apple-1", name: "Apple Juice", price: 250, thumbnail: "/images/apple.png" };
  return (
    <div className="juice-card">
      <div className="card-img"><Image src={it.thumbnail} alt={it.name} width={200} height={160} /></div>
      <div className="card-info">
        <h3 className="card-title">{it.name}</h3>
        <p className="card-price">Price Rs. {it.price}</p>
        <button className="add-to-cart-btn" onClick={() => onAdd && onAdd({ ...it, quantity: 1 })}>Add to Cart</button>
      </div>
    </div>
  );
}
