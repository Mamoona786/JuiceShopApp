"use client";
import { useState } from "react";

export default function QuantityInput({ min = 1, max = 99, value = 1, onChange }) {
  const [qty, setQty] = useState(value);
  const set = (v) => {
    const nv = Math.min(max, Math.max(min, Number.isNaN(v) ? min : v));
    setQty(nv);
    onChange && onChange(nv);
  };
  return (
    <div className="quantity-input d-flex align-items-center justify-content-center">
      <button className="btn btn-outline-secondary btn-sm" onClick={() => set(qty - 1)} aria-label="decrease">-</button>
      <input className="form-control mx-2 text-center" style={{ width: 60 }} type="text" value={qty} onChange={(e) => set(parseInt(e.target.value || "0", 10))} />
      <button className="btn btn-outline-secondary btn-sm" onClick={() => set(qty + 1)} aria-label="increase">+</button>
    </div>
  );
}
