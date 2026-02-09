"use client";
import { useEffect, useState } from "react";

export default function ToastNotification({ message, show, icon = "fa-check-circle", position = "top-right", onClose, duration = 2500 }) {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
    if (show) {
      const t = setTimeout(() => {
        setVisible(false);
        onClose && onClose();
      }, duration);
      return () => clearTimeout(t);
    }
  }, [show, duration, onClose]);

  const posClass = position === "top-left" ? "toast-top-left" : position === "bottom-left" ? "toast-bottom-left" : position === "bottom-right" ? "toast-bottom-right" : position === "center" ? "toast-center" : "toast-top-right";

  return (
    <div className={`toast-container ${posClass} ${visible ? "toast-show" : ""}`} role="status" aria-live="polite" aria-atomic="true" style={{ pointerEvents: "none" }}>
      <i className={`fas ${icon}`} aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
