"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProgressSteps from "@/components/checkout/ProgressSteps";
import ToastNotification from "@/components/confirmation/ToastNotification";
import Image from "next/image";

export default function ConfirmationPage() {
  const router = useRouter();
  const { clear } = useCart();
  const [toast, setToast] = useState(false);
  const [orderNo, setOrderNo] = useState("");

  // make a stable order number once on mount
  useEffect(() => {
    const n = Math.floor((Date.now() % 1_000_000) + Math.random() * 999) % 1_000_000;
    setOrderNo(String(n).padStart(6, "0"));
  }, []);

  useEffect(() => {
    clear();
    setToast(true);
  }, [clear]);

  // pink gradient for header bar
  const headerStyle = useMemo(
    () => ({
      background: "linear-gradient(90deg, #FF9A8B 0%, #FF6B95 100%)",
      padding: "20px 24px",
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      color: "#fff",
      textAlign: "center",
      marginBottom: 24
    }),
    []
  );

  return (
    <>
      <Navbar />
      <ProgressSteps current={3} />

      <div className="container" style={{ marginBottom: 100 }}>

        <div className="d-flex justify-content-center px-3">
          <div className="card shadow-sm border-0" style={{ width: "100%", maxWidth: 720 }}>
            <div className="card-body d-flex flex-column align-items-center p-4 p-md-5">
              {/* circle with check icon */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: "rgba(255, 154, 139, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 24
                }}
              >
                <i className="fas fa-check" style={{ fontSize: 48, color: "#FF6B95" }} />
              </div>

              <h5 className="text-center fw-semibold mb-2">
                Your order has been placed successfully
              </h5>

              <p className="text-center text-muted mb-3">
                Thank you for your purchase. Your order number is&nbsp;
                <span className="fw-bold" style={{ color: "#ff66b2" }}>#{orderNo}</span>.
              </p>

              {/* delivery image. put a file at public/images/delivery-rider.png */}
              <div
                className="w-100 rounded overflow-hidden"
                style={{ height: 500, boxShadow: "0 6px 18px rgba(255,107,149,0.15)" }}
              >
                <Image
                  src="/images/delivery-rider.png"
                  alt="Delivery on the way"
                  width={1200}
                  height={800}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  priority
                />
              </div>

              <div className="d-grid mt-4" style={{ maxWidth: 300, width: "100%" }}>
                <button className="btn btn-pink fw-bold" onClick={() => router.push("/home")}>
                  Back to Home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
