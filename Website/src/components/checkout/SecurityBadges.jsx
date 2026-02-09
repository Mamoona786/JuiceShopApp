"use client";

export default function SecurityBadges({ className = "" }) {
  return (
    <div className={`d-flex flex-wrap align-items-center gap-3 ${className}`}>
      <span className="small text-muted">Secure Payment:</span>
      <div className="text-success">
        <i className="fas fa-lock fa-lg" title="SSL Secure" />
        <span className="visually-hidden">SSL Secure</span>
      </div>
      <div className="text-primary">
        <i className="fab fa-cc-visa fa-lg" title="Visa" />
        <span className="visually-hidden">Visa</span>
      </div>
      <div className="text-danger">
        <i className="fab fa-cc-mastercard fa-lg" title="Mastercard" />
        <span className="visually-hidden">Mastercard</span>
      </div>
      <div className="text-info">
        <i className="fas fa-shield-alt fa-lg" title="3D Secure" />
        <span className="visually-hidden">3D Secure</span>
      </div>
    </div>
  );
}
