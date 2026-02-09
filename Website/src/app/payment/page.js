"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Heading from "@/components/home/Heading";
import SubHeading from "@/components/home/SubHeading";
import ProgressSteps from "@/components/checkout/ProgressSteps";
import PaymentMethodCard from "@/components/payment/PaymentMethodCard"; // New component
import SecurityBadges from "@/components/checkout/SecurityBadges"; // New component
import OrderSummaryCard from "@/components/checkout/OrderSummaryCard"; // New component

export default function PaymentPage() {
  const router = useRouter();
  const { items, subtotal } = useCart();
  const [method, setMethod] = useState("cod");
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: ""
  });

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const placeOrder = (e) => {
    e.preventDefault();
    router.push("/confirmation");
  };

  return (
    <>
      <Navbar />

      {/* Progress Steps with background */}
      <div className="bg-light py-3 border-bottom">
        <ProgressSteps current={2} />
      </div>

      <main className="container py-4">
        <div className="text-center mb-5">
          <Heading>Secure Payment</Heading>
          <SubHeading className="text-muted">
            Complete your purchase with confidence
          </SubHeading>
        </div>

        <div className="row g-4">
          {/* Payment Method Column */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-header bg-pink text-white py-3">
                <h5 className="mb-0 d-flex align-items-center">
                  <i className="fas fa-lock me-2" /> Payment Information
                </h5>
              </div>
              <div className="card-body p-4">
                <form onSubmit={placeOrder}>
                  {/* Payment Method Options */}
                  <div className="mb-4">
                    <h6 className="mb-3 fw-semibold">Select Payment Method</h6>

                    <PaymentMethodCard
                      id="cod"
                      title="Cash on Delivery"
                      icon="fa-money-bill-wave"
                      description="Pay when you receive your order"
                      checked={method === "cod"}
                      onChange={() => setMethod("cod")}
                    />

                    <PaymentMethodCard
                      id="card"
                      title="Credit/Debit Card"
                      icon="fa-credit-card"
                      description="Secure online payment"
                      checked={method === "card"}
                      onChange={() => setMethod("card")}
                    />
                  </div>

                  {/* Card Details (Conditional) */}
                  {method === "card" && (
                    <div className="border-top pt-4 mt-3">
                      <h6 className="mb-3 fw-semibold">Card Details</h6>
                      <div className="row g-3">
                        <div className="col-md-8">
                          <label className="form-label fw-semibold">Card Number</label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="1234 5678 9012 3456"
                              name="number"
                              value={cardDetails.number}
                              onChange={handleCardChange}
                              required
                            />
                            <span className="input-group-text">
                              <i className="fab fa-cc-visa mx-1 text-primary"></i>
                              <i className="fab fa-cc-mastercard mx-1 text-danger"></i>
                              <i className="fab fa-cc-amex mx-1 text-info"></i>
                            </span>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label fw-semibold">Expiry</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="MM/YY"
                            name="expiry"
                            value={cardDetails.expiry}
                            onChange={handleCardChange}
                            required
                          />
                        </div>
                        <div className="col-md-2">
                          <label className="form-label fw-semibold">CVV</label>
                          <div className="position-relative">
                            <input
                              type="password"
                              className="form-control"
                              placeholder="•••"
                              name="cvv"
                              value={cardDetails.cvv}
                              onChange={handleCardChange}
                              required
                            />
                            <i className="fas fa-question-circle position-absolute end-0 top-50 translate-middle-y me-2 text-muted"></i>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="saveCard"
                            />
                            <label className="form-check-label small text-muted" htmlFor="saveCard">
                              Save this card for future purchases
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Security Badges */}
                  <SecurityBadges className="mt-4" />

                  {/* Action Buttons */}
                  <div className="d-flex justify-content-between align-items-center border-top mt-4 pt-4">
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => router.back()}
                    >
                      <i className="fas fa-arrow-left me-2" /> Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="btn btn-pink px-4 py-2 fw-bold"
                    >
                      Complete Order <i className="fas fa-lock ms-2" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Order Summary Column */}
          <div className="col-lg-4">
            <OrderSummaryCard items={items} subtotal={subtotal} />

            {/* Help Card */}
            <div className="card border-0 shadow-sm mt-4">
              <div className="card-header bg-light py-3">
                <h6 className="mb-0 d-flex align-items-center">
                  <i className="fas fa-question-circle me-2 text-pink"></i> Need Help?
                </h6>
              </div>
              <div className="card-body">
                <p className="small text-muted mb-2">
                  <i className="fas fa-phone-alt me-2"></i> Call us: +1 (555) 123-4567
                </p>
                <p className="small text-muted mb-0">
                  <i className="fas fa-envelope me-2"></i> Email: support@juiceshop.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
