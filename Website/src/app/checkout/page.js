"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heading from "@/components/home/Heading";
import SubHeading from "@/components/home/SubHeading";
import ToastNotification from "@/components/confirmation/ToastNotification";
import ProgressSteps from "@/components/checkout/ProgressSteps";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [toast, setToast] = useState(false);
  const hasItems = items.length > 0;

  const goToPayment = (e) => {
    e.preventDefault();
    router.push("/payment");
  };

  return (
    <>
      <Navbar />

      {/* Progress Steps with improved styling */}
      <div className="bg-light py-3 border-bottom">
        <ProgressSteps current={1} />
      </div>

      <main className="container py-4">
        <div className="text-center mb-5">
          <Heading>Secure Checkout</Heading>
          <SubHeading className="text-muted">
            {hasItems
              ? "Complete your order in just a few steps"
              : "Your cart is empty. Add some delicious juices first!"}
          </SubHeading>
        </div>

        {!hasItems ? (
          <div className="card border-0 shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
            <div className="card-body text-center py-5">
              <i className="fas fa-shopping-cart fa-4x mb-4 text-muted opacity-50" />
              <h4 className="mb-3">Your cart is empty</h4>
              <p className="text-muted mb-4">Looks like you haven't added anything to your cart yet</p>
              <button
                className="btn btn-pink px-4 py-2 fw-bold"
                onClick={() => router.push("/home")}
              >
                <i className="fas fa-arrow-left me-2" /> Browse Products
              </button>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {/* Shipping Form Column */}
            <div className="col-lg-7">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-pink text-white py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <i className="fas fa-truck me-2" /> Shipping Information
                  </h5>
                </div>
                <div className="card-body p-4">
                  <form onSubmit={goToPayment}>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input
                          className="form-control form-control-lg"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <input
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Street Address</label>
                        <input
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">City</label>
                        <input
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Postal Code</label>
                        <input
                          className="form-control form-control-lg"
                          required
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Delivery Instructions (Optional)</label>
                        <textarea
                          className="form-control"
                          rows="2"
                          placeholder="Gate code, building number, etc."
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                      <button
                        type="submit"
                        className="btn btn-pink px-4 py-3 fw-bold d-flex align-items-center"
                      >
                        Proceed to Payment
                        <i className="fas fa-arrow-right ms-2" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            {/* Order Summary Column */}
            <div className="col-lg-5">
              <div className="card border-0 shadow-sm sticky-top" style={{ top: "20px" }}>
                <div className="card-header bg-pink text-white py-3">
                  <h5 className="mb-0 d-flex align-items-center">
                    <i className="fas fa-receipt me-2" /> Order Summary
                  </h5>
                </div>
                <div className="card-body p-4">
                  <ul className="list-group list-group-flush mb-3">
                    {items.map((item) => (
                      <li
                        key={item.id}
                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 py-3"
                      >
                        <div className="d-flex align-items-center">
                          <div className="position-relative" style={{ width: "60px", height: "60px" }}>
                            <Image
                              src={item.thumbnail}
                              alt={item.name}
                              fill
                              className="rounded-3 object-fit-cover"
                            />
                          </div>
                          <div className="ms-3">
                            <h6 className="mb-1">{item.name}</h6>
                            <small className="text-muted">Qty: {item.quantity}</small>
                          </div>
                        </div>
                        <span className="fw-bold">Rs. {item.price * item.quantity}</span>
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

                  <div className="alert alert-success mt-4 d-flex align-items-center">
                    <i className="fas fa-check-circle me-2 text-success" />
                    <small>Free standard shipping on all orders</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <ToastNotification
        show={toast}
        message="Shipping information saved"
        icon="fa-check-circle"
        onClose={() => setToast(false)}
      />
    </>
  );
}
