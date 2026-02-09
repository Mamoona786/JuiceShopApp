"use client";
import Image from "next/image";

export default function OrderSummaryCard({ items, subtotal }) {
  return (
    <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
      <div className="card-header bg-pink text-white py-3">
        <h5 className="mb-0 d-flex align-items-center">
          <i className="fas fa-receipt me-2" /> Order Summary
        </h5>
      </div>
      <div className="card-body">
        <ul className="list-group list-group-flush mb-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-2"
            >
              <div className="d-flex align-items-center">
                <div className="position-relative" style={{ width: "50px", height: "50px" }}>
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="rounded-3 object-fit-cover"
                  />
                </div>
                <div className="ms-3">
                  <h6 className="mb-0 small">{item.name}</h6>
                  <small className="text-muted">Qty: {item.quantity}</small>
                </div>
              </div>
              <span className="fw-bold small">Rs. {item.price * item.quantity}</span>
            </li>
          ))}
        </ul>

        <div className="border-top pt-3">
          <div className="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span className="fw-bold">Rs. {subtotal}</span>
          </div>
          <div className="d-flex justify-content-between mb-2">
            <span>Shipping:</span>
            <span className="fw-bold">Free</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Tax:</span>
            <span className="fw-bold">Calculated at payment</span>
          </div>
          <div className="d-flex justify-content-between border-top pt-3">
            <span className="fw-bold">Estimated Total:</span>
            <span className="fw-bold fs-5">Rs. {subtotal}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
