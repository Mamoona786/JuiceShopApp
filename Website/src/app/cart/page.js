"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heading from "@/components/home/Heading";
import SubHeading from "@/components/home/SubHeading";
import ToastNotification from "@/components/confirmation/ToastNotification";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQty, removeItem, subtotal } = useCart();
  const [toast, setToast] = useState(false);
  const hasItems = items.length > 0;

  const handleUpdate = (id, qty) => {
    updateQty(id, qty);
    setToast(true);
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <div className="text-center mb-5">
          <Heading>Your Shopping Cart</Heading>
          <SubHeading>{hasItems ? "Review and edit your items below" : "Your cart is waiting to be filled with delicious juices!"}</SubHeading>
        </div>

        {!hasItems ? (
          <div className="alert alert-light border text-center py-4">
            <i className="fas fa-shopping-cart fa-3x mb-3 text-muted" />
            <h5 className="mb-3">Your cart is empty</h5>
            <button
              className="btn btn-pink"
              onClick={() => router.push("/home")}
            >
              <i className="fas fa-arrow-left me-2" /> Start Shopping
            </button>
          </div>
        ) : (
          <div className="card shadow-sm border-0 overflow-hidden">
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="table-light" style={{ backgroundColor: '#ff99cc' }}>
                  <tr>
                    <th style={{ width: 100 }}>Product</th>
                    <th>Details</th>
                    <th style={{ width: 150 }}>Quantity</th>
                    <th style={{ width: 120 }}>Price</th>
                    <th style={{ width: 120 }}>Total</th>
                    <th style={{ width: 80 }}></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <Image
                          src={item.thumbnail}
                          alt={item.name}
                          width={80}
                          height={60}
                          className="rounded"
                          style={{ objectFit: 'cover' }}
                        />
                      </td>
                      <td className="fw-semibold">{item.name}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleUpdate(item.id, item.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            className="form-control mx-2 text-center"
                            style={{ width: 60 }}
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleUpdate(item.id, parseInt(e.target.value || 1))}
                          />
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => handleUpdate(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>Rs. {item.price}</td>
                      <td>Rs. {item.price * item.quantity}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            removeItem(item.id);
                            setToast(true);
                          }}
                        >
                          <i className="fas fa-trash" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="table-light" style={{ backgroundColor: '#ffe6f2' }}>
                  <tr>
                    <td colSpan={4} className="text-end fw-bold">Subtotal</td>
                    <td colSpan={2} className="fw-bold">Rs. {subtotal}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="card-footer bg-white border-0 py-3">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => router.push("/home")}
                >
                  <i className="fas fa-arrow-left me-2" /> Continue Shopping
                </button>
                <button
                  className="btn btn-pink"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout <i className="fas fa-arrow-right ms-2" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
      <ToastNotification
        show={toast}
        message="Cart updated"
        onClose={() => setToast(false)}
      />
    </>
  );
}
